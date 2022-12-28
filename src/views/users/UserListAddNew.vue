<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template>
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 v-if="newForm" class="mb-0">
          Crear nuevo usuario
        </h5>
        <h5 v-else class="mb-0">
          <span v-if="formDisabled">Detalle de usuario</span>
          <span v-else>Editar usuario</span>
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
          class="auth-login-form p-2"
          @submit.prevent="newForm ? store() : edit()"
          @reset.prevent="resetForm"
        >

          <!-- Name -->
          <validation-provider
            #default="{ errors }"
            name="Nombre"
            rules="required"
          >
            <b-form-group
              label="Nombre"
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

          <!-- Email -->
          <validation-provider
            #default="{ errors }"
            name="Email"
            rules="required|email"
          >
            <b-form-group
              label="Email"
              label-for="email"
              :class="errors.length > 0 ? 'is-invalid':null"
            >
              <b-form-input
                id="email"
                v-model="formData.email"
                :state="errors.length > 0 ? false:null"
                autofocus
                trim
                :disabled="formDisabled"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>

          <!-- Roles -->
          <validation-provider
            #default="{ errors }"
            name="Roles"
            rules="required"
          >
            <b-form-group
              label="Roles"
              label-for="roles"
              :class="errors.length > 0 ? 'is-invalid':null"
            >

              <v-select
                id="roles"
                v-model="formData.roles"
                :options="roleOptions"
                :reduce="val => val.id"
                label="name"
                :state="errors.length > 0 ? false:null"
                autofocus
                trim
                clearable
                multiple
                :disabled="formDisabled"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>

          <!-- Password -->
          <b-form-group v-if="newForm">
            <div class="d-flex justify-content-between">
              <label for="password">Contraseña</label>
            </div>
            <validation-provider
              #default="{ errors }"
              name="Contraseña"
              vid="Password"
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid':null"
              >
                <b-form-input
                  id="password"
                  v-model="formData.password"
                  :state="errors.length > 0 ? false:null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="password"
                  placeholder="Contraseña"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- Confirm Password -->
          <b-form-group v-if="newForm">
            <div class="d-flex justify-content-between">
              <label for="confirm-password">Confirmar contraseña</label>
            </div>
            <validation-provider
              #default="{ errors }"
              name="Confirmar contraseña"
              rules="required|confirmed:Password"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid':null"
              >
                <b-form-input
                  id="c_password"
                  v-model="formData.c_password"
                  :state="errors.length > 0 ? false:null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="c_password"
                  placeholder="Confirmar contraseña"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

        </b-form>
      </validation-observer>
    </template>
    <template v-if="!formDisabled" #footer>
      <b-button-toolbar justify>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-secondary"
          style="width: 50%"
          @click="close"
        >
          Cancelar
        </b-button>

        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="primary"
          style="width: 50%"
          @click="newForm ? store() : edit()"
        >
          Guardar
        </b-button>
          
      </b-button-toolbar>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, 
  BForm, 
  BFormGroup, 
  BFormInput, 
  BFormInvalidFeedback, 
  BButton, 
  BFormCheckbox, 
  BFormCheckboxGroup, 
  BButtonToolbar,
  BInputGroupAppend, 
  BInputGroup, 
} from 'bootstrap-vue'
import es from 'vee-validate/dist/locale/es';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  name: 'UserAddNew',
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
    BInputGroupAppend,
    BInputGroup,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  directives: {
    Ripple,
  },
  props: {
    isAddNewUserSidebarActive: {
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
    roleOptions: {
      type: Array,
      required: true,
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
            name: item.fullName,
            email: item.email,
            roles: item.role,
          }
        }
      },
    },
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  data() {
    return {
      newForm: true,
      formData: {
        id: null,
        name: '',
        email: '',
        roles: [],
        password: '',
        c_password: '',
      },
      listPermissions: [],
    }
  },
  created() {
    
  },
  methods: {
    store() {
      localize('es', es);
      this.$refs.formData.validate().then(success => {
        if(success) {
          this.$http.post('/auth/register', this.formData)
          .then((response) => {
            this.$emit('refetch-data')
            this.$emit('update:is-add-new-user-sidebar-active', false)
            this.resetForm()
            this.$refs.formData.reset()
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Usuario creado`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `Usuario ${response.data.user.name} creado con éxito`,
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
            this.$emit('refetch-data')
            this.$emit('update:is-add-new-user-sidebar-active', false)
            this.resetForm()
            this.$refs.formData.reset()
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Usuario editado`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `Usuario ${response.data.role.name} editado con éxito`,
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
        email: '',
        roles: [],
        password: '',
        c_password: '',
      }
    },
    close() {
      this.$emit('update:is-add-new-user-sidebar-active', false)
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
@import '@core/scss/vue/pages/page-auth.scss';
#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
