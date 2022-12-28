<template>
  <b-sidebar
    id="add-new-role-sidebar"
    :visible="isAddNewRoleSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => $emit('update:is-add-new-role-sidebar-active', val)"
  >
    <template>
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 v-if="newForm" class="mb-0">
          Crear nuevo rol
        </h5>
        <h5 v-else class="mb-0">
          <span v-if="formDisabled">Detalle de rol</span>
          <span v-else>Editar rol</span>
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="close"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        ref="formData"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="newForm ? store() : edit()"
          @reset.prevent="resetForm"
        >

          <!-- Name -->
          <validation-provider
            #default="{ errors }"
            name="Rol"
            rules="required"
          >
            <b-form-group
              label="Rol"
              label-for="name"
              :class="errors.length > 0 ? 'is-invalid':null"
            >
              <b-form-input
                id="name"
                v-model="formData.name"
                :state="errors.length > 0 ? false:null"
                autofocus
                trim
                :disabled="formDisabled"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>

          <!-- Permissions -->
          <validation-provider
            #default="{ errors }"
            name="Permisos"
            rules="required"
          >
            <b-form-group label="Permisos">
              <small class="text-danger">{{ errors[0] }}</small>
              <b-form-checkbox
                v-for="permission in listPermissions"
                :key="permission.name"
                v-model="formData.permissions"
                :value="permission.name"
                :state="errors.length > 0 ? false:null"
                name="flavour-4a"
                stacked
                :disabled="formDisabled"
              >
                {{ permission.name }}
              </b-form-checkbox>
            </b-form-group>
          </validation-provider>

        </b-form>
      </validation-observer>
    </template>
    <template v-if="!formDisabled" #footer>
      <b-button-toolbar justify>
        
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            style="width: 50%"
            @click="newForm ? store() : edit()"
          >
            Guardar
          </b-button>
          
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-secondary"
            style="width: 50%"
            @click="close"
          >
            Cancelar
          </b-button>
      </b-button-toolbar>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormCheckbox, BFormCheckboxGroup, BButtonToolbar,
} from 'bootstrap-vue'
import es from 'vee-validate/dist/locale/es';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  name: 'RoleAddNew',
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    BFormCheckbox,
    BFormCheckboxGroup,
    BButtonToolbar,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  props: {
    isAddNewRoleSidebarActive: {
      type: Boolean,
      required: true,
    },
    formDisabled: {
      type: Boolean,
      required: true,
    },
    formDataEdit: {
      type: Object,
      required: false,
    },
  },
  watch: {
    formDataEdit: {
      handler(item, oldItem) {
        const id = parseInt(item.id) ?? null
        if (id) {
          this.newForm = false
          this.formData = {
            id: item.id,
            name: item.name,
            permissions: item.permissions,
          }
        }
      },
    },
  },
  data() {
    return {
      newForm: true,
      formData: {
        id: null,
        name: '',
        permissions: [],
      },
      listPermissions: [],
    }
  },
  created() {
    this.getPermissions()
  },
  methods: {
    getPermissions() {
      this.$http.get('/roles/permissions').then((response) => {
        this.listPermissions = response.data.permissions
      })
    },
    store() {
      localize('es', es);
      this.$refs.formData.validate().then(success => {
        if(success) {
          this.$http.post('/roles/store', this.formData)
          .then((response) => {
            this.$emit('fetch-roles')
            this.$emit('update:is-add-new-role-sidebar-active', false)
            this.resetForm()
            this.$refs.formData.reset()
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Rol creado`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `Rol ${response.data.role.name} creado con éxito`,
              },
            })
          })
          .catch(error => {
            console.log('error')
          })
        }
      })
    },
    edit() {
      localize('es', es);
      this.$refs.formData.validate().then(success => {
        if(success) {
          this.$http.post('/roles/edit', this.formData)
          .then((response) => {
            this.refreshUser()
            this.$emit('fetch-roles')
            this.$emit('update:is-add-new-role-sidebar-active', false)
            this.resetForm()
            this.$refs.formData.reset()
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Rol editado`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `Rol ${response.data.role.name} editado con éxito`,
              },
            })
          })
          .catch(error => {
            console.log('error')
          })
        }
      })
    },
    resetForm() {
      this.formData= {
        id: null,
        name: '',
        permissions: [],
      }
    },
    close() {
      this.$emit('update:is-add-new-role-sidebar-active', false)
      this.resetForm()
      this.$refs.formData.reset()
    },
    refreshUser() {
      this.$http.get('auth/user').then((response) => {
        const { userData } = response.data
        localStorage.setItem('userData', JSON.stringify(userData))
        this.$ability.update(userData.ability)
      })
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
