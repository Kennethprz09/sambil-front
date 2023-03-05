export default [
  {
    path: '/inventory/index',
    name: 'inventoryProductsServicesIndex',
    component: () => import('@/views/inventory/productManagement/Index.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Productos y servicios',
      breadcrumb: [
        {
          text: 'Productos y servicios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/value/index',
    name: 'inventoryValueIndex',
    component: () => import('@/views/inventory/inventory-value/Index.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Valor de inventario',
      breadcrumb: [
        {
          text: 'Valor de inventario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/tweaks/index',
    name: 'inventoryTweaksIndex',
    component: () => import('@/views/inventory/inventory-tweaks/Index.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Ajustes de inventario',
      breadcrumb: [
        {
          text: 'Ajustes de inventario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/proce-list/index',
    name: 'inventoryPriceListIndex',
    component: () => import('@/views/inventory/price-list/Index.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Listas de precios',
      breadcrumb: [
        {
          text: 'Listas de precios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/warehouses/index',
    name: 'inventoryWarehousesIndex',
    component: () => import('@/views/inventory/warehouses/Index.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Almacenes',
      breadcrumb: [
        {
          text: 'Almacenes',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/categories/index',
    name: 'inventoryCategoriesIndex',
    component: () => import('@/views/inventory/categories/Index.vue'),
    meta: {
      resource: 'Ver roles',
      action: 'read',
      pageTitle: 'Categorías',
      breadcrumb: [
        {
          text: 'Categorías',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/new-inventory',
    name: 'inventory/new-inventory',
    component: () => import('@/views/inventory/productManagement/NewInventory.vue'),
    meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Inventario',
        breadcrumb: [
            {
                text: 'Inventario',
                active: true,
            },
        ],
    },
  },
]