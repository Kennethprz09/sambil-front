export default [
    {
        path: '/contacts',
        name: 'contacts',
        component: () => import('@/views/Contact/Contact.vue'),
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
]
