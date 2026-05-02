/**
 * paypal service  -  PayPal Orders v2 REST API
 *
 * Uses PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET / PAYPAL_ENV (sandbox|live).
 */

type Money = { currencyCode: string; value: string };

type CreateOrderInput = {
  itemTotalCents: number;
  shippingCents: number;
  taxCents: number;
  items: Array<{
    name: string;
    sku: string;
    quantity: number;
    unitAmountCents: number;
  }>;
  shippingAddress: {
    name: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
};

const toMoney = (cents: number): Money => ({
  currencyCode: 'USD',
  value: (cents / 100).toFixed(2),
});

function baseUrl(): string {
  return process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

export default ({ strapi }: { strapi: any }) => ({
  async getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set in apps/cms/.env');
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const res = await fetch(`${baseUrl()}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal auth error ${res.status}: ${text}`);
    }

    const data = (await res.json()) as any;
    return data.access_token;
  },

  async createOrder(input: CreateOrderInput): Promise<{ orderId: string; raw: any }> {
    const token = await this.getAccessToken();
    const grandCents = input.itemTotalCents + input.shippingCents + input.taxCents;

    const body = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: (grandCents / 100).toFixed(2),
            breakdown: {
              item_total: toMoney(input.itemTotalCents),
              shipping: toMoney(input.shippingCents),
              tax_total: toMoney(input.taxCents),
            },
          },
          items: input.items.map((i) => ({
            name: i.name.slice(0, 127),
            quantity: String(i.quantity),
            sku: i.sku.slice(0, 127),
            category: 'PHYSICAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: (i.unitAmountCents / 100).toFixed(2),
            },
          })),
          shipping: {
            name: { full_name: input.shippingAddress.name.slice(0, 300) },
            address: {
              address_line_1: input.shippingAddress.street1,
              address_line_2: input.shippingAddress.street2 || undefined,
              admin_area_2: input.shippingAddress.city,
              admin_area_1: input.shippingAddress.state,
              postal_code: input.shippingAddress.zip,
              country_code: input.shippingAddress.country || 'US',
            },
          },
        },
      ],
    };

    const res = await fetch(`${baseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal createOrder error ${res.status}: ${text}`);
    }

    const order = (await res.json()) as any;
    return { orderId: order.id, raw: order };
  },

  async captureOrder(orderId: string): Promise<any> {
    const token = await this.getAccessToken();
    const res = await fetch(`${baseUrl()}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal captureOrder error ${res.status}: ${text}`);
    }

    return res.json();
  },
});
