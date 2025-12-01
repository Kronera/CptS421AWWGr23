export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: {
    data: Array<{
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
      };
    }>;
  };
  slug: string;
  inventory: number;
  category?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id?: number;
  customerEmail: string;
  customerName: string;
  shippingAddress: ShippingAddress;
  orderItems: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status?: string;
  paymentStatus?: string;
  orderNumber?: string;
}
