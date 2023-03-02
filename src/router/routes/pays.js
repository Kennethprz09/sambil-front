export default [
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/pays/Pays.vue'),
    meta: {
      resource: 'Ver pagos',
      action: 'read',
      pageTitle: 'Pagos',
      breadcrumb: [
        {
          text: 'Pagos / Gastos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/pay/store',
    name: 'pay-store',
    component: () => import('@/views/pays/StoreInvoice.vue'),
    meta: {
      resource: 'Ver pagos',
      action: 'read',
      pageTitle: 'Crear Pago',
      breadcrumb: [
        {
          text: 'Pago',
          active: true,
        },
      ],
    },
  },
  {
    path: '/pay/edit/:id',
    name: 'pay-edit',
    component: () => import('@/views/pays/SaleInvoice.vue'),
    meta: {
      resource: 'Editar pagos',
      action: 'read',
      pageTitle: 'Editar Pago',
      breadcrumb: [
        {
          text: 'Editar Pago',
          active: true,
        },
      ],
    },
  },
  {
    path: '/pay/show/:id',
    name: 'pay-show',
    component: () => import('@/views/pays/ReceivedInvoice.vue'),
    meta: {
      resource: 'Ver pagos',
      action: 'read',
      pageTitle: 'Pagos',
      breadcrumb: [
        {
          text: 'Ver Pago',
          active: true,
        },
      ],
    },
  },
]
