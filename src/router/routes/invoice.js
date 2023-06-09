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
    props:{action:'create'}
  },
  {
    path: '/invoice/edit/:id',
    name: 'invoice-edit',
    component: () => import('@/views/invoice/StoreInvoice.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Editar Factura',
      breadcrumb: [
        {
          text: 'Facturas De Venta',
          active: true,
        },
      ],
    },
    props:{action:'edit'}
  },
  {
    path: '/invoice/view/:id',
    name: 'invoice-view',
    component: () => import('@/views/invoice/StoreInvoice.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Ver Factura',
      breadcrumb: [
        {
          text: 'Facturas De Venta',
          active: true,
        },
      ],
    },
    props:{action:'view'}
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
  {
    path: '/invoice/drive/newconduces',
    name: 'invoice-newConduces',
    component: () => import('@/views/conduces/createConduce.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Nuevo Conduces',
      breadcrumb: [
        {
          text: 'Nuevo Conduces',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/drive/showconduces',
    name: 'invoice-showConduces',
    component: () => import('@/views/conduces/showConduce.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Ver Conduces',
      breadcrumb: [
        {
          text: 'Ver Conduces',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/drive/updateconduces',
    name: 'invoice-updateConduces',
    component: () => import('@/views/conduces/updateConduce.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Editar Conduces',
      breadcrumb: [
        {
          text: 'Editar Conduces',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/sales',
    name: 'invoice-sales',
    component: () => import('@/views/invoice/NewSalesInvoice.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Nueva factura de venta recurrente',
      breadcrumb: [
        {
          text: 'Nueva factura de venta recurrente',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/newcotization',
    name: 'newCotization',
    component: () => import('@/views/cotizacion/crearCotizacion.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Nueva cotización',
      breadcrumb: [
        {
          text: 'Nueva cotización',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/showInvoice',
    name: 'invoice-show-invoice',
    component: () => import('@/views/cotizacion/showInvoice.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Ver Cotización',
      breadcrumb: [
        {
          text: 'Ver Cotización',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/updateInvoice',
    name: 'invoice-update',
    component: () => import('@/views/cotizacion/updateCotizacion.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Editar Cotización',
      breadcrumb: [
        {
          text: 'Editar Cotización',
          active: true,
        },
      ],
    },
  },
  {
    path: '/invoice/newReceived',
    name: 'invoice-newReceived',
    component: () => import('@/views/invoice/NewReceivedInvoice.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Nuevo ingreso',
      breadcrumb: [
        {
          text: 'Nuevo ingreso',
          active: true,
        },
      ],
    },
  },
]
