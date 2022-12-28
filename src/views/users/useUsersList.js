import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUsersList() {
  // Use toast
  const toast = useToast()

  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'user', label: 'usuario', sortable: true },
    { key: 'email', sortable: true },
    { key: 'role', label: 'Roles', sortable: true },
    { key: 'actions', label: 'acciones' },
  ]
  const perPage = ref(10)
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const roleFilter = ref(null)
  const roles = ref([])
  const agencies = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    }
  })

  const refetchData = () => {
    refUserListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, roleFilter], () => {
    refetchData()
  })

  const fetchUsers = (ctx, callback) => {
    store
      .dispatch('app-user/fetchUsers', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
      })
      .then(response => {
        const { users, total } = response.data

        callback(users)
        totalUsers.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error al obtener la lista de usuarios',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const roleOptions = (ctx, callback) => {
    store
      .dispatch('app-user/roleOptions')
      .then(response => {
        const { roles } = response.data
        callback(roles)
        roles.value = roles
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error al obtener la lista de roles',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const agencyOptions = (ctx, callback) => {
    store
      .dispatch('app-user/agencyOptions')
      .then(response => {
        const { agencies } = response.data
        callback(agencies)
        roles.value = agencies
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error al obtener la lista de agencias',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }


  return {
    fetchUsers,
    roleOptions,
    agencyOptions,
    roles,
    agencies,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,

    refetchData,

    // Extra Filters
    roleFilter,
  }
}
