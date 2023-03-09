export default [
    {
      path: '/invoice-provider',
      name: 'invoice-provider',
      component: () => import('@/views/invoiceProvider/InvoiceProvider.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Facturas',
        breadcrumb: [
          {
            text: 'Facturas De Proveedor',
            active: true,
          },
        ],
      },
    },
    {
      path: '/invoice-provider/create',
      name: 'invoice-provider-create',
      component: () => import('@/views/invoiceProvider/CreateInvoiceProvider.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Crear Factura',
        breadcrumb: [
          {
            text: 'Facturas De Proveedor',
            active: true,
          },
        ],
      },
      props:{action:'create'}
    },
    {
      path: '/invoice-provider/edit/:id',
      name: 'invoice-provider-edit',
      component: () => import('@/views/invoiceProvider/CreateInvoiceProvider.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Editar Factura',
        breadcrumb: [
          {
            text: 'Facturas De Proveedor',
            active: true,
          },
        ],
      },
      props:{action:'edit'}
    },
    {
      path: '/invoice-provider/view/:id',
      name: 'invoice-provider-view',
      component: () => import('@/views/invoiceProvider/CreateInvoiceProvider.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Ver Factura',
        breadcrumb: [
          {
            text: 'Facturas De Proveedor',
            active: true,
          },
        ],
      },
      props:{action:'view'}
    },
  ]
  