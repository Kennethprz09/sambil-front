export default [
  {
    title: 'Dashboard',
    route: 'home',
    icon: 'PieChartIcon',
    action: 'read',
    resource: 'Ver usuarios',
  },
  {
    title: 'Usuarios',
    route: 'users',
    icon: 'UsersIcon',
    action: 'read',
    resource: 'Ver usuarios',
  },
  {
    title: 'Roles y Permisos',
    route: 'roles',
    icon: 'LockIcon',
    action: 'read',
    resource: 'Ver roles',
  },
  {
    title: 'Contactos',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Ver roles',
    children: [
      {
        title: 'Todos',
        route: { name: 'contactsAll'},
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Clientes',
        route: { name: 'contactsClient' },
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Proveedores',
        route: { name: 'contactsProvider' },
        action: 'read',
        resource: 'Ver roles'
      }
    ],
  },
  {
    title: 'Ingresos',
    icon: 'CreditCardIcon',
    action: 'read',
    resource: 'Ver roles',
    children: [
      {
        title: 'Facturas de venta',
        route: 'invoice',
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Facturas de venta recurrentes',
        route: 'invoice-sale',
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Pagos recibidos',
        route: 'invoice-received',
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Notas de Crédito',
        route: 'invoice-credit',
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Cotizaciones',
        route: 'invoice-cotization',
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Conduces',
        route: 'invoice-drive',
        action: 'read',
        resource: 'Ver roles'
      },
    ],
  },
  {
    title: 'Compras',
    icon: 'ShoppingCartIcon',
    action: 'read',
    resource: 'Ver roles',
    children: [
      {
        title: 'Facturas de proveedores',
        route: 'invoice-provider',
        action: 'read',
        resource: 'Ver roles'
      }
    ],
  },
]
