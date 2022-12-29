<template>

    <div>  
      <!-- Table Container Card -->
      <b-card no-body class="mb-0">
  
        <div class="m-2">
  
          <!-- Table Top -->
          <b-row>
            <!-- Per Page -->
            <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
              <label>Mostrar</label>
              <v-select v-model="tableSettings.perPage" :options="perPageOptions" :clearable="false"
                class="per-page-selector d-inline-block mx-50" />
              <label>registros</label>
            </b-col>
            <!-- Search -->
            <b-col cols="12" md="6">
              <div class="d-flex align-items-center justify-content-end">
                <b-button variant="primary" @click="newContact()">
                  <span class="text-nowrap">Nuevo contacto</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-table ref="refRoleListTable" class="position-relative" :items="dataTable" responsive :fields="tableColumns"
          primary-key="id" :sort-by.sync="tableSettings.sortBy" show-empty empty-text="No se encontraron datos"
          :sort-desc.sync="tableSettings.sortDesc">
          <template #cell(role)="data">
            <div v-for="(item, index) in data.item.role" :key="index">
              <span>{{ item }}</span>
            </div>
          </template>
          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <b-button @click="detail(data.item.id)" v-b-modal.modal-ver variant="primary"
              class="btn-icon rounded-circle ml-2" v-b-tooltip.hover.v-primary title="Ver">
              <feather-icon icon="EyeIcon" />
            </b-button>
            <b-button @click="editUser(data.item.id), update = true" v-b-modal.modal-editar variant="warning"
              class="btn-icon rounded-circle ml-2" v-b-tooltip.hover.v-primary title="Editar">
              <feather-icon icon="EditIcon" />
            </b-button>
            <b-button @click="user_delete(data.item.id)" variant="danger" class="btn-icon rounded-circle ml-2"
              v-b-tooltip.hover.v-primary title="Eliminar">
              <feather-icon icon="Trash2Icon" />
            </b-button>
            <b-button @click="(id_password(data.item), modal_password = true, resetFormPassword())" variant="success"
              class="btn-icon rounded-circle ml-2" v-b-tooltip.hover.v-primary title="Cambiar Contraseña">
              <feather-icon icon="UnlockIcon" />
            </b-button>
          </template>
        </b-table>
        <div class="mx-2 mb-2">
          <b-row>
  
            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
              <span class="text-muted">Viendo del {{ dataMeta.from }} al {{ dataMeta.to }} de {{ dataMeta.of }}
                registros</span>
            </b-col>
            <!-- Pagination -->
            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
  
              <b-pagination v-model="tableSettings.page" :total-rows="totalRows" :per-page="tableSettings.perPage"
                first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </b-col>
          </b-row>
        </div>
      </b-card>    
    </div>
  </template>
  
  <script>
  extend('required', {
    ...required,
    message: 'El campo {_field_} es obligatorio'
  });
  import { extend } from 'vee-validate'
  import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
  import { required } from '@validations'
  import {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BFormGroup, BForm, VBTooltip
  } from 'bootstrap-vue'
  import vSelect from 'vue-select'
  import Ripple from 'vue-ripple-directive'
  export default {
    name: 'Users',
    components: {
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
      BFormGroup,
      BForm,
      ValidationProvider,
      ValidationObserver,
      VBTooltip
    },
    data() {
      return {
        update: false,
        modal_password: false,
        formDisabled: false,
        isAddNewUserSidebarActive: false,
        refRoleListTable: null,
        perPageOptions: [10, 25, 50, 100],
        searchQuery: '',
        tableColumns: [
          { key: 'id', label: 'Id', sortable: true },
          { key: 'fullName', label: 'Nombre', sortable: true },
          { key: 'email', label: 'Identificación' },
          { key: 'role', label: 'Télefono' },
          { key: 'actions', label: 'Acciones' },
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
        roles: [],
      }
    },
    directives: {
      Ripple,
      'b-tooltip': VBTooltip,
    },
    watch: {
      "tableSettings.sortBy": {
        handler(val) {
          this.fetchUsers()
          this.fetchRoles()
        },
      },
      "tableSettings.sortDesc": {
        handler(val) {
          this.fetchUsers()
          this.fetchRoles()
        },
      },
      "tableSettings.perPage": {
        handler(val) {
          this.fetchUsers()
          this.fetchRoles()
        },
      },
      "tableSettings.searchQuery": {
        handler(val) {
          this.fetchUsers()
          this.fetchRoles()
        },
      },
      "tableSettings.page": {
        handler(val) {
          this.fetchUsers()
          this.fetchRoles()
        },
      },
    },
    created() {
      this.fetchUsers()
      this.fetchRoles()
    },
    methods: {
      fetchRoles() {
        this.$http.get('roles/list').then((response) => {
          this.roles = response.data.roles
        })
      },
      dataMetaCounter() {
        const localItemsCount = this.dataTable.length
        this.dataMeta.from = this.tableSettings.perPage * (this.tableSettings.page - 1) + (localItemsCount ? 1 : 0)
        this.dataMeta.to = this.tableSettings.perPage * (this.tableSettings.page - 1) + localItemsCount
        this.dataMeta.of = this.totalRows
      },
      newContact() {
        this.$router.push('contacts/new-contact');
      }
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