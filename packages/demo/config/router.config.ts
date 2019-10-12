export default {
  routes: [
    {
      path: '/',
      routes: [
        {
          path: '/',
          component: './list'
        },
        {
          path: '/detail',
          component: './detail'
        }
      ]
    }
  ]
};
