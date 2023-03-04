<template>
  <div>
    <h3 class="mt-2 mb-2">
      Nuevo Pago
    </h3>
    <b-card
      no-body
      class="mb-0"
    >
      <b-row>
        <b-col
          md="6"
          xl="4"
          class=" mt-2 mb-3 ml-3"
        >
          <label for="Lista de precios">Lista de precios</label>
          <v-select
            v-model="form.list_price"
            :reduce="val => val.value"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="listPrice"
            placeholder="Seleccione"
          />
        </b-col>
      </b-row>
    </b-card>
    <b-card
      no-body
      class="mt-2 mb-0"
    >
      <b-row>
        <b-col
          md="4"
          xl="4"
          class="mb-3 p-3"
        >
          <b-img
            class="imgLogo"
            :src="require('@/assets/images/logo/sambil-logo.png')"
            fluid
            alt="Responsive image"
          />
        </b-col>
        <b-col
          md="4"
          xl="4"
          class="mb-3 p-3"
        >
          <h4>Nombre De la Persona Logueada</h4>
        </b-col>
        <b-col
          md="4"
          xl="4"
          class="mb-3 p-3"
        >
          <v-select
            v-model="form.credit"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="credits"
            placeholder="Seleccionar"
            :reduce="val => val.value"
          />
          <h2
            v-if="form.credit.value == 1"
            class="mt-2"
          >
            NCF B1600000001
          </h2>
          <h2
            v-else-if="form.credit.value == 2"
            class="mt-2"
          >
            NCF B0200000001
          </h2>
          <h2
            v-else-if="form.credit.value == 3"
            class="mt-2"
          >
            NCF B0100000004
          </h2>
          <h2
            v-else-if="form.credit.value == 4"
            class="mt-2"
          >
            NCF B1500000001
          </h2>
          <h2
            v-else-if="form.credit.value == 5"
            class="mt-2"
          >
            NCF B1400000001
          </h2>
          <h2
            v-else-if="form.credit.value == null"
            class="mt-2"
          >
            NCF B1400000001
          </h2>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col
          md="6"
          xl="6"
          class="mb-3 p-3"
        >
          <label for="">Contacto</label>
          <v-select
            v-model="form.contact"
            class="mb-1"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="contacts"
            placeholder="Seleccionar"
            :reduce="val => val.value"
          />
          <label for="">RNC o Cédula</label>
          <b-form-input
            v-model="form.rnc"
            disabled
          />
          <label
            class="mt-2"
            for=""
          >Teléfono</label>
          <b-form-input
            v-model="form.phone"
            disabled
          />
        </b-col>
        <b-col
          md="6"
          xl="6"
          class="mb-3 p-3"
        >
          <label for="">Fecha</label>
          <b-form-datepicker
            v-model="form.date"
            class="mb-1"
          />
          <label for="">Plazo de pago</label>
          <v-select
            v-model="form.payment_deadline"
            class="mb-1"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="payment_deadline"
            placeholder="Seleccionar"
            :reduce="val => val.value"
          />
          <label for="">Vencimiento</label>
          <b-form-datepicker
            v-model="form.expiration"
            class="mb-1"
          />
        </b-col>
      </b-row>
      <b-form
        ref="form"
        :style="{ height: trHeight }"
        class="repeater-form ml-2"
        @submit.prevent="repeateAgain"
      >
        <b-row>
          <b-col>
            <h6>Producto/servicio</h6>
          </b-col>
          <b-col>
            <h6>Referencia</h6>
          </b-col>
          <b-col>
            <h6>Precio</h6>
          </b-col>
          <b-col>
            <h6>Desc %</h6>
          </b-col>
          <b-col>
            <h6>Impuesto</h6>
          </b-col>
          <b-col>
            <h6>Descripción</h6>
          </b-col>
          <b-col>
            <h6>Cantidad</h6>
          </b-col>
          <b-col>
            <h6>Total</h6>
          </b-col>
          <b-col>
            <h6 />
          </b-col>
        </b-row>
        <hr class="line">
        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in form.products"
          :id="item.id"
          :key="index"
          ref="row"
          class="mb-2"
        >
          <b-col>
            <b-form-select
              v-model="form.products[index].name"
              :options="products"
              :reduce="val => val.value"
              @change="searchProduct(index, form.products[index].name)"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.products[index].ref"
              placeholder="Referencia"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.products[index].price"
              type="number"
              placeholder="Precio unitario"
              @keyup="changePrice(index)"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.products[index].percentage"
              type="number"
              placeholder="%"
              @keyup="changePercentage(index)"
            />
          </b-col>
          <b-col>
            <b-form-select
              v-model="form.products[index].tax"
              :options="tax"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.products[index].description"
              placeholder="Descripción"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.products[index].quantity"
              type="number"
              placeholder="Cantidad"
              @keyup="changeQuantity(index)"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.products[index].total"
              placeholder="0.00"
            />
          </b-col>

          <!-- Remove Button -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              @click="removeItem(index)"
            >
              <feather-icon
                icon="XIcon"
                class="mr-25"
              />
            </b-button>
          </b-col>
        </b-row>
      </b-form>
      <b-col
        cols="12"
        class="text-center mt-3"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          class="mb-5"
          variant="primary"
          @click="repeateAgain"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-25"
          />
          <span>Agregar Linea</span>
        </b-button>
      </b-col>
    </b-card>
    <b-card
      v-for="(item, index) in form.retentions"
      :id="item.id"
      :key="index"
      no-body
      class="mt-1"
    >
      <b-row>
        <b-col
          md="5"
          class=" mt-2 p-3 mt-0"
        >
          <label for="Lista de precios">Retención</label>
          <b-form-select
            v-model="form.retentions[index].retention"
            :options="retentions"
            @change="changeValueRetention(index)"
          />
        </b-col>
        <b-col
          md="5"
          class=" mt-2 p-3 mt-0"
        >
          <label for="Lista de precios">Valor</label>
          <b-form-input
            v-model="form.retentions[index].value"
            type="number"
          />
        </b-col>
        <b-col
          md="2"
          class=" mt-2 p-3 mt-3"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="deleteRetention(index)"
          >
            <feather-icon icon="XIcon" />
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card
      no-body
      class="mt-1"
    >
      <b-row>
        <b-col
          md="4"
          xl="4"
          class="mb-3 p-3"
        >
          <b-img
            class="imgLogo"
            :src="require('@/assets/images/logo/firma.png')"
            fluid
            alt="Responsive image"
          />
        </b-col>
        <b-col
          md="2"
          class="mb-3 p-3"
        />
        <b-col
          md="3"
          class="mb-3 p-3"
        >
          <p
            class="text-primary retention"
            @click="addRetention()"
          >
            <feather-icon icon="PlusIcon" />
            Agregar retención
          </p>
          <b-row class="ml-5 mt-4 d-flex">
            <b-col
              md="12"
              class="ml-5 mt-1 d-flex"
            >
              <strong>
                <p class="ml-3 d-flex">Subtotal</p>
              </strong>
            </b-col>
            <b-col
              md="12"
              class="ml-5 d-flex"
            >
              <strong>
                <p class="ml-3 d-flex">Descuento</p>
              </strong>
            </b-col>
            <b-col
              md="12"
              class="ml-5 d-flex"
            >
              <strong>
                <p class="ml-3 d-flex">Total</p>
              </strong>
            </b-col>
            <b-col
              md="12"
              class="d-flex ml-5"
            >
              <strong>
                <p class="ml-3">ITBIS 16% (16%)</p>
              </strong>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          md="3"
          class="mb-3 p-3"
        >
          <p class="text-primary">
            <feather-icon icon="PlusIcon" />
            Agregar Conduce
          </p>
          <b-row class="ml-1 mt-3 d-flex">
            <b-col md="12">
              <p>RD${{ form.totals.subtotal }}</p>
            </b-col>
            <b-col md="12">
              <p>-RD$220,000.00</p>
            </b-col>
            <b-col md="12">
              <p>RD$880,000.00</p>
            </b-col>
            <b-col md="12">
              <p>RD$140,800.00</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          md="6"
          class="pl-3 pr-3"
        >
          <label for="textarea-default">Términos y condiciones</label>
          <b-form-textarea
            v-model="form.terms"
            placeholder="Visible en la impresión del documento"
            rows="3"
          />
        </b-col>
        <b-col
          md="6"
          class="pl-3 pr-3"
        >
          <label for="textarea-default">Notas</label>
          <b-form-textarea
            v-model="form.note"
            placeholder="Visible en la impresión del documento"
            rows="3"
          />
        </b-col>
        <b-col
          md="12"
          class="mt-0 mb-3 pl-3 pr-3 pt-1"
        >
          <label for="textarea-default">Pie de factura</label>
          <b-form-textarea
            v-model="form.footer"
            placeholder="Visible en la impresión del documento"
            rows="3"
          />
        </b-col>
        <b-col
          md="12"
          class="text-center mb-3"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="storeInvoice()"
          >
            Guardar
          </b-button>
        </b-col>
      </b-row>
    </b-card><br>
  </div>
</template>
<script>
import {
  extend, ValidationProvider, ValidationObserver, localize,
} from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import {
  BCard,
  BRow,
  BCol,
  BImg,
  BForm,
  BButton,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormDatepicker,
  BFormSelect,
} from 'bootstrap-vue'

extend('required', {
  ...required,
  message: 'El campo {_field_} es obligatorio',
})

export default {
  name: 'Facturas',
  components: {
    vSelect,
    BCard,
    BRow,
    BCol,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormDatepicker,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      listPrice: [],
      nextTodoId: 2,
      credits: [
        { title: 'Comprobante para exportación (16)', value: 1 },
        { title: 'Consumo (02)', value: 2 },
        { title: 'Crédito fiscal (01)', value: 3 },
        { title: 'Gubernamentales (15)', value: 4 },
        { title: 'Régimen especial de tributación (14)', value: 5 },
      ],
      form: {
        list_price: '',
        credit: '',
        contact: '',
        rnc: '',
        phone: '',
        date: '',
        payment_deadline: '',
        expiration: '',
        products: [{
          id: null,
          name: null,
          ref: '',
          price: 0,
          percentage: 0,
          tax: null,
          description: '',
          quantity: '',
          total: '',
        }],
        retentions: [],
        totals: {
          subtotal: 0,
          discount: 0,
          total: 0,
        },
        terms: '',
        note: '',
        footer: '',
      },
      contacts: [],
      payment_deadline: [],
      products: [],
      tax: [],
      idDeadline: '',
      retentions: [],
    }
  },
  watch: {
    'form.contact': function (val) {
      if (val) {
        this.showContactId(val)
      } else {
        this.resetContact()
      }
    },
    'form.payment_deadline': function (val) {
      if (val) {
        this.deadLineId(val)
      } else {
        this.form.expiration = new Date()
      }
    },
    'form.date': function (val) {
      this.change(val)
    },
    'form.payment_deadline': function (val) {
      this.deadLineId(val)
    },
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    this.listprice()
    this.showContacts()
    this.deadLine()
    this.fetchProducts()
    this.discounts()
    this.fetchRetention()
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    storeInvoice() {
      this.$http.post('/invoice/store', this.form)
        .then(response => {
          if (response.data.code == 200) {
            this.$swal({
              title: response.data.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false,
            })
            this.$router.push('/invoice')
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
        .catch(error => {
          this.errors = error.response.data.errors
        })
    },
    calculateTotals() {
      let sum = 0
      for (let index = 0; index < this.form.products.length; index++) {
        sum += +this.form.products[index].price
      }
      this.form.totals.subtotal = new Intl.NumberFormat('es-RD', { maximumSignificantDigits: 6 }).format(sum)
    },
    changeValueRetention(val) {
      if (val == '') {
        this.form.retentions[va].value = ''
      }
    },
    addRetention() {
      this.form.retentions.push({
        id: '',
        retention: '',
        value: '',
      })
    },
    deleteRetention(index) {
      this.form.retentions.splice(index, 1)
    },
    changePrice(index) {
      if (this.form.products[index].price == '') {
        this.form.products[index].total = 0
      } else {
        this.changePercentage(index)
        this.calculateTotals()
      }
    },
    changePercentage(index) {
      if (this.form.products[index].percentage == '') {
        const valuePercent = (this.form.products[index].quantity * this.form.products[index].price) * (0 / 100)
        this.form.products[index].total = (this.form.products[index].quantity * this.form.products[index].price) - valuePercent
      } else {
        const valuePercent = (this.form.products[index].quantity * this.form.products[index].price) * (this.form.products[index].percentage / 100)
        this.form.products[index].total = (this.form.products[index].quantity * this.form.products[index].price) - valuePercent
      }
    },
    changeQuantity(index) {
      if (this.form.products[index].quantity == '') {
        this.form.products[index].total = 0
      } else {
        this.changePercentage(index)
      }
    },
    searchProduct(index, id) {
      this.$http.get(`identification/product/${id}`).then(response => {
        this.form.products[index].price = response.data.product.price
        this.form.products[index].quantity = 1
        this.form.products[index].total = response.data.product.price
        this.form.products[index].percentage = 0
        this.calculateTotals()
      })
    },
    discounts() {
      this.$http.get('identification/listDiscounts').then(response => {
        this.tax = response.data.discounts
        this.tax.push({
          text: 'Seleccione',
          value: null,
        })
      })
    },
    change(val) {
      this.form.expiration = moment(val).add(this.idDeadline, 'days').format('YYYY-MM-DD')
    },
    resetContact() {
      this.form = {
        credit: '',
        contact: '',
        rnc: '',
        phone: '',
        date: '',
        payment_deadline: '',
        expiration: '',
      }
    },
    listprice() {
      this.$http.get('identification/listPrice').then(response => {
        this.listPrice = response.data.listPrice
      })
    },
    fetchRetention() {
      this.$http.get('identification/listRetention').then(response => {
        this.retentions = response.data.retentions
      })
    },
    showContacts() {
      this.$http.get('contact/showContacts').then(response => {
        this.contacts = response.data.contacts
      })
    },
    showContactId(id) {
      this.$http.get(`contact/showContact/${id}`).then(response => {
        this.form.rnc = response.data.contact.number_identification
        this.form.phone = response.data.contact.mobil
        this.form.date = new Date()
        this.form.payment_deadline = response.data.contact.payment_deadline
      })
    },
    deadLine() {
      this.$http.get('identification/listDeadline').then(response => {
        this.payment_deadline = response.data.listDeadline
      })
    },
    fetchProducts() {
      this.$http.get('identification/listProducts').then(response => {
        this.products = response.data.products
        this.products.push({
          text: 'Seleccione',
          value: null,
        })
      })
    },
    deadLineId(id) {
      this.$http.get(`identification/listDeadline/${id}`).then(response => {
        this.idDeadline = response.data.listDeadlineId.days
        this.form.expiration = moment(this.form.date).add(this.idDeadline, 'days').format('YYYY-MM-DD')
      })
    },
    repeateAgain() {
      this.form.products.push({
        id: null,
        name: null,
        ref: '',
        price: '',
        percentage: '',
        tax: '',
        description: '',
        quantity: '',
        total: '',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.form.products.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}

.imgLogo {
    width: 90%;
}

.repeater-form {
    overflow: hidden;
    transition: .35s height;
}

.line {
    border: 1px solid black;
    background: black;
    margin: 10px 45px 10px 0px;
}

.retention {
    cursor: pointer;
    margin-left: 118px;
    position: absolute;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
