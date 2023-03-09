<template>
    <div>
        <b-card no-body class="mb-0">

            <div class="m-2">

                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="example-datepicker">Número</label>
                            <b-form-input type="number" />
                        </b-form-group>
                        <b-form-group>
                            <label for="example-datepicker">Fecha</label>
                            <b-form-datepicker />
                        </b-form-group>
                        <b-form-group>
                            <label for="example-datepicker">Contacto</label>
                            <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title"
                                :options="option" />
                        </b-form-group>
                        <b-form-group>
                            <label for="example-datepicker">Cuenta bancaria</label>
                            <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title"
                                :options="option" />
                        </b-form-group>
                        <b-form-group>
                            <label for="example-datepicker">Método de pago</label>
                            <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title"
                                :options="option" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <b-form-group>
                            <label for="textarea-default">Notas del recibo</label>
                            <b-form-textarea rows="8" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-card no-body class="mb-0 mt-2">

            <div class="m-2">

                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class=" align-items-center justify-content-center">
                        <h5>TIPO DE TRANSACCIÓN</h5>
                    </b-col>
                </b-row>
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="12" class=" align-items-center justify-content-center">
                        <h5 class="text-center mt-5">¿Asociar este ingreso a una factura de venta existente en Alegra?
                        </h5>
                        <p class="text-center">Recuerda que puedes registrar un ingreso sin necesidad de que esté
                            asociado una factura</p>
                    </b-col>
                </b-row>
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="4" class="d-flex align-items-left justify-content-left"></b-col>
                    <b-col cols="12" md="2" class="d-flex align-items-center justify-content-center">
                        <b-form-radio-group v-model="value" :options="options" :state="state" @change="Text()"
                            class="demo-inline-spacing" name="radio-validation">
                        </b-form-radio-group>
                    </b-col>
                    <b-col cols="12" md="1" class=" align-items-center justify-content-right">
                        <b-form-radio-group v-model="value1" :options="options1" :state="state" @change="Table()"
                            class="demo-inline-spacing" name="radio-validation">
                        </b-form-radio-group>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-card no-body class="mb-0 mt-2" v-if="text">
            <div class="m-2">
                <b-row>
                    <b-col cols="12" md="12" class=" align-items-center justify-content-center">
                        <p class="text-center mt-1 mb-1" style="color: #f99d36;">Para asociar este pago a una factura,
                            Primero debes seleccionar un
                            cliente que tenga facturas pendientes por pagar</p>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-card no-body class="mb-0 mt-2" v-if="table">
            <div class="m-2">
                <b-row v-if="table">
                    <b-col cols="12" md="12" class=" align-items-center justify-content-center">
                        <b-form ref="form" :style="{ height: trHeight }" class="repeater-form ml-2"
                            @submit.prevent="repeateAgain">
                            <b-row>
                                <b-col md="2">
                                    <h6>Concepto</h6>
                                </b-col>
                                <b-col md="2">
                                    <h6>Valor</h6>
                                </b-col>
                                <b-col md="2">
                                    <h6>Impuesto</h6>
                                </b-col>
                                <b-col md="2">
                                    <h6>Cantidad</h6>
                                </b-col>
                                <b-col md="2">
                                    <h6>Observaciones</h6>
                                </b-col>
                                <b-col md="2">
                                    <h6>Total</h6>
                                </b-col>
                            </b-row>
                            <hr class="line">
                            <!-- Row Loop -->
                            <b-row class="mb-2" v-for="(item, index) in form.products" :id="item.id" :key="index"
                                ref="row">
                                <b-col md="2">
                                    <b-form-select :options="products"
                                        @change="searchProduct(index, form.products[index].name)"
                                        :reduce="val => val.value" />
                                </b-col>
                                <b-col md="2">
                                    <b-form-input v-model="form.products[index].ref" type="number" />
                                </b-col>
                                <b-col md="2">
                                    <b-form-select :options="products"
                                        @change="searchProduct(index, form.products[index].name)"
                                        :reduce="val => val.value" />
                                </b-col>
                                <b-col md="2">
                                    <b-form-input v-model="form.products[index].q" type="number" />
                                </b-col>
                                <b-col md="2">
                                    <b-form-input v-model="form.products[index].e" />
                                </b-col>
                                <b-col class="d-flex" md="2">
                                    <p class="d-flex mr-5">0.00</p>
                                    <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger"
                                        @click="removeItem(index)">
                                        <feather-icon icon="XIcon" class="d-flex" />
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                        <b-col cols="12" class="text-center mt-3">
                            <b-button class="mb-5" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
                                @click="repeateAgain">
                                <feather-icon icon="PlusIcon" class="mr-25" />
                                <span> Agregar cuenta contable</span>
                            </b-button>
                        </b-col>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-card no-body class="mb-0 mt-2" v-if="table">
            <div class="m-2">
                <b-row>
                    <b-col cols="12" md="12" class=" align-items-center justify-content-center">
                        <h5>¿Te aplicaron alguna retención?</h5>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="12" class=" align-items-center justify-content-center">
                        <b-form ref="form" :style="{ height: trHeight }" class="repeater-form ml-2"
                            @submit.prevent="repeateAgain">
                            <b-row>
                                <b-col md="3">
                                    <h6 class="text-left">Tipo de retención</h6>
                                </b-col>
                                <b-col md="3">
                                    <h6 class="text-left">Base</h6>
                                </b-col>
                                <b-col md="4">
                                    <h6 class="text-left">Valor</h6>
                                </b-col>
                            </b-row>
                            <hr class="line">
                            <!-- Row Loop -->
                            <b-row class="mb-1" v-for="(item, index) in form.retentions" :id="item.id" :key="index"
                                ref="row">
                                <b-col md="3">
                                    <b-form-select :options="products" :reduce="val => val.value" />
                                </b-col>
                                <b-col md="3">
                                    <b-form-input v-model="form.retentions[index].retention" type="number" />
                                </b-col>
                                <b-col md="3">
                                    <b-form-input v-model="form.retentions[index].value" type="number" />
                                </b-col>
                                <b-col class="d-flex" md="3">
                                    <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger"
                                        @click="deleteRetention(index)">
                                        <feather-icon icon="XIcon" class="d-flex" />
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                        <b-col cols="12" class="text-center mt-3">
                            <b-button class="mb-5" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
                                @click="addRetention()">
                                <feather-icon icon="PlusIcon" class="mr-25" />
                                <span> Agregar cuenta contable</span>
                            </b-button>
                        </b-col>
                    </b-col>
                </b-row>
            </div>
        </b-card>

        <b-card no-body class="mb-0 mt-2" v-if="table">
            <b-row>
                <b-col cols="12" md="3" class=" align-items-left justify-content-center">
                </b-col>
                <b-col cols="12" md="3" class=" align-items-center justify-content-center">
                </b-col>
                <b-col cols="12" md="2" class=" align-items-center justify-content-center">
                </b-col>
                <b-col cols="12" md="3" class=" align-items-left justify-content-left mt-3 mb-3">
                    <b-row class="mb-1">
                        <b-col cols="12" md="6">
                            <strong class="mb-1">Subtotal</strong>
                        </b-col>
                        <b-col cols="12" md="6">
                            <span class="ml-1">$ 0</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" md="6">
                            <strong>Total cobrado </strong>
                        </b-col>
                        <b-col cols="12" md="6">
                            <span class="ml-1">$ 0</span>
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
    BCard, BRow, BCol, BFormGroup, BFormDatepicker, BFormTextarea, BFormInput, BFormSelect, BForm, BButton, BFormRadioGroup
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
        BButton,
        BFormRadioGroup
    },
    data() {
        return {
            text: false,
            table: false,
            value: null,
            value1: null,
            options: [
                { text: 'SI', value: 'si' }
            ],
            options1: [
                { text: 'No', value: 'no' }
            ],
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
                }],
                retentions: []
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
    computed: {
        state() {
            return Boolean(this.value)
            return Boolean(this.value1)
        },
    },
    methods: {
        deleteRetention(index) {
            this.form.retentions.splice(index, 1)
        },
        addRetention() {
            this.form.retentions.push({
                id: '',
                retention: '',
                value: ''
            })
        },
        Text() {
            this.text = true;
            this.table = false;
        },
        Table() {
            this.table = true;
            this.text = false;
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