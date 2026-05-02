/**
 * tax service  -  Stripe Tax Calculations (via REST)
 *
 * Requires STRIPE_SECRET_KEY to be set and Stripe Tax to be enabled
 * on the account (dashboard -> Tax -> Settings) with your origin
 * address (59 E Queens Ave, Spokane WA 99207) registered.
 */

type Address = {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
};

type LineItem = {
  amountCents: number;
  reference: string;
  taxCode?: string;
};

type TaxResult = {
  taxAmountCents: number;
  totalAmountCents: number;
  calculationId: string;
};

/**
 * Build application/x-www-form-urlencoded body for Stripe's REST API,
 * including the bracketed-array syntax it requires.
 */
function toForm(params: Record<string, any>, prefix = ''): string {
  const out: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    const paramKey = prefix ? `${prefix}[${key}]` : key;
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === 'object') {
          out.push(toForm(v, `${paramKey}[${i}]`));
        } else {
          out.push(`${encodeURIComponent(`${paramKey}[${i}]`)}=${encodeURIComponent(String(v))}`);
        }
      });
    } else if (typeof value === 'object') {
      out.push(toForm(value, paramKey));
    } else {
      out.push(`${encodeURIComponent(paramKey)}=${encodeURIComponent(String(value))}`);
    }
  }
  return out.filter(Boolean).join('&');
}

export default ({ strapi }: { strapi: any }) => ({
  /**
   * Compute sales tax for the given line items + shipping + destination.
   * All amounts are in USD cents.
   */
  async calculate(
    lineItems: LineItem[],
    shippingAmountCents: number,
    shippingAddress: Address
  ): Promise<TaxResult> {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        'STRIPE_SECRET_KEY is not set. Add it to apps/cms/.env to enable live tax.'
      );
    }

    const params: Record<string, any> = {
      currency: 'usd',
      line_items: lineItems.map((li) => ({
        amount: li.amountCents,
        reference: li.reference,
        tax_code: li.taxCode || 'txcd_99999999', // general tangible goods
      })),
      shipping_cost: {
        amount: shippingAmountCents,
        tax_code: 'txcd_92010001', // shipping
      },
      customer_details: {
        address: {
          line1: shippingAddress.street1,
          line2: shippingAddress.street2 || '',
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.zip,
          country: shippingAddress.country || 'US',
        },
        address_source: 'shipping',
      },
    };

    const res = await fetch('https://api.stripe.com/v1/tax/calculations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: toForm(params),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Stripe Tax error ${res.status}: ${text}`);
    }

    const calc = (await res.json()) as any;

    return {
      taxAmountCents: calc.tax_amount_exclusive ?? 0,
      totalAmountCents: calc.amount_total ?? 0,
      calculationId: calc.id,
    };
  },

  /**
   * Commit a previously computed tax calculation once the order
   * has been paid so it appears on Stripe Tax reports.
   * Safe to skip in dev; only call after a successful PayPal capture.
   */
  async commit(calculationId: string, reference: string): Promise<string | null> {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || !calculationId) return null;

    const res = await fetch('https://api.stripe.com/v1/tax/transactions/create_from_calculation', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: toForm({ calculation: calculationId, reference }),
    });

    if (!res.ok) {
      const text = await res.text();
      strapi.log.warn(`Stripe Tax commit failed (${res.status}): ${text}`);
      return null;
    }

    const tx = (await res.json()) as any;
    return tx.id || null;
  },
});
