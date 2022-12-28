export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/users/Users.vue'),
    meta: {
      resource: 'Ver usuarios',
      action: 'read',
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Usuarios',
          active: true,
        },
      ],
    },
  },
]
