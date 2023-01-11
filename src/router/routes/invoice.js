export default [
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('@/views/invoice/Invoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Facturas',
        breadcrumb: [
          {
            text: 'Facturas De Venta',
            active: true,
          },
        ],
      },
    },
    {
      path: '/invoice/store',
      name: 'invoice-store',
      component: () => import('@/views/invoice/StoreInvoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Crear Factura',
        breadcrumb: [
          {
            text: 'Facturas De Venta',
            active: true,
          },
        ],
      },
    },
  ]
  