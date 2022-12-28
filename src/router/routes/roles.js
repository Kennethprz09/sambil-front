export default [
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/views/roles/Roles.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Roles y Permisos',
      breadcrumb: [
        {
          text: 'Roles y Permisos',
          active: true,
        },
      ],
    },
  },
]
