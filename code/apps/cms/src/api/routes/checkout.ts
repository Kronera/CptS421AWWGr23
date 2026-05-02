/**
 * checkout routes
 *
 * All endpoints are marked `auth: false` because the checkout flow
 * is anonymous. Add rate limiting / origin checks in middlewares.ts
 * before going to production.
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/checkout/quote',
      handler: 'checkout.quote',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/checkout/paypal/create-order',
      handler: 'checkout.createPaypalOrder',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/checkout/paypal/capture-order',
      handler: 'checkout.capturePaypalOrder',
      config: { auth: false },
    },
  ],
};
