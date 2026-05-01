export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-messages',
      handler: 'contact-message.create',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/contact-messages',
      handler: 'contact-message.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/contact-messages/:id',
      handler: 'contact-message.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/contact-messages/:id',
      handler: 'contact-message.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/contact-messages/:id',
      handler: 'contact-message.delete',
      config: {
        policies: [],
      },
    },
  ],
};
