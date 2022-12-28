<template>

  <div>

    <role-add-new
      :is-add-new-role-sidebar-active.sync="isAddNewRoleSidebarActive"
      :form-data-edit="formDataEdit"
      :form-disabled="formDisabled"
      @fetch-roles="fetchRoles"
    />
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Mostrar</label>
            <v-select
              v-model="tableSettings.perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>registros</label>
          </b-col>

          
          

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="tableSettings.searchQuery"
                class="d-inline-block mr-1"
                placeholder="Buscar..."
              />
              <b-button
                variant="primary"
                @click="isAddNewRoleSidebarActive = true"
              >
                <span class="text-nowrap">Nuevo rol</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>
      
      <b-table
        ref="refRoleListTable"
        class="position-relative"
        :items="dataTable"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="tableSettings.sortBy"
        show-empty
        empty-text="No se encontraron datos"
        :sort-desc.sync="tableSettings.sortDesc"
      >
  
        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
  
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="detailRole(data.item)">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Detalle</span>
            </b-dropdown-item>
  
            <b-dropdown-item @click="editRole(data.item)">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>
  
            <b-dropdown-item @click="deleteRole(data.item)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Eliminar</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
  
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
  
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Viendo del {{ dataMeta.from }} al {{ dataMeta.to }} de {{ dataMeta.of }} registros</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
  
            <b-pagination
              v-model="tableSettings.page"
              :total-rows="totalRows"
              :per-page="tableSettings.perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
  
          </b-col>
  
        </b-row>
      </div>

    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import RoleAddNew from './RoleAddNew.vue'

export default {
  name: 'Role',
  components: {
    RoleAddNew,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  data() {
    return {
      formDisabled: false,
      isAddNewRoleSidebarActive: false,
      refRoleListTable: null,
      perPageOptions: [10, 25, 50, 100],
      searchQuery: '',
      tableColumns: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Rol', sortable: true },
        { key: 'countPermissions', label: 'Permisos asignados'},
        { key: 'actions', label: 'acciones' },
      ],
      sortBy: 'id',
      isSortDirDesc: true,
      totalRows: 0,
      dataMeta: {
        from: 0,
        to: 0,
        of: 0,
      },
      dataTable: [],
      showLoadingTable: false,
      tableSettings: {
        searchQuery: '',
        perPage: 10,
        page: 1,
        sortBy: 'id',
        sortDesc: true,
      },
      formDataEdit: {},
    }
  },
  watch: {
    "tableSettings.sortBy": {
      handler(val) {
        this.fetchRoles()
      },
    },
    "tableSettings.sortDesc": {
      handler(val) {
        this.fetchRoles()
      },
    },
    "tableSettings.perPage": {
      handler(val) {
        this.fetchRoles()
      },
    },
    "tableSettings.searchQuery": {
      handler(val) {
        this.fetchRoles()
      },
    },
    "tableSettings.page": {
      handler(val) {
        this.fetchRoles()
      },
    },
  },
  created() {
    this.fetchRoles()
  },
  methods: {
    fetchRoles() {
      this.showLoadingTable = true
      this.$http.get('/roles/list', { params: this.tableSettings }).then((response) => {
        this.dataTable = response.data.roles
        this.totalRows = response.data.total
        this.dataMetaCounter()
        this.showLoadingTable = false
      })
    },
    dataMetaCounter() {
      const localItemsCount = this.dataTable.length
      this.dataMeta.from = this.tableSettings.perPage * (this.tableSettings.page - 1) + (localItemsCount ? 1 : 0)
      this.dataMeta.to = this.tableSettings.perPage * (this.tableSettings.page - 1) + localItemsCount
      this.dataMeta.of = this.totalRows
    },
    detailRole(role) {
      this.formDisabled = true
      this.formDataEdit = role
      this.isAddNewRoleSidebarActive = true
    },
    editRole(role) {
      this.formDataEdit = role
      this.isAddNewRoleSidebarActive = true
    },
    deleteRole(role) {
      this.$swal({
        title: `Esta séguro de eliminar el Rol ${role.name}?`,
        text: "Este proceso no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$http.post('/roles/delete/' + role.id).then(() => {
            this.fetchRoles()
            this.$swal({
              icon: 'success',
              title: 'Rol eliminado!',
              text: 'El rol ha sido eliminado.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelado',
            text: 'Eliminación cancelada',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
