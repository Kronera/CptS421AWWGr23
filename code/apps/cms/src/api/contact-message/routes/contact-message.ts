/**
 * contact-message router
 *
 * Public POST (create) — no auth required so the website form can submit.
 * All other actions (read, update, delete) require authentication.
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-messages',
      handler: 'contact-message.create',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/contact-messages',
      handler: 'contact-message.find',
      config: {},
    },
    {
      method: 'GET',
      path: '/contact-messages/:id',
      handler: 'contact-message.findOne',
      config: {},
    },
    {
      method: 'PUT',
      path: '/contact-messages/:id',
      handler: 'contact-message.update',
      config: {},
    },
    {
      method: 'DELETE',
      path: '/contact-messages/:id',
      handler: 'contact-message.delete',
      config: {},
    },
  ],
};
