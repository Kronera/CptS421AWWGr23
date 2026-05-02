/**
 * checkout controller
 *
 * Flow:
 *   1. POST /api/checkout/quote
 *        Returns shipping + tax + grand total for the cart + address.
 *   2. POST /api/checkout/paypal/create-order
 *        Recomputes shipping/tax authoritatively, creates the PayPal
 *        order with a proper amount breakdown, and returns the PayPal
 *        orderID (which the frontend passes to paypal.Buttons).
 *   3. POST /api/checkout/paypal/capture-order
 *        Captures the PayPal order, persists the Strapi order, and
 *        commits the Stripe Tax calculation.
 */

type IncomingItem = { productId: number; quantity: number };

type IncomingAddress = {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;   // web frontend field name
  street1?: string;
  street2?: string;
  city: string;
  state: string;
  zipCode?: string;   // web frontend field name
  zip?: string;
  country?: string;
};

type NormalizedAddress = {
  name: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

function normalizeAddress(a: IncomingAddress): NormalizedAddress {
  const rawCountry = (a.country || 'US').trim();
  const country =
    rawCountry.length === 2
      ? rawCountry.toUpperCase()
      : rawCountry.toLowerCase() === 'united states'
      ? 'US'
      : rawCountry.toLowerCase() === 'canada'
      ? 'CA'
      : rawCountry.toLowerCase() === 'united kingdom'
      ? 'GB'
      : rawCountry.toLowerCase() === 'australia'
      ? 'AU'
      : rawCountry.toUpperCase();

  return {
    name: (a.name || `${a.firstName || ''} ${a.lastName || ''}`).trim(),
    email: a.email || '',
    phone: a.phone || '',
    street1: a.street1 || a.address || '',
    street2: a.street2 || '',
    city: a.city,
    state: a.state,
    zip: a.zip || a.zipCode || '',
    country,
  };
}

async function loadAuthoritativeItems(strapi: any, items: IncomingItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty.');
  }

  const products = await Promise.all(
    items.map((i) =>
      strapi.entityService.findOne('api::product.product', i.productId, {
        fields: ['Name', 'price', 'inventory'],
      })
    )
  );

  return items.map((i, idx) => {
    const p = products[idx];
    if (!p) throw new Error(`Product ${i.productId} not found.`);
    if (typeof p.price !== 'number') throw new Error(`Product ${i.productId} is missing a price.`);
    const unitCents = Math.round(p.price * 100);
    return {
      productId: i.productId,
      name: p.Name || `Product #${i.productId}`,
      quantity: i.quantity,
      unitCents,
      totalCents: unitCents * i.quantity,
      product: p,
    };
  });
}

async function loadTaxSetting(strapi: any) {
  const setting = await strapi.entityService.findMany('api::tax-setting.tax-setting');
  return {
    ratePercent:
      setting && setting.enabled !== false ? Number(setting.ratePercent) || 0 : 0,
    label: setting?.label || 'Sales Tax',
  };
}

async function loadShippingSetting(strapi: any) {
  const setting = await strapi.entityService.findMany(
    'api::shipping-setting.shipping-setting'
  );
  return {
    flatRate:
      setting && setting.enabled !== false ? Number(setting.flatRate) || 0 : 0,
    freeShippingThreshold:
      setting?.freeShippingThreshold != null
        ? Number(setting.freeShippingThreshold)
        : null,
    label: setting?.label || 'Standard Shipping',
  };
}

async function computeBreakdown(strapi: any, items: IncomingItem[], address: NormalizedAddress) {
  const lineItems = await loadAuthoritativeItems(strapi, items);
  const itemTotalCents = lineItems.reduce((s, li) => s + li.totalCents, 0);
  const subtotalDollars = itemTotalCents / 100;

  // Shipping: flat rate from the Shipping Setting single type, with optional
  // free-shipping subtotal threshold.
  const ship = await loadShippingSetting(strapi);
  const shippingFree =
    ship.freeShippingThreshold != null &&
    subtotalDollars >= ship.freeShippingThreshold;
  const shippingCents = shippingFree ? 0 : Math.round(ship.flatRate * 100);

  // Tax: percent of (subtotal + shipping) from the Tax Setting single type.
  // ratePercent is a human-friendly percentage value (e.g. 1.3 -> 1.3%).
  const tax = await loadTaxSetting(strapi);
  const taxableCents = itemTotalCents + shippingCents;
  const taxCents = Math.round((taxableCents * tax.ratePercent) / 100);

  const grandCents = itemTotalCents + shippingCents + taxCents;

  return {
    lineItems,
    itemTotalCents,
    shippingCents,
    taxCents,
    grandCents,
    shippingService: ship.label,
    taxLabel: tax.label,
    taxRatePercent: tax.ratePercent,
    // Kept for forward-compatibility but unused with manual settings.
    shippoRateId: null as string | null,
    stripeTaxCalculationId: null as string | null,
  };
}

export default {
  /**
   * POST /api/checkout/quote
   * Body: { items: [{productId, quantity}], shippingAddress }
   */
  async quote(ctx: any) {
    try {
      const { items, shippingAddress } = ctx.request.body || {};
      if (!shippingAddress) return ctx.badRequest('shippingAddress is required');

      const address = normalizeAddress(shippingAddress);
      const b = await computeBreakdown(strapi, items, address);

      ctx.body = {
        currency: 'USD',
        subtotal: b.itemTotalCents / 100,
        shipping: b.shippingCents / 100,
        tax: b.taxCents / 100,
        total: b.grandCents / 100,
        shippingService: b.shippingService,
      };
    } catch (err: any) {
      strapi.log.error('checkout.quote failed', err);
      ctx.badRequest(err.message || 'Failed to get quote');
    }
  },

  /**
   * POST /api/checkout/paypal/create-order
   * Body: { items, shippingAddress }
   */
  async createPaypalOrder(ctx: any) {
    try {
      const { items, shippingAddress } = ctx.request.body || {};
      if (!shippingAddress) return ctx.badRequest('shippingAddress is required');

      const address = normalizeAddress(shippingAddress);
      const b = await computeBreakdown(strapi, items, address);

      const paypal = strapi.service('api::checkout.paypal');
      const { orderId } = await paypal.createOrder({
        itemTotalCents: b.itemTotalCents,
        shippingCents: b.shippingCents,
        taxCents: b.taxCents,
        items: b.lineItems.map((li: any) => ({
          name: li.name,
          sku: `sku-${li.productId}`,
          quantity: li.quantity,
          unitAmountCents: li.unitCents,
        })),
        shippingAddress: {
          name: address.name,
          street1: address.street1,
          street2: address.street2,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country,
        },
      });

      ctx.body = {
        orderID: orderId,
        breakdown: {
          currency: 'USD',
          subtotal: b.itemTotalCents / 100,
          shipping: b.shippingCents / 100,
          tax: b.taxCents / 100,
          total: b.grandCents / 100,
          shippingService: b.shippingService,
          stripeTaxCalculationId: b.stripeTaxCalculationId,
          shippoRateId: b.shippoRateId,
        },
      };
    } catch (err: any) {
      strapi.log.error('checkout.createPaypalOrder failed', err);
      ctx.badRequest(err.message || 'Failed to create PayPal order');
    }
  },

  /**
   * POST /api/checkout/paypal/capture-order
   * Body: {
   *   orderID, items, shippingAddress,
   *   stripeTaxCalculationId, shippoRateId, shippingService,
   *   subtotal, shipping, tax, total
   * }
   *
   * Captures the PayPal payment, commits the Stripe Tax calculation,
   * and persists the Strapi order record.
   */
  async capturePaypalOrder(ctx: any) {
    try {
      const body = ctx.request.body || {};
      const {
        orderID,
        items,
        shippingAddress,
        stripeTaxCalculationId,
        shippoRateId,
        shippingService,
        subtotal,
        shipping,
        tax,
        total,
      } = body;

      if (!orderID) return ctx.badRequest('orderID is required');
      if (!shippingAddress) return ctx.badRequest('shippingAddress is required');

      const paypal = strapi.service('api::checkout.paypal');
      const capture = await paypal.captureOrder(orderID);

      const address = normalizeAddress(shippingAddress);

      // Commit Stripe Tax so it lands in tax reports.
      let stripeTaxTransactionId: string | null = null;
      if (stripeTaxCalculationId) {
        const taxSvc = strapi.service('api::checkout.tax');
        stripeTaxTransactionId = await taxSvc.commit(stripeTaxCalculationId, orderID);
      }

      const orderNumber = `ORD-${Date.now()}`;

      // Cast to `any` because the generated contentTypes.d.ts only refreshes
      // when running `strapi develop`; CI builds with `strapi build` see a
      // stale order schema that is missing paymentProvider / paymentReference
      // / stripeTaxCalculationId / stripeTaxTransactionId / shippoRateId /
      // shippingService. Strapi resolves these fields fine at runtime.
      const orderData: any = {
        orderNumber,
        customerName: address.name,
        customerEmail: address.email,
        shippingAddress,
        orderItems: Array.isArray(items) ? items : [],
        subtotal: Number(subtotal) || 0,
        tax: Number(tax) || 0,
        shipping: Number(shipping) || 0,
        total: Number(total) || 0,
        statuses: 'processing',
        paymentStatus: 'paid',
        paymentProvider: 'paypal',
        paymentReference: orderID,
        stripeTaxCalculationId: stripeTaxCalculationId || null,
        stripeTaxTransactionId,
        shippoRateId: shippoRateId || null,
        shippingService: shippingService || null,
        publishedAt: new Date(),
      };
      const created = await strapi.entityService.create('api::order.order', {
        data: orderData,
      });

      ctx.body = {
        order: {
          id: (created as any).id,
          orderNumber,
        },
        paypalCapture: capture,
      };
    } catch (err: any) {
      strapi.log.error('checkout.capturePaypalOrder failed', err);
      ctx.badRequest(err.message || 'Failed to capture PayPal order');
    }
  },
};
