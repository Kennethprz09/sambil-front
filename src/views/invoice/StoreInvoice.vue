<template>
    <div>
        <b-card no-body class="mt-2 mb-0">
            <b-row>
                <b-col md="4" xl="4" class=" p-3">
                    <b-img class="imgLogo" :src="require('@/assets/images/logo/sambil-logo.png')" fluid
                        alt="Responsive image" />
                </b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Contacto</label>
                    <v-select v-model="form.contact" class="mb-1" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title" :options="contacts" placeholder="Seleccionar" :reduce="val => val.value"
                        @change="showContactId()" :disabled="action !== 'view' ? false : true" />
                    <label for="">RNC o Cédula</label>
                    <b-form-input v-model="form.rnc" disabled />
                    <label class="mt-2" for="">Teléfono</label>
                    <b-form-input v-model="form.phone" disabled />
                </b-col>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Fecha</label>
                    <b-form-datepicker v-model="form.date" class="mb-1" :disabled="action !== 'view' ? false : true" />
                    <label for="">Plazo de pago</label>
                    <v-select v-model="form.payment_deadline" class="mb-1"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="payment_deadline"
                        placeholder="Seleccionar" :reduce="val => val.value" :disabled="action !== 'view' ? false : true" />
                    <label for="">Vencimiento</label>
                    <b-form-datepicker v-model="form.expiration" class="mb-1"
                        :disabled="action !== 'view' ? false : true" />
                </b-col>
            </b-row>
            <b-form ref="form" class="repeater-form ml-2" @submit.prevent="repeateAgain">
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
                            @change="searchProduct(index, form.products[index].name)" :reduce="val => val.value"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].ref" placeholder="Referencia"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].price" type="number" placeholder="Precio unitario"
                            @keyup="changePrice(index)" disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].percentage" type="number" placeholder="%"
                            @keyup="changePercentage(index)" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <v-select v-model="form.products[index].tax" multiple label="text" :options="tax" @input="changeTax"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].description" placeholder="Descripción"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].quantity" type="number" placeholder="Cantidad"
                            @keyup="changeQuantity(index)" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].total" placeholder="0.00" disabled />
                    </b-col>

                    <!-- Remove Button -->
                    <b-col>
                        <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger"
                            @click="removeItem(index)" :disabled="action !== 'view' ? false : true">
                            <feather-icon icon="XIcon" class="mr-25" />
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
            <b-col cols="12" class="text-center mt-3">
                <b-button class="mb-5" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="repeateAgain"
                    v-if="(action !== 'view')">
                    <feather-icon icon="PlusIcon" class="mr-25" />
                    <span>Agregar Linea</span>
                </b-button>
            </b-col>

            <!-- Conduces -->
            <b-form ref="form" class="repeater-form ml-2" v-for="(itemC, indexC) in form.conducesDate" :key="indexC">
                <b-row>
                    <b-col md="3" class="mb-2">
                        <b-form-select v-model="itemC.id" :options="conduces_show" :reduce="val => val.value"
                            @change="searchConduce(itemC.id, indexC)" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col md="1" class="mb-2">
                        <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger"
                            @click="removeConduce(indexC)" :disabled="action !== 'view' ? false : true">
                            <feather-icon icon="XIcon" class="mr-25" />
                        </b-button>
                    </b-col>
                    <b-col md="3" class="mb-2 mt-1">
                        <span class="text-danger">
                            {{ itemC.message }}
                        </span>
                    </b-col>
                </b-row>
                <b-row v-if="itemC.conduces.length > 0">
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
                <hr class="line" v-if="itemC.conduces.length > 0">
                <!-- Row Loop -->
                <b-row class="mb-2" v-for="(item, index) in itemC.conduces" :id="item.id" :key="index" ref="row">
                    <b-col>
                        <b-form-select v-model="item.name" :options="products" :reduce="val => val.value" disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="item.ref" placeholder="Referencia"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="item.price" type="number" placeholder="Precio unitario"
                            @keyup="changePriceConduce(indexC, index)" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="item.percentage" type="number" placeholder="%"
                            @keyup="changePercentageConduce(indexC, index)" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <v-select v-model="item.tax" multiple label="text" :options="tax" @input="changeTax(indexC, index)"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="item.description" placeholder="Descripción"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="item.quantity" type="number" placeholder="Cantidad" :min="1"
                            :max="item.quantitydefault" @keyup="changeQuantityConduce(indexC, index, item.quantitydefault)"
                            :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="item.total" placeholder="0.00" disabled />
                    </b-col>

                    <!-- Remove Button -->
                    <b-col>
                        <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger"
                            @click="removeItemConduce(indexC, index)" :disabled="action !== 'view' ? false : true">
                            <feather-icon icon="XIcon" class="mr-25" />
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
        <b-card no-body class="mt-1">
            <b-col cols="12" class="text-right mt-1">
                <b-button class="mb-5" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
                    @click="repeateAgainConduce" v-if="(action !== 'view')">
                    <feather-icon icon="PlusIcon" class="mr-25" />
                    <span>Agregar Conduce</span>
                </b-button>
            </b-col>
            <b-row>
                <b-col md="4" xl="4" class="mb-3 p-3">
                    <b-img class="imgLogo" :src="require('@/assets/images/logo/firma.png')" fluid alt="Responsive image" />
                </b-col>
                <b-col md="2" class="mb-3 p-3"></b-col>
                <b-col md="3" class="mb-3">
                    <b-row class="ml-5 mt-4 d-flex">
                        <b-col md="12" class="ml-5 mt-1 d-flex">
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
                                <p class="ml-3 d-flex">Subtotal</p>
                            </strong>
                        </b-col>
                        <b-col md="12" class="d-flex ml-5" v-for="tax in form.listTax"
                            :key="tax.value + '_' + Math.random()">
                            <p class="ml-3">{{ tax.name }}</p>
                        </b-col>
                        <b-col md="12" class="ml-5 d-flex">
                            <strong>
                                <p class="ml-3 d-flex">Total</p>
                            </strong>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="3" class="mb-3">
                    <b-row class="ml-5 mt-4 d-flex">
                        <b-col md="12" class="mt-1 d-flex">
                            <p class="d-flex">RD${{ form.totals.subtotal }}</p>
                        </b-col>
                        <b-col md="12" class="d-flex">
                            <p class="d-flex" v-if="(form.totals.discount == 0)">RD$0</p>
                            <p class="d-flex" v-if="(form.totals.discount > 0)">-RD${{ form.totals.discount }}</p>
                        </b-col>
                        <b-col md="12" class="d-flex">
                            <p class="d-flex">RD${{ form.totals.subtotal - form.totals.discount }}</p>
                        </b-col>
                        <b-col md="12" class="d-flex" v-for="tax in form.listTax" :key="tax.value + '_' + Math.random()">
                            <p class="d-flex">RD${{ tax.total }}</p>
                        </b-col>
                        <b-col md="12" class="d-flex">
                            <p>RD${{ form.totals.total }}</p>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" class="pl-3 pr-3">
                    <label for="textarea-default">Términos y condiciones</label>
                    <b-form-textarea v-model="form.terms" placeholder="Visible en la impresión del documento" rows="3"
                        :disabled="action !== 'view' ? false : true" />
                </b-col>
                <b-col md="6" class="pl-3 pr-3">
                    <label for="textarea-default">Notas</label>
                    <b-form-textarea v-model="form.note" placeholder="Visible en la impresión del documento" rows="3"
                        :disabled="action !== 'view' ? false : true" />
                </b-col>
                <b-col md="12" class="mt-0 mb-3 pl-3 pr-3 pt-1">
                    <label for="textarea-default">Pie de factura</label>
                    <b-form-textarea v-model="form.footer" placeholder="Visible en la impresión del documento" rows="3"
                        :disabled="action !== 'view' ? false : true" />
                </b-col>
                <b-col md="12" class="text-center mb-3">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-if="(action === 'create')"
                        @click="storeInvoice()">
                        Guardar
                    </b-button>
                    <b-col md="12" class="text-center mb-3">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-if="(action === 'edit')"
                            @click="updateInvoice()" :disabled="action !== 'view' ? false : true">
                            Actualizar
                        </b-button>
                    </b-col>
                    <b-col md="12" class="text-center mb-3">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-if="(action === 'view')"
                            @click="editInvoice()">
                            Editar
                        </b-button>
                    </b-col>
                </b-col>
            </b-row>
        </b-card><br>
    </div>
</template>

<script>
extend('required', {
    ...required,
    message: 'El campo {field} es obligatorio'
});
import { extend } from 'vee-validate'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
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
    BFormSelect
} from 'bootstrap-vue'
export default {
    props: { action: String },
    mixins: [heightTransition],
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
        BFormSelect
    },
    data() {
        return {
            form: {
                id: null,
                list_price: '',
                contact: '',
                date: '',
                payment_deadline: '',
                expiration: '',
                rnc: '',
                phone: '',
                products: [{
                    id: null,
                    name: null,
                    ref: '',
                    price: 0,
                    percentage: 0,
                    tax: [],
                    description: '',
                    quantity: '',
                    total: '',
                    discount: 0
                }],
                totals: {
                    subtotal: 0,
                    discount: 0,
                    total: 0
                },
                listTax: [],
                terms: '',
                note: '',
                footer: '',
                conducesDate: [],
            },
            contacts: [],
            payment_deadline: [],
            products: [],
            tax: [],
            idDeadline: '',
            conduces_show: []
        }
    },
    mounted() {
        this.initTrHeight()
    },
    directives: {
        Ripple,
    },
    watch: {
        "form.contact"(val) {
            if (val) {
                this.showContactId(val)
            } else {
                this.resetContact()
            }
        },
        "form.payment_deadline"(val) {
            if (val) {
                this.deadLineId(val)
            } else {
                this.form.expiration = new Date();
            }
        },
        "form.date"(val) {
            this.change(val)
        },
        "form.payment_deadline"(val) {
            this.deadLineId(val)
        },
    },
    created() {
        this.showContacts()
        this.deadLine()
        this.fetchProducts()
        this.discounts()
        this.fecthInvoice();
        this.fetchInvoiceTax();
        this.fetchInvoiceProduct();
        this.fetchTaxProduct();
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
                        });
                        this.$router.push('/invoice');
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
        showContacts() {
            this.$http.get('contact/showContacts').then((response) => {
                this.contacts = response.data.contacts
            })
        },
        calculateTotals() {
            var sum = 0;
            var discount = 0;
            var total = 0;
            for (let index = 0; index < this.form.products.length; index++) {
                sum += +this.form.products[index].price * this.form.products[index].quantity;
                discount += +this.form.products[index].discount;
            }
            for (let index = 0; index < this.form.conducesDate.length; index++) {
                for (let indexC = 0; indexC < this.form.conducesDate[index].conduces.length; indexC++) {
                    sum += +this.form.conducesDate[index].conduces[indexC].price * this.form.conducesDate[index].conduces[indexC].quantity;
                    discount += +this.form.conducesDate[index].conduces[indexC].discount;
                }
            }
            total = sum - discount;
            this.form.totals.total = total;
            this.form.totals.subtotal = sum;
            this.form.totals.discount = discount;
            this.updateTotal();
        },
        changePrice(index) {
            if (this.form.products[index].price == '') {
                this.form.products[index].total = 0;
            } else {
                this.changePercentage(index);
            }
        },
        changePriceConduce(indexC, index) {
            if (this.form.conducesDate[indexC].conduces[index].price == '') {
                this.form.conducesDate[indexC].conduces[index].total = 0;
            } else {
                this.changePercentageConduce(indexC, index);
            }
        },
        changePercentageConduce(indexC, index) {
            if (this.form.conducesDate[indexC].conduces[index].percentage == 0) {
                this.form.conducesDate[indexC].conduces[index].discount = (this.form.conducesDate[indexC].conduces[index].quantity * this.form.conducesDate[indexC].conduces[index].price) * (0 / 100)
                this.form.conducesDate[indexC].conduces[index].total = (this.form.conducesDate[indexC].conduces[index].quantity * this.form.conducesDate[indexC].conduces[index].price) - this.form.conducesDate[indexC].conduces[index].discount;
                this.calculateTotals();
            } else {
                this.form.conducesDate[indexC].conduces[index].percentage = this.form.conducesDate[indexC].conduces[index].percentage > 100 ? 100 : this.form.conducesDate[indexC].conduces[index].percentage;
                this.form.conducesDate[indexC].conduces[index].discount = (this.form.conducesDate[indexC].conduces[index].quantity * this.form.conducesDate[indexC].conduces[index].price) * (this.form.conducesDate[indexC].conduces[index].percentage / 100)
                this.form.conducesDate[indexC].conduces[index].total = (this.form.conducesDate[indexC].conduces[index].quantity * this.form.conducesDate[indexC].conduces[index].price) - this.form.conducesDate[indexC].conduces[index].discount;
                this.calculateTotals();
            }
            this.changeTax();
        },
        changeQuantityConduce(indexC, index, quantitydefault) {
            if (this.form.conducesDate[indexC].conduces[index].quantity > quantitydefault) {
                this.$swal({
                    title: 'La cantidad vendida es mayor a la disponible en el inventario.',
                    icon: 'warning',
                    customClass: {
                        confirmButton: 'btn btn-warning',
                    },
                    buttonsStyling: false,
                })
                this.form.conducesDate[indexC].conduces[index].quantity = quantitydefault;
            } else {
                if (this.form.conducesDate[indexC].conduces[index].quantity == '') {
                    this.form.conducesDate[indexC].conduces[index].total = 0;
                } else {
                    this.changePercentageConduce(indexC, index);
                    this.changeTax();
                    this.calculateTotals();
                }
            }
        },
        changePercentage(index) {
            if (this.form.products[index].percentage == 0) {
                this.form.products[index].discount = (this.form.products[index].quantity * this.form.products[index].price) * (0 / 100)
                this.form.products[index].total = (this.form.products[index].quantity * this.form.products[index].price) - this.form.products[index].discount;
                this.calculateTotals();
            } else {
                this.form.products[index].percentage = this.form.products[index].percentage > 100 ? 100 : this.form.products[index].percentage;
                this.form.products[index].discount = (this.form.products[index].quantity * this.form.products[index].price) * (this.form.products[index].percentage / 100)
                this.form.products[index].total = (this.form.products[index].quantity * this.form.products[index].price) - this.form.products[index].discount;
                this.calculateTotals();
            }
            this.changeTax();
        },
        changeQuantity(index) {
            if (this.form.products[index].quantity == '') {
                this.form.products[index].total = 0;
            } else {
                this.changePercentage(index);
                this.changeTax();
                this.calculateTotals();
            }
        },
        searchProduct(index, id) {
            this.$http.get('identification/product/' + id).then((response) => {
                this.form.products[index].price = response.data.product.price;
                this.form.products[index].quantity = 1;
                this.form.products[index].total = response.data.product.price;
                this.form.products[index].percentage = 0;
                this.calculateTotals();
            })
        },
        searchConduce(id, index) {
            var error = false;
            this.form.conducesDate[index].id = null;
            this.form.conducesDate.forEach(selected => {
                if (id == selected.id) {
                    error = true;
                }
            });
            if (!error) {
                this.form.conducesDate[index].id = id;
                this.form.conducesDate[index].message = null;
                this.$http.get('invoiceDriver/showDriver/' + id).then((response) => {
                    var conduce = response.data.Conduces;
                    this.form.conducesDate[index].conduces = conduce.products;
                    for (let index = 0; index < this.form.conducesDate.length; index++) {
                        for (let indexC = 0; indexC < this.form.conducesDate[index].conduces.length; indexC++) {
                            this.changePriceConduce(index, indexC);
                        }
                    }
                })
            } else {
                this.form.conducesDate[index].id = null;
                this.form.conducesDate[index].message = 'El conduce ya ha sido seleccionada.';
                this.form.conducesDate[index].conduces = [];
            }
        },
        discounts() {
            this.$http.get('identification/listDiscounts').then((response) => {
                this.tax = response.data.discounts;
                this.tax.push({
                    text: 'Seleccione',
                    value: null
                })
            })
        },
        change(val) {
            this.form.expiration = moment(val).add(this.idDeadline, 'days').format('YYYY-MM-DD')
        },
        resetContact() {
            this.form.contact = '';
            this.form.date = '',
                this.form.payment_deadline = '',
                this.form.expiration = '';
            this.form.rnc = '',
                this.form.phone = ''
        },
        showContactId(id) {
            this.$http.get('contact/showContact/' + id).then((response) => {
                this.form.rnc = response.data.contact.number_identification;
                this.form.phone = response.data.contact.mobil;
                this.form.date = moment().format('YYYY-MM-DD');
                this.form.payment_deadline = response.data.contact.payment_deadline;
                this.fecthConduces(id);
            })
        },
        fecthConduces(id) {
            this.$http.get('invoice/driver/' + id).then((response) => {
                this.conduces_show = response.data.driver;
            })
        },
        deadLine() {
            this.$http.get('identification/listDeadline').then((response) => {
                this.payment_deadline = response.data.listDeadline;
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
        deadLineId(id) {
            this.$http.get('identification/listDeadline/' + id).then((response) => {
                this.idDeadline = response.data.listDeadlineId.days;
                this.form.expiration = moment(this.form.date).add(this.idDeadline, 'days').format('YYYY-MM-DD')
            })
        },
        repeateAgain() {
            this.form.products.push({
                id: null,
                name: null,
                ref: '',
                price: 0,
                percentage: 0,
                tax: [],
                description: '',
                quantity: 0,
                total: '',
                discount: 0
            })

            this.$nextTick(() => {
                this.trAddHeight(this.$refs.row[0].offsetHeight)
            })
        },
        repeateAgainConduce() {
            this.form.conducesDate.push({
                id: null,
                conduces: [],
                message: null
            })

            this.$nextTick(() => {
                this.trAddHeight(this.$refs.row[0].offsetHeight)
            })
        },
        removeItem(index) {
            this.form.products.splice(index, 1);
            this.changeTax();
            this.trTrimHeight(this.$refs.row[0].offsetHeight)
        },
        removeConduce(index) {
            this.form.conducesDate.splice(index, 1);
            this.changeTax();
            this.trTrimHeight(this.$refs.row[0].offsetHeight)
        },
        removeItemConduce(indexC, index) {
            this.form.conducesDate[indexC].conduces.splice(index, 1);
            this.changeTax();
            this.trTrimHeight(this.$refs.row[0].offsetHeight)
        },
        initTrHeight() {
            this.trSetHeight(null)
            this.$nextTick(() => {
                this.trSetHeight(this.$refs.form.scrollHeight)
            })
        },
        changeTax() {
            var union = [];
            var merge = [];
            if (this.form.conducesDate.length > 0) {
                this.form.conducesDate.forEach(element => {
                    element.conduces.forEach(item => {
                        merge.push(item);
                    });
                });
                union = this.form.products.concat(merge);
            } else {
                union = this.form.products;
            }
            this.form.listTax = [];
            for (let index = 0; index < union.length; index++) {
                let tax = union[index].tax;
                for (let index2 = 0; index2 < tax.length; index2++) {
                    let total = Math.ceil(((union[index].total * tax[index2].discount) / 100));
                    if (this.form.listTax.find(({ name }) => name === tax[index2].text) === undefined) {
                        this.form.listTax.push({ name: tax[index2].text, discount: tax[index2].discount, value: tax[index2].value, total: total });
                    } else {
                        let position = this.form.listTax.findIndex(({ name }) => name === tax[index2].text);
                        this.form.listTax[position].total += +total;
                    }
                }

            }
            this.calculateTotals();
        },
        updateTotal() {
            var total = this.form.totals.total;
            for (let index = 0; index < this.form.listTax.length; index++) {
                total += this.form.listTax[index].total;
            }
            this.form.totals.total = total;
        },
        fecthInvoice() {
            if (this.action !== 'create') {
                this.$http.get('/invoice/getInvoice/' + this.$route.params.id)
                    .then(response => {
                        this.form.contact = response.data.invoice.client_id;
                        this.form.payment_deadline = response.data.invoice.payment_id;
                        this.form.expiration = response.data.invoice.expiration;
                        this.form.date = response.data.invoice.created;
                        this.form.terms = response.data.invoice.terms;
                        this.form.footer = response.data.invoice.footer;
                        this.form.note = response.data.invoice.note;
                        this.form.totals.subtotal = response.data.invoice.subtotal;
                        this.form.totals.discount = response.data.invoice.discount;
                        this.form.totals.total = response.data.invoice.total;
                    })
            }
        },
        fetchInvoiceProduct() {
            if (this.action !== 'create') {
                this.form.products = []
                this.$http.get('/invoice/getInvoiceProduct/' + this.$route.params.id)
                    .then(response => {
                        for (let index = 0; index < response.data.invoiceProduct.length; index++) {
                            let product = response.data.invoiceProduct;
                            this.form.products.push({ id: product[index].id, name: product[index].product_id, price: product[index].price, percentage: product[index].percentage, tax: [], description: product[index].description, quantity: product[index].quantity, total: product[index].total, discount: product[index].discount, ref: product[index].ref });
                        }

                        var conduce = response.data.Conduces;
                        this.form.conducesDate = conduce;
                        for (let index = 0; index < this.form.conducesDate.length; index++) {
                            for (let indexC = 0; indexC < this.form.conducesDate[index].conduces.length; indexC++) {
                                this.changePriceConduce(index, indexC);
                            }
                        }
                    })
            }
        },
        fetchInvoiceTax() {
            if (this.action !== 'create') {
                this.$http.get('/invoice/getInvoiceTax/' + this.$route.params.id)
                    .then(response => {
                        for (let index = 0; index < response.data.invoiceTax.length; index++) {
                            let tax = response.data.invoiceTax;
                            this.form.listTax.push({ name: tax[index].name + ' - ' + tax[index].discount, discount: tax[index].discount, value: tax[index].id, total: tax[index].total });
                        }
                    })
            }
        },
        fetchTaxProduct() {
            if (this.action !== 'create') {
                this.$http.get('/invoice/getTaxProduct/' + this.$route.params.id)
                    .then(response => {
                        for (let index = 0; index < response.data.taxProduct.length; index++) {
                            let tax = response.data.taxProduct;
                            let position = this.form.products.findIndex(({ id }) => id === tax[index].id_invoice_products);
                            this.form.products[position].tax.push({ text: tax[index].name + ' - ' + tax[index].discount, discount: tax[index].discount, value: tax[index].id });
                        }
                    })
            }
        },
        updateInvoice() {
            this.form.id = this.$route.params.id;

            this.$http.post('/invoice/update', this.form)
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
                        this.$router.push('/invoice');
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
        editInvoice() {
            this.$router.push({ name: 'invoice-edit', params: { id: this.$route.params.id } });
        }
    },
    computed: {
        conduces_NoRepeat() {
            var array1 = [];
            this.conduces_show.forEach(options => {
                this.form.conducesDate.forEach(selected => {
                    if (options.value != selected.id) {
                        array1.push(options);
                    }
                });
            });
            return array1;
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

// .repeater-form {
//     overflow-y: auto;
//     overflow-x: hidden;
//     height: 500px;
// }

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