<template>
    <div>
        <h3 class="mt-2 mb-2">Nueva Factura Proveedor</h3>
        <b-card no-body class="mt-2 mb-0">
            <b-row>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Contacto</label>
                    <v-select v-model="form.contact" class="mb-1"
                        label="title" :options="contacts" placeholder="Seleccionar" :reduce="val => val.value" :disabled="action !== 'view' ? false : true" />
                    <label for="">NCF</label>
                    <b-form-input v-model="form.nfc_number" :disabled="action !== 'view' ? false : true" />
                </b-col>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Fecha</label>
                    <b-form-datepicker v-model="form.date" class="mb-1" :disabled="action !== 'view' ? false : true" />
                    <label for="">Vencimiento</label>
                    <b-form-datepicker v-model="form.expiration" class="mb-1" :disabled="action !== 'view' ? false : true" />
                </b-col>
            </b-row>
            <b-form ref="form" class="repeater-form ml-2" @submit.prevent="repeateAgain">
                <b-row>
                    <b-col>
                        <h6>Concepto</h6>
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
                        <h6>Cantidad</h6>
                    </b-col>
                    <b-col>
                        <h6>Descripción</h6>
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
                            @change="searchProduct(index, form.products[index].name)" :reduce="val => val.value" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].price" type="number" placeholder="Precio unitario"
                            disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].percentage" type="number" placeholder="0"
                            @keyup="changePercentage(index)" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <v-select v-model="form.products[index].tax" multiple label="text" :options="tax"
                            @input="changeTax" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].quantity" type="number" placeholder="Cantidad"
                            @keyup="changeQuantity(index)" :disabled="action !== 'view' ? false : true" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].description" placeholder="Descripción" :disabled="action !== 'view' ? false : true" />
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
                <b-button class="mb-5" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"  v-if="(action !== 'view')" @click="repeateAgain" :disabled="action !== 'view' ? false : true">
                    <feather-icon icon="PlusIcon" class="mr-25" />
                    <span>Agregar Linea</span>
                </b-button>
            </b-col>
        </b-card>
        <b-card no-body class="mt-1">
            <b-row>
                <b-col md="4" xl="4" class="mb-3">
                </b-col>
                <b-col md="2" class="mb-3"></b-col>
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
                <b-col md="12" class="text-center mb-3">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-if="(action === 'create')" @click="createInvoiceProvider()" :disabled="action !== 'view' ? false : true">
                        Guardar
                    </b-button>
                </b-col>
                <b-col md="12" class="text-center mb-3">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-if="(action === 'edit')" @click="updateInvoiceProvider()" :disabled="action !== 'view' ? false : true">
                        Actualizar
                    </b-button>
                </b-col>
                <b-col md="12" class="text-center mb-3">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-if="(action === 'view')" @click="editInvoiceProvider()">
                        Editar
                    </b-button>
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
    props: {action: String },
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
                id:null,
                contact: '',
                nfc_number: '',
                date: '',
                expiration: '',
                products: [{
                    id: null,
                    name: null,
                    price: 0,
                    percentage: 0,
                    tax: [],
                    description: '',
                    quantity: 0,
                    total: '',
                    discount: 0
                }],
                totals: {
                    subtotal: 0,
                    discount: 0,
                    total: 0
                },
                listTax: [],
            },
            contacts: [],
            products: [],
            tax: [],
            idDeadline: '',
        }
    },
    mounted() {
        this.initTrHeight()
    },
    directives: {
        Ripple,
    },
    watch: {

    },
    created() {
        this.discounts();
        this.showContacts();
        this.change();
        this.fetchProducts();
        this.fecthInvoiceProvider();
        this.fetchInvoiceTax();
        this.fetchInvoiceProduct();
        this.fetchTaxProduct();
        window.addEventListener('resize', this.initTrHeight);
    },
    destroyed() {
        window.removeEventListener('resize', this.initTrHeight);
    },
    methods: {
        searchProduct(index, id) {
            this.$http.get('identification/product/' + id).then((response) => {
                this.form.products[index].price = response.data.product.price;
                this.form.products[index].quantity = 1;
                this.form.products[index].total = response.data.product.price;
                this.form.products[index].percentage = 0;
                this.calculateTotals();
            })
        },
        change() {
            this.form.date = moment().add(this.idDeadline, 'days').format('YYYY-MM-DD')
            this.form.expiration = moment().add(this.idDeadline, 'days').format('YYYY-MM-DD')
        },
        showContacts() {
            this.$http.get('contact/showContacts').then((response) => {
                this.contacts = response.data.contacts
            })
        },
        repeateAgain() {
            this.form.products.push({
                id: null,
                name: null,
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
        removeItem(index) {
            this.form.products.splice(index, 1);
            this.changeTax();
            this.trTrimHeight(this.$refs.row[0].offsetHeight);
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
        calculateTotals() {
            var sum = 0;
            var discount = 0;
            var total = 0;
            for (let index = 0; index < this.form.products.length; index++) {
                sum += +this.form.products[index].price*this.form.products[index].quantity;
                discount += +this.form.products[index].discount;
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
        initTrHeight() {
            this.trSetHeight(null)
            this.$nextTick(() => {
                this.trSetHeight(this.$refs.form.scrollHeight)
            })
        },
        discounts() {
            this.$http.get('identification/listDiscounts').then((response) => {
                this.tax = response.data.discounts;
            })
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
        changeTax() {
            this.form.listTax = [];
            for (let index = 0; index < this.form.products.length; index++) {
                let tax = this.form.products[index].tax;
                for (let index2 = 0; index2 < tax.length; index2++) {
                    let total = Math.ceil(((this.form.products[index].total * tax[index2].discount) / 100));
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
        createInvoiceProvider() {
            this.$http.post('/invoiceProvider/create', this.form)
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
                        this.$router.push('/invoice-provider');
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
        fecthInvoiceProvider(){
         if(this.action !== 'create'){
            this.$http.get('/invoiceProvider/getInvoiceProvider/'+this.$route.params.id)
                .then(response => {
                    this.form.contact = response.data.invoiceProvider.id_contacts;
                    this.form.nfc_number = response.data.invoiceProvider.nfc_number;
                    this.form.expiration = response.data.invoiceProvider.expiration;
                    this.form.date = response.data.invoiceProvider.created;
                    this.form.totals.subtotal =response.data.invoiceProvider.subtotal;
                    this.form.totals.discount =response.data.invoiceProvider.discount;
                    this.form.totals.total =response.data.invoiceProvider.total;
                })
         }
        },
        fetchInvoiceProduct(){
            if(this.action !== 'create'){
            this.form.products = []
            this.$http.get('/invoiceProvider/getInvoiceProduct/'+this.$route.params.id)
                .then(response => {
                    for (let index = 0; index < response.data.invoiceProduct.length; index++) {
                        let product = response.data.invoiceProduct;
                        this.form.products.push({id:product[index].id,name:product[index].product_id,price:product[index].price,percentage:product[index].percentage,tax:[],description:product[index].description,quantity:product[index].quantity,total:product[index].total,discount:product[index].discount});
                    }
                })
            }  
        },
        fetchInvoiceTax(){
            if(this.action !== 'create'){
            this.$http.get('/invoiceProvider/getInvoiceTax/'+this.$route.params.id)
                .then(response => {
                    for (let index = 0; index < response.data.invoiceTax.length; index++) {
                        let tax = response.data.invoiceTax;
                        this.form.listTax.push({ name: tax[index].name+' - '+tax[index].discount, discount: tax[index].discount, value: tax[index].id, total: tax[index].total });
                    }
                })
            }  
        },
        fetchTaxProduct(){
            if(this.action !== 'create'){
            this.$http.get('/invoiceProvider/getTaxProduct/'+this.$route.params.id)
                .then(response => {
                    for (let index = 0; index < response.data.taxProduct.length; index++) {
                        let tax = response.data.taxProduct;
                        let position = this.form.products.findIndex(({ id }) => id === tax[index].id_invoice_provider_products);
                        this.form.products[position].tax.push({text:tax[index].name+' - '+tax[index].discount,discount: tax[index].discount,value:tax[index].id});
                    }
                })
            } 
        },
        updateInvoiceProvider(){
            this.form.id=this.$route.params.id;
            this.$http.post('/invoiceProvider/update', this.form)
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
                        this.$router.push('/invoice-provider');
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
        editInvoiceProvider(){
            this.$router.push({name:'invoice-provider-edit',params: {id:this.$route.params.id}});
        }

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
    overflow-y: auto;
    overflow-x: hidden;
    height: 500px;
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