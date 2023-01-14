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
    {
      path: '/invoice/sale',
      name: 'invoice-sale',
      component: () => import('@/views/invoice/SaleInvoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'ventas recurrentes',
        breadcrumb: [
          {
            text: 'Facturas de venta recurrentes',
            active: true,
          },
        ],
      },
    },
    {
      path: '/invoice/received',
      name: 'invoice-received',
      component: () => import('@/views/invoice/ReceivedInvoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Pagos',
        breadcrumb: [
          {
            text: 'Pagos recibidos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/invoice/credit',
      name: 'invoice-credit',
      component: () => import('@/views/invoice/CreditInvoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Notas de crédito',
        breadcrumb: [
          {
            text: 'Notas de crédito',
            active: true,
          },
        ],
      },
    },
    {
      path: '/invoice/cotization',
      name: 'invoice-cotization',
      component: () => import('@/views/invoice/CotizationInvoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Cotizaciones',
        breadcrumb: [
          {
            text: 'Cotizaciones',
            active: true,
          },
        ],
      },
    },
    {
      path: '/invoice/drive',
      name: 'invoice-drive',
      component: () => import('@/views/invoice/DriveInvoice.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Conduces',
        breadcrumb: [
          {
            text: 'Conduces',
            active: true,
          },
        ],
      },
    },
  ]
  