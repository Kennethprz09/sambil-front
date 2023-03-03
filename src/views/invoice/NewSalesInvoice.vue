<template>
    <div>
        <b-card no-body class="mb-0">

            <div class="m-2">

                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="example-datepicker">Numeración</label>
                            <v-select v-model="form.number" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                label="title" :options="option" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="example-datepicker">Fecha de inicio</label>
                            <b-form-datepicker v-model="form.creatd_at" class="mb-1" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="example-datepicker">Contacto</label>
                            <v-select v-model="form.contact" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                label="title" :options="option" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="example-datepicker">Fecha de finalización</label>
                            <b-form-datepicker v-model="form.date_finalitation" class="mb-1" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="textarea-default">Observaciones</label>
                            <b-form-textarea v-model="form.observations" rows="3" />
                        </b-form-group>
                        <b-form-group>
                            <label for="textarea-default">Notas de la factura</label>
                            <b-form-textarea v-model="form.notes" rows="3" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="example-datepicker">Plazo de pago</label>
                            <v-select v-model="form.date_payment" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                label="title" :options="option" />
                        </b-form-group>
                        <b-form-group>
                            <label for="textarea-default">Frecuencia</label>
                            <b-form-group>
                                <b-form-input v-model="form.frecuenty" type="number" />
                            </b-form-group>
                        </b-form-group>
                        <b-form-group>
                            <label for="example-datepicker">Lista de precios</label>
                            <v-select v-model="form.list_price" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                label="title" :options="option" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="12">
                        <b-form ref="form" :style="{ height: trHeight }" class="repeater-form ml-2"
                            @submit.prevent="repeateAgain">
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
                                    <h6></h6>
                                </b-col>
                            </b-row>
                            <hr class="line">
                            <!-- Row Loop -->
                            <b-row class="mb-2" v-for="(item, index) in form.products" :id="item.id" :key="index" ref="row">
                                <b-col>
                                    <b-form-select v-model="form.products[index].name" :options="products"
                                        @change="searchProduct(index, form.products[index].name)"
                                        :reduce="val => val.value" />
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="form.products[index].ref" placeholder="Referencia" />
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="form.products[index].price" type="number"
                                        placeholder="Precio unitario" @keyup="changePrice(index)" />
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="form.products[index].percentage" type="number" placeholder="%"
                                        @keyup="changePercentage(index)" />
                                </b-col>
                                <b-col>
                                    <b-form-select v-model="form.products[index].tax" :options="tax" />
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="form.products[index].description" placeholder="Descripción" />
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="form.products[index].quantity" type="number"
                                        placeholder="Cantidad" @keyup="changeQuantity(index)" />
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="form.products[index].total" placeholder="0.00" />
                                </b-col>

                                <!-- Remove Button -->
                                <b-col>
                                    <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger"
                                        @click="removeItem(index)">
                                        <feather-icon icon="XIcon" class="mr-25" />
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                        <b-col cols="12" class="text-center mt-3">
                            <b-button class="mb-5" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
                                @click="repeateAgain">
                                <feather-icon icon="PlusIcon" class="mr-25" />
                                <span>Agregar Linea</span>
                            </b-button>
                        </b-col>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-card no-body class="mt-1 mb-3">
            <b-row>
                <b-col md="2" class="mb-3 p-3"></b-col>
                <b-col md="2" class="mb-3 p-3"></b-col>
                <b-col md="2" class="mb-3 p-3"></b-col>
                <b-col md="3" class="mb-3 p-3">
                    <b-row class="ml-5 mt-4 d-flex">
                        <b-col md="12" class="ml-5 mt-0 d-flex">
                            <strong>
                                <p class="ml-3 d-flex">Subtotal</p>
                            </strong>
                        </b-col>
                        <b-col md="12" class="ml-5 d-flex">
                            <strong>
                                <p class="ml-3 d-flex">Descuento</p>
                            </strong>
                        </b-col>
                        <b-col md="12" class="ml-5 d-flex">
                            <strong>
                                <p class="ml-3 d-flex">Total</p>
                            </strong>
                        </b-col>
                        <b-col md="12" class="d-flex ml-5">
                            <strong>
                                <p class="ml-3">ITBIS 16% (16%)</p>
                            </strong>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="3" class="mb-3 p-3">
                    <b-row class="ml-1 mt-5 d-flex">
                        <b-col md="12">
                            <p>RD$3213221</p>
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
        </b-card><br>
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
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import {
    BCard, BRow, BCol, BFormGroup, BFormDatepicker, BFormTextarea, BFormInput, BFormSelect, BForm, BButton
} from 'bootstrap-vue'
import vSelect from 'vue-select'
export default {
    name: 'Facturas',
    mixins: [heightTransition],
    components: {
        BCard,
        BRow,
        BCol,
        BFormGroup,
        vSelect,
        BFormDatepicker,
        BFormTextarea,
        BFormInput,
        BFormSelect,
        BForm,
        BButton
    },
    data() {
        return {
            nextTodoId: 2,
            form: {
                number: '',
                creatd_at: '',
                contact: '',
                date_finalitation: '',
                observations: '',
                notes: '',
                date_payment: '',
                list_price: '',
                frecuenty: '',
                products: [{
                    id: null,
                    name: null,
                    ref: '',
                    price: 0,
                    percentage: 0,
                    tax: null,
                    description: '',
                    quantity: '',
                    total: ''
                }]
            },
            products: [],
            tax: [],
        }
    },
    mounted() {
        this.initTrHeight()
    },
    directives: {
        Ripple,
    },
    created() {
        window.addEventListener('resize', this.initTrHeight)
        this.fetchProducts()
    },
    destroyed() {
        window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
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
                total: ''
            })

            this.$nextTick(() => {
                this.trAddHeight(this.$refs.row[0].offsetHeight)
            })
        },
        fetchProducts() {
            this.$http.get('identification/listProducts').then((response) => {
                this.products = response.data.products;
                this.products.push({
                    text: 'Seleccione',
                    value: null
                })
            })
        },
    }
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