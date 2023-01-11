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
        route: { name: 'contactsAll', params: { id: 'all' } },
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Clientes',
        route: { name: 'contactsClient', params: { id: 'clients' } },
        action: 'read',
        resource: 'Ver roles'
      },
      {
        title: 'Proveedores',
        route: { name: 'contactsProvider', params: { id: 'providers' } },
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
      }
    ],
  },
]
