export default [
    {
      path: '/settings-numbers',
      name: 'settings-numbers',
      component: () => import('@/views/settings/settingsNumbers.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Numeración de documentos',
        breadcrumb: [
          {
            text: 'Numeración de documentos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/settings-numbers/new',
      name: 'settings-numbers-new',
      component: () => import('@/views/settings/settingsNumbersNew.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Creacion Numeración de documentos',
        breadcrumb: [
          {
            text: 'Creacion Numeración de documentos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/settings-numbers/show',
      name: 'settings-numbers-show',
      component: () => import('@/views/settings/settingsNumbersShow.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Ver Numeración de documentos',
        breadcrumb: [
          {
            text: 'Ver Numeración de documentos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/settings-numbers/edit',
      name: 'settings-numbers-edit',
      component: () => import('@/views/settings/settingsNumbersEdit.vue'),
      meta: {
        resource: 'Ver roles',
        action: 'read',
        pageTitle: 'Editar Numeración de documentos',
        breadcrumb: [
          {
            text: 'Editar Numeración de documentos',
            active: true,
          },
        ],
      },
    },
  ]
  