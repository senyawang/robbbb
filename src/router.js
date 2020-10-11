
export default[
  {
      path: '/',
      exact: true,
      name: 'home',
      component: () => import('./components/blog/index.vue'),
      meta: {
          title: 'robbbb'
      },
  },
  {
    path: '/street',
    exact: true,
    name: 'street',
    component: () => import('./components/blog/components/art/street.vue'),
    meta: {
      title: '街头艺术'
    },
  },
  {
    path: '/street/detail/:id',
    name: 'streetDetail',
    component: () => import('./components/blog/components/art/streetDetail.vue'),
  },
  {
    path: '/video/detail/:id',
    name: 'videoDetail',
    component: () => import('./components/blog/components/art/videoDetail.vue'),
  },
  {
    path: '/shelf',
    exact: true,
    name: 'shelf',
    component: () => import('./components/blog/components/art/shelf.vue'),
    meta: {
      title: '架上艺术'
    },
  },
  {
    path: '/video',
    exact: true,
    name: 'video',
    component: () => import('./components/blog/components/art/video.vue'),
    meta: {
      title: '视频艺术'
    },
  },
  {
    path: '/fun',
    exact: true,
    name: 'fun',
    component: () => import('./components/blog/components/art/fun.vue'),
    meta: {
      title: '趣味'
    },
  },
  {
    path: '/about',
    exact: true,
    name: 'about',
    component: () => import('./components/blog/components/about'),
    meta: {
      title: '关于'
    },
  },
  {
    path: '/contact',
    exact: true,
    name: 'contact',
    component: () => import('./components/blog/components/contact'),
    meta: {
      title: '联系'
    },
  },
  {
    path: '/exhibition',
    exact: true,
    name: 'exhibition',
    component: () => import('./components/blog/components/exhibition'),
    meta: {
      title: '联系'
    },
  },
  {
    path: '/robbbbuy',
    component: () => import('./components/shop/index'),
    children: [
      {
        path: 'shop',
        name: 'shop',
        component: () => import('./components/shop/robbbbuy'),
        meta: {
          title: '购买ROBBBB'
        },
      },
      {
        path: 'shop/detail/:id',
        name: 'proDetail',
        component: () => import('./components/shop/proDetail'),
        meta: {
          title: '购买ROBBBB'
        },
      },
      {
        path: 'shop/cart',
        name: 'cart',
        component: () => import('./components/shop/cart'),
        meta: {
          title: '购物车'
        },
      },
      {
        path: 'service',
        exact: true,
        name: 'service',
        component: () => import('./components/blog/components/contact'),
        meta: {
          title: '顾客服务'
        },
      },
      {
        path: 'account',
        exact: true,
        name: 'account',
        component: () => import('./components/shop/account'),
        meta: {
          title: '我的账户'
        },
      },
      {
        path: 'history',
        exact: true,
        name: 'history',
        component: () => import('./components/shop/history'),
        meta: {
          title: '购买记录'
        },
      },
      {
        path: 'payDetail',
        exact: true,
        name: 'payDetail',
        component: () => import('./components/shop/payDetail'),
        meta: {
          title: '支付详情'
        },
      },
      {
        path: 'payment',
        exact: true,
        name: 'payment',
        component: () => import('./components/shop/payment'),
        meta: {
          title: '支付'
        },
      },
    ]
  },
]
