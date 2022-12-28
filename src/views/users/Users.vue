<template>

  <div>

    <user-list-add-new :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive" :role-options="roles"
      :form-data-edit="formDataEdit" :form-disabled="formDisabled" @refetch-data="fetchUsers" />

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
              <b-form-input v-model="tableSettings.searchQuery" class="d-inline-block mr-1" placeholder="Buscar..." />
              <b-button variant="primary" @click="isAddNewUserSidebarActive = true">
                <span class="text-nowrap">Nuevo usuario</span>
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
    <!-- modal ver usuario -->
    <b-modal id="modal-ver" hide-footer title="Ver Usuario">
      <b-form>
        <b-row>
          <b-col md="6" xl="6" class="mb-1">
            <b-form-group>
              <label for="email">Nombre</label>
              <b-form-input disabled v-model="user.name" />
            </b-form-group>
          </b-col>
          <b-col md="6" xl="6" class="mb-1">
            <b-form-group>
              <label>Email</label>
              <b-form-input disabled v-model="user.email" />
            </b-form-group>
          </b-col>
          <b-col md="6" xl="6" class="mb-1">
            <b-form-group>
              <label>Rol</label>
              <v-select v-model="user.user_roles" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" disabled
                label="name" :options="roles" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <!-- modal ver usuario -->
    <!-- modal editar usuario -->
    <b-modal hide-footer title="Editar Usuario" v-model="update">
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col md="12" xl="12" class="mb-1">
              <validation-provider #default="{ errors }" name="Nombre" rules="required">
                <b-form-group>
                  <label for="email">Nombre</label>
                  <b-form-input v-model="user.name" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12" xl="12" class="mb-1">
              <validation-provider #default="{ errors }" name="Email" rules="required">
                <b-form-group>
                  <label>Email</label>
                  <b-form-input v-model="user.email" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12" xl="12" class="mb-1">
              <validation-provider #default="{ errors }" name="Rol" rules="required">
                <b-form-group>
                  <label>Rol</label>
                  <v-select v-model="user.user_roles" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" multiple
                    label="name" :options="roles" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12" xl="12" class="mb-1 text-center">
              <b-button @click="validationForm(user.id)" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
                Actualizar
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
    <!-- modal editar usuario -->
    <!-- modal cambiar contraseña -->
    <b-modal hide-footer title="Cambiar Contraseña" v-model="modal_password">
      <validation-observer ref="formChangePassword">
        <b-form>
          <b-row>
            <b-col md="12" xl="12" class="mb-1">
              <b-form-group>
                <label for="name">Nombre</label>
                <b-form-input disabled v-model="change_password_user.name" />
              </b-form-group>
            </b-col>
            <b-col md="12" xl="12" class="mb-1">
              <validation-provider #default="{ errors }" name="Confirmar contraseña" vid="Password" rules="required">
                <b-form-group :class="errors.length > 0 ? 'is-invalid' : null">
                  <label for="email">Contraseña</label>
                  <b-form-input :state="errors.length > 0 ? false : null" v-model="change_password_user.password" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12" xl="12" class="mb-1">
              <validation-provider #default="{ errors }" name="Confirmar contraseña"
                rules="required|confirmed:Password">
                <b-form-group :class="errors.length > 0 ? 'is-invalid' : null">
                  <label>Confirmar Contraseña</label>
                  <b-form-input :state="errors.length > 0 ? false : null"
                    v-model="change_password_user.confirm_password" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12" xl="12" class="mb-1 text-center">
              <b-button @click="validationFormChangePassword()" v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary">
                Actualizar
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
    <!-- modal cambiar contraseña -->
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
import UserListAddNew from './UserListAddNew.vue'
import Ripple from 'vue-ripple-directive'
import es from 'vee-validate/dist/locale/es'
export default {
  name: 'Users',
  components: {
    UserListAddNew,
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
        { key: 'email', label: 'Correo' },
        { key: 'role', label: 'Roles' },
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
      roles: [],
      user: {
        id: '',
        name: '',
        email: '',
        user_roles: {},
        password: ''
      },
      change_password_user: {
        id: '',
        name: '',
        password: '',
        confirm_password: ''
      },
      user_name: ''
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
    resetFormPassword() {
      this.change_password_user = {
        id: '',
        name: '',
        password: '',
        confirm_password: ''
      }
    },
    validationForm(id) {
      localize('es', es);
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.updateUser(id);
        }
      })
    },
    validationFormChangePassword() {
      localize('es', es);
      this.$refs.formChangePassword.validate().then(success => {
        if (success) {
          this.change_password();
        }
      })
    },
    fetchUsers() {
      this.showLoadingTable = true
      this.$http.get('/user/index', { params: this.tableSettings }).then((response) => {
        this.dataTable = response.data.users
        this.totalRows = response.data.total
        this.dataMetaCounter()
        this.showLoadingTable = false
      })
    },
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
    detail(id) {
      this.$http.get('/user/show/' + id).then(response => {
        this.user = response.data.user;
      });
    },
    editUser(id) {
      this.$http.get('/user/show/' + id).then(response => {
        this.user = response.data.user;
      });
    },
    updateUser(id) {
      this.$http.post('/user/update/' + id, this.user)
        .then(response => {
          if (response.data.code == 200) {
            this.$swal({
              title: response.data.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false,
            });
            this.fetchUsers();
            this.update = false;
          }
          if (response.data.code == 500) {
            this.$swal({
              title: response.data.message,
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-warning',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    user_delete(id) {
      this.$swal({
        title: `Esta séguro de eliminar el Usuario?`,
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
          this.$http.post('/user/delete/' + id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Usuario eliminado!',
              text: 'El Usuario ha sido eliminado.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            this.fetchUsers();
          });
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
    id_password(user) {
      this.change_password_user.id = user.id;
      this.change_password_user.name = user.fullName;
    },
    change_password() {
      let password_user = this.change_password_user.id;
      this.$http.post('/user/change_password/' + password_user, this.change_password_user)
        .then(response => {
          if (response.data.code == 200) {
            this.$swal({
              title: response.data.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false,
            });
            this.modal_password = false;
            this.change_password_user = {
              id: '',
              name: '',
              password: '',
              confirm_password: ''
            }
          }
          if (response.data.code == 500) {
            this.$swal({
              title: response.data.message,
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-warning',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
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