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
    title: 'Ingresos',
    icon: 'CreditCardIcon',
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
]
