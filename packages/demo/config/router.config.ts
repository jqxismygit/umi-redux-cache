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
          path: '/detail/:id',
          component: './detail'
        }
      ]
    }
  ]
};
