export default [
    {
        path: '/contacts/new-contact',
        name: 'contacts/new-contact',
        component: () => import('@/views/Contact/StoreContact.vue'),
        meta: {
            resource: 'Ver roles',
            action: 'read',
            pageTitle: 'Contactos',
            breadcrumb: [
                {
                    text: 'Contactos',
                    active: true,
                },
            ],
        },
    },
    {
        path: '/contacts/all',
        name: 'contactsAll',
        component: () => import('@/views/Contact/Contact.vue'),
        meta: {
            resource: 'Ver roles',
            action: 'read',
            pageTitle: 'Clientes',
            breadcrumb: [
                {
                    text: 'Clientes',
                    active: true,
                },
            ],
        },
    },
    {
        path: '/contacts/clients',
        name: 'contactsClient',
        component: () => import('@/views/Contact/ContactClients.vue'),
        meta: {
            resource: 'Ver roles',
            action: 'read',
            pageTitle: 'Clientes',
            breadcrumb: [
                {
                    text: 'Clientes',
                    active: true,
                },
            ],
        },
    },
    {
        path: '/contacts/providers',
        name: 'contactsProvider',
        component: () => import('@/views/Contact/ContactProviders.vue'),
        meta: {
            resource: 'Ver roles',
            action: 'read',
            pageTitle: 'Clientes',
            breadcrumb: [
                {
                    text: 'Clientes',
                    active: true,
                },
            ],
        },
    }
]
