export default {
  routes: [
    {
      method: 'POST',
      path: '/newsletter-posts/:id/send',
      handler: 'newsletter-post.send',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
