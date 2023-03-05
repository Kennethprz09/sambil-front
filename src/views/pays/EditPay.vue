<template>
  <div>
    <h3 class="mt-2 mb-2">
      Editar Pago
    </h3>
    <!-- general -->
    <b-card
      no-body
      class="mt-2 mb-0"
    >
      <b-row>
        <b-col
          md="6"
          xl="8"
          class="px-3 py-1 pb-0"
        >
          <h6 class="mb-0">
            INFORMACIÓN GENERAL DEL PAGO
          </h6>
        </b-col>
      </b-row>
      <hr class="m-0">
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
            :reduce="(val) => val.value"
          />
          <label for="">Cuenta bancaria</label>
          <v-select
            v-model="form.bank_account"
            class="mb-1"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="bank_accounts"
            placeholder="Seleccionar"
            :reduce="(val) => val.id"
          />
          <label for="">Forma de pago</label>
          <v-select
            v-model="form.payment_method"
            class="mb-1"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="payment_method"
            placeholder="Seleccionar"
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

          <label for="">Nota del gasto</label>
          <b-form-textarea
            v-model="form.note"
            class="mb-1"
          />
        </b-col>
      </b-row>
    </b-card>
    <!-- asociar? -->
    <b-card
      no-body
      class="mt-2 mb-0"
    >
      <b-row>
        <b-col
          md="6"
          xl="8"
          class="px-3 py-1 pb-0"
        >
          <h6 class="mb-0">
            TIPO DE TRANSACCIÓN
          </h6>
        </b-col>
      </b-row>
      <hr class="m-0">
      <b-row>
        <b-col
          md="12"
          xl="12"
          class="mb-3 p-3 d-flex flex-column align-items-center"
        >
          <h4>
            ¿Asociar este gasto a una factura de proveedor existente en Sambil?
          </h4>
          <h6>
            Recuerda que puedes registrar un gasto sin necesidad de que esté
            asociado una factura de proveedor
          </h6>

          <form class="d-flex flex-row mt-2">
            <div class="b-form-group mr-2">
              <input
                v-model="payAsociateToProvider"
                name="payAsociateToProvider"
                type="radio"
                value="TRUE"
              >
              <label
                class="px-1"
                for="payAsociateToProvider"
              >Si</label>
            </div>
            <div class="b-form-group">
              <input
                v-model="payAsociateToProvider"
                name="payNotAsociateToProvider"
                type="radio"
                value="FALSE"
              >
              <label
                class="px-1"
                for="payNotAsociateToProvider"
              >No</label>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-card>
    <!--  -->

    <b-card
      v-if="payAsociateToProvider == 'FALSE'"
      no-body
      class="mt-2 mb-0"
    >
      <b-row>
        <b-col
          md="6"
          xl="8"
          class="px-3 py-1 pb-0"
        >
          <h6 class="mb-0">
            ¿ A QUÉ CUENTAS CONTABLES PERTENECE ESTE GASTO?
          </h6>
        </b-col>
      </b-row>
      <hr class="m-0 mb-3">

      <b-form
        ref="form"
        :style="{ height: trHeight }"
        class="repeater-form ml-2"
        @submit.prevent="repeateAgain"
      >
        <b-row>
          <b-col>
            <h6>Concepto</h6>
          </b-col>
          <b-col>
            <h6>Valor</h6>
          </b-col>
          <b-col>
            <h6>Impuesto</h6>
          </b-col>
          <b-col>
            <h6>Cantidad</h6>
          </b-col>

          <b-col>
            <h6>Observaciones</h6>
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
          v-for="(item, index) in form.ledger_accounts"
          :id="item.id"
          :key="index"
          ref="row"
          class="mb-2"
        >
          <b-col>
            <b-form-select v-model="form.ledger_accounts[index].concept_id">
              <option
                :value="null"
                disabled
              >
                Seleccionar
              </option>

              <option
                v-for="(concept, ind) in concepts"
                :key="ind"
                :value="concept.id"
              >
                {{ concept.text }}
              </option></b-form-select>
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.ledger_accounts[index].price"
              type="number"
              min="0"
              @keyup="changePrice(index)"
            />
          </b-col>
          <b-col>
            <b-form-select
              v-model="form.ledger_accounts[index].tax_id"
              :options="tax"
              @change="calculateTotals()"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="form.ledger_accounts[index].quantity"
              type="number"
              min="0"
              placeholder="Cantidad"
              @keyup="changeQuantity(index)"
            />
          </b-col>

          <b-col>
            <b-form-input
              v-model="form.ledger_accounts[index].description"
              placeholder="Descripción"
            />
          </b-col>

          <b-col>
            <b-form-input
              v-model="form.ledger_accounts[index].total"
              disabled
              placeholder="0.00"
            />
          </b-col>

          <!-- Remove Button -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              @click="removeItem(index,item.id)"
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
    <!--  -->
    <b-card
      v-if="payAsociateToProvider == 'FALSE'"
      no-body
      class="mt-1"
    >
      <b-row class="ml-5 mt-0 d-flex">
        <b-col
          md="4"
          class="mb-3 p-3 ml-auto"
        >
          <b-row class="ml-1 mt-3 d-flex flex-column">
            <b-row class="ml-1 mt-1 d-flex">
              <b-col md="6">
                <strong>SubTotal:</strong>
              </b-col>
              <b-col md="6">
                <p v-if="form.totals.subtotal">
                  RD$ {{ form.totals.subtotal }}
                </p>
                <p v-if="!form.totals.subtotal">
                  ?
                </p>
              </b-col>
            </b-row>
            <b-row class="ml-1 mt-1 d-flex">
              <b-col md="6">
                <strong>Impuestos:</strong>
              </b-col>
              <b-col md="6">
                <p v-if="form.totals.taxes">
                  RD$ {{ form.totals.taxes }}
                </p>
                <p v-if="!form.totals.taxes">
                  ?
                </p>
              </b-col>
            </b-row>
            <b-row class="ml-1 mt-1 d-flex">
              <b-col md="6">
                <strong>Total:</strong>
              </b-col>
              <b-col md="6">
                <p v-if="form.totals.total">
                  RD$ {{ form.totals.total }}
                </p>
                <p v-if="!form.totals.total">
                  ?
                </p>
              </b-col>
            </b-row>
          </b-row>
        </b-col>
      </b-row>

      <b-row
        v-if="
          form.totals.total &&
            form.totals.taxes &&
            form.contact&&
            form.date&&
            form.payment_method
            &&form.bank_account"
      >
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
      </b-row> </b-card><br>
  </div>
</template>
<script>
import { extend } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

import {
  BCard,
  BRow,
  BCol,
  BForm,
  BButton,
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
  name: 'Pagos',
  components: {
    vSelect,
    BCard,
    BRow,
    BCol,
    BForm,
    BButton,
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
      nextTodoId: 2,
      form: {
        contact: '',
        date: '',
        status: 'ACTIVA',
        payment_method: '',
        bank_account: '',
        ledger_accounts: [
          {
            id: 1,
            concept_id: null,
            price: 0,
            tax_id: null,
            quantity: 0,
            description: '',
            total: null,
          },
        ],
        totals: {
          subtotal: null,
          taxes: null,
          total: null,
        },
        note: '',

      },
      payAsociateToProvider: '',
      contacts: [],
      payment_method: [
        'Efectivo',
        'Cheque',
        'Transferencia',
        'Depósito',
        'Tarjeta débito',
        'Tarjeta crédito',
        'Permuta',
        'Mixto',
      ],
      products: [],
      concepts: [],
      tax: [],
      bank_accounts: [],
      itemsDelete: [],
    }
  },
  watch: {

    'form.ledger_accounts': {
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        // console.log(this.form.ledger_accounts)
      },
    },

  },

  created() {
    this.showContacts()
    this.fetchBankAccounts()
    this.fetchConcepts()
    this.discounts()
    this.fetchPay()
  },
  methods: {
    storeInvoice() {
      this.form.total_taxes = this.form.totals.taxes
      this.form.total_amount = this.form.totals.total
      this.form.itemsDelete = this.itemsDelete
      this.$http.put(`/pays/edit/${this.$route.params.id}`, this.form)
        .then(response => {
          if (response.data.code === 200) {
            this.$swal({
              title: response.data.message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false,
            })

            this.$router.push('/pay')
          }
          if (response.data.code === 500) {
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
      let imp = 0
      let taxNotFound = false
      let valuesNotFound = false

      // SUBTOTOTAL

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < this.form.ledger_accounts.length; index++) {
        if (
          !this.form.ledger_accounts[index].price
          || !this.form.ledger_accounts[index].quantity
        ) {
          valuesNotFound = true
        } else {
          sum
            += +this.form.ledger_accounts[index].price
            * this.form.ledger_accounts[index].quantity
        }
      }
      if (valuesNotFound) this.form.totals.subtotal = null
      else {
        this.form.totals.subtotal = Math.round(sum * 100) / 100
      }

      // TAXES

      // eslint-disable-next-line no-plusplus
      for (let inde = 0; inde < this.form.ledger_accounts.length; inde++) {
        if (!this.form.ledger_accounts[inde].tax_id) {
          taxNotFound = true
        } else {
          console.log(this.tax)
          const tx = this.tax.find(
            t => t.value === this.form.ledger_accounts[inde].tax_id,
          )

          imp += +((tx.discount * this.form.ledger_accounts[inde].total) / 100)
        }
      }
      if (taxNotFound) this.form.totals.taxes = null
      else {
        this.form.totals.taxes = Math.round(imp * 100) / 100
      }

      // TOTAL TOTAL
      if (taxNotFound || valuesNotFound) {
        this.form.totals.total = null
      } else {
        this.form.totals.total = Math.round(
          (parseFloat(this.form.totals.taxes)
              + parseFloat(this.form.totals.subtotal))
              * 100,
        ) / 100
      }
    },
    changePrice(index) {
      if (this.form.ledger_accounts[index].price === 0) {
        this.form.ledger_accounts[index].total = 0
      } else {
        this.calculateTotals()
        this.calculateRowTotal(index)
      }
    },
    calculateRowTotal(index) {
      this.form.ledger_accounts[index].total = this.form.ledger_accounts[index].quantity
        * this.form.ledger_accounts[index].price
    },
    changeQuantity(index) {
      if (this.form.ledger_accounts[index].quantity === 0) {
        this.form.ledger_accounts[index].total = 0
      } else {
        this.calculateTotals()
        this.calculateRowTotal(index)
      }
    },
    fetchBankAccounts() {
      this.$http.get('bank_accounts/list').then(response => {
        const list = response.data.data.accounts
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const key in list) {
          list[key].title = list[key].name
        }
        this.bank_accounts = list
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

    showContacts() {
      this.$http.get('contact/showContacts').then(response => {
        this.contacts = response.data.contacts
      })
    },
    fetchConcepts() {
      this.$http.get('concepts_ledger_accounts/list').then(response => {
        this.concepts = response.data.concepts
      })
    },
    fetchPay() {
      this.$http.get(`pays/show/${this.$route.params.id}`).then(response => {
        this.form = response.data.pay
        if (response.data.pay.ledger_accounts.length > 0) this.payAsociateToProvider = 'FALSE'
        this.calculateTotals()
      })
      if (this.$route.query.anular === 'si') {
        console.log('entro')
        this.form.status = 'ANULADA'
        this.$http.put(`/pays/anular/${this.$route.params.id}`, this.form)
          .then(response => {
            if (response.data.code === 200) {
              this.$swal({
                title: response.data.message,
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
                buttonsStyling: false,
              })
              // console.log(response)
              this.$router.push('/pay')
            }
            if (response.data.code === 500) {
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
      }
    },
    getLedgerAccountsLastId() {
      let lastId = 0
      // eslint-disable-next-line no-restricted-syntax
      for (const i of this.form.ledger_accounts) {
        if (i.id > lastId) lastId = i.id
      }
      return lastId
    },
    repeateAgain() {
      this.form.ledger_accounts.push({
        id: this.getLedgerAccountsLastId() + 1,
        concept_id: null,
        price: 0,
        tax_id: null,
        quantity: 0,
        description: '',
        total: null,
      })
      this.calculateTotals()
    },
    removeItem(index, id) {
      this.form.ledger_accounts.splice(index, 1)
      if (this.itemsDelete) this.itemsDelete.push({ id })
      else {
        this.itemsDelete = [{ id }]
      }
      this.calculateTotals()
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
  transition: 0.35s height;
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
@import "@core/scss/vue/libs/vue-select.scss";
</style>
