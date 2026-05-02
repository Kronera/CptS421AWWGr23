/**
 * shipping service  -  Shippo multi-carrier rates (via REST)
 *
 * Shipping origin is configured via STORE_* env vars.
 * Default origin is 59 E Queens Ave, Spokane WA 99207.
 */

type Address = {
  name?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  phone?: string;
  email?: string;
};

type Parcel = {
  length: string;
  width: string;
  height: string;
  distance_unit: 'in' | 'cm';
  weight: string;
  mass_unit: 'oz' | 'lb' | 'g' | 'kg';
};

type Rate = {
  amount: number;
  currency: string;
  service: string;
  rateId: string;
};

export default ({ strapi }: { strapi: any }) => ({
  origin(): Address {
    return {
      name: process.env.STORE_NAME || 'Store',
      street1: process.env.STORE_STREET1 || '59 E Queens Ave',
      street2: process.env.STORE_STREET2 || '',
      city: process.env.STORE_CITY || 'Spokane',
      state: process.env.STORE_STATE || 'WA',
      zip: process.env.STORE_ZIP || '99207',
      country: process.env.STORE_COUNTRY || 'US',
      phone: process.env.STORE_PHONE || '',
    };
  },

  /**
   * Build a single parcel sized to hold the cart.
   * Uses per-product weight_oz / dims if present, otherwise falls back to defaults.
   */
  buildParcelForCart(
    items: Array<{ quantity: number; product: any }>
  ): Parcel {
    const totalWeightOz = items.reduce((sum, i) => {
      const w = Number(i.product?.weight_oz ?? i.product?.weightOz ?? 8);
      return sum + w * i.quantity;
    }, 0);

    return {
      length: String(process.env.DEFAULT_PARCEL_LENGTH_IN || 10),
      width: String(process.env.DEFAULT_PARCEL_WIDTH_IN || 8),
      height: String(process.env.DEFAULT_PARCEL_HEIGHT_IN || 6),
      distance_unit: 'in',
      weight: String(Math.max(1, Math.round(totalWeightOz))),
      mass_unit: 'oz',
    };
  },

  /**
   * Get the cheapest available rate for the given address + parcel.
   */
  async getCheapestRate(
    shippingAddress: Address,
    parcel: Parcel
  ): Promise<Rate> {
    const token = process.env.SHIPPO_API_TOKEN;
    if (!token) {
      throw new Error(
        'SHIPPO_API_TOKEN is not set. Add it to apps/cms/.env to enable live shipping rates.'
      );
    }

    const body = {
      address_from: this.origin(),
      address_to: {
        name: shippingAddress.name || '',
        street1: shippingAddress.street1,
        street2: shippingAddress.street2 || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
        country: shippingAddress.country || 'US',
        phone: shippingAddress.phone || '',
        email: shippingAddress.email || '',
      },
      parcels: [parcel],
      async: false,
    };

    const res = await fetch('https://api.goshippo.com/shipments/', {
      method: 'POST',
      headers: {
        Authorization: `ShippoToken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Shippo error ${res.status}: ${text}`);
    }

    const shipment = (await res.json()) as any;
    const rates: any[] = shipment.rates || [];
    if (rates.length === 0) {
      throw new Error(
        'No shipping rates available for this address. Check address validity or parcel dimensions.'
      );
    }

    const cheapest = rates
      .map((r) => ({ ...r, amountNum: parseFloat(r.amount) }))
      .sort((a, b) => a.amountNum - b.amountNum)[0];

    return {
      amount: cheapest.amountNum,
      currency: cheapest.currency,
      service: `${cheapest.provider} ${cheapest.servicelevel?.name || ''}`.trim(),
      rateId: cheapest.object_id,
    };
  },
});
