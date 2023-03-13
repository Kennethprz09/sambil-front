<template>
    <div v-if="mostrarEdit">
        <b-card no-body class="mt-2 mb-0">
            <b-row>
                <b-col md="5" xl="4" class="mb-3 p-3">
                    <b-img class="imgLogo" :src="require('@/assets/images/logo/sambil-logo.png')" fluid
                        alt="Responsive image" />
                </b-col>
                <b-col md="3" xl="4" class="text-center mb-3 p-3">
                    <h4>Utam</h4>
                </b-col>
                <b-col md="2" xl="2" offset="2" class="mb-3 p-3">
                    <b-form-group label-cols="4" label-cols-lg="2" label="No.">
                        <b-form-input value="5" disabled />
                    </b-form-group>
                </b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Tipo de documento</label>
                    <v-select v-model="form.type_id" class="mb-1" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title" :options="type_ids" placeholder="Seleccionar" :reduce="(val) => val.value" />
                    <label for="">Contacto</label>
                    <v-select v-model="form.contact" class="mb-1" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title" :options="contacts" placeholder="Seleccionar" :reduce="(val) => val.value" />
                    <label for="">RNC o Cédula</label>
                    <b-form-input v-model="form.rnc" disabled />
                    <label class="mt-2" for="">Teléfono</label>
                    <b-form-input v-model="form.phone" disabled />
                </b-col>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Fecha</label>
                    <b-form-datepicker v-model="form.date" class="mb-1" />
                    <label for="">Vencimiento</label>
                    <b-form-datepicker v-model="form.expiration" class="mb-1" />
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
                      
                    </b-col>
                </b-row>
                <hr class="line">
                <!-- Row Loop -->
                <b-row v-for="(item, index) in form.products" :id="item.id" :key="index" ref="row" class="mb-2">
                    <b-col>
                        <b-form-select v-model="form.products[index].name" :options="products" :reduce="(val) => val.value"
                            @change="searchProduct(index, form.products[index].name)" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].ref" placeholder="Referencia" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].price" type="number" placeholder="Precio unitario"
                            @keyup="changePrice(index)" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].percentage" type="number" placeholder="%"
                            @keyup="changePercentage(index)" />
                    </b-col>
                    <b-col>
                        <!-- <select v-model="form.products[index].tax" multiple="multiple" class="custom-select" id="BVID__125"
                            @change="changeTax(index)">
                            <template v-for="(item, indexS) in form.products[index].taxselect">
                                <option :key="indexS" :value="item" v-if="item.status == 1" selected>
                                    {{ item.text }}
                                </option>
                                <option :key="indexS" :value="item" v-else>
                                    {{ item.text }}
                                </option>
                            </template>
                        </select> -->
                        <v-select @option:deselected='deleteTax(index)' @input="changeTax(index)" v-model="form.products[index].tax" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="text" multiple :options="form.products[index].taxselect" v-if="form.products[index].taxselect.length > 0" />
                        <v-select @option:deselected='deleteTax(index)' @input="changeTax(index)" v-model="form.products[index].tax" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="text" multiple :options="tax" v-else />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].description" placeholder="Descripción" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].quantity" type="number" placeholder="Cantidad"
                            @keyup="changeQuantity(index)" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].total" placeholder="0.00" disabled />
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
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="mb-5" variant="primary" @click="repeateAgain">
                    <feather-icon icon="PlusIcon" class="mr-25" />
                    <span>Agregar Linea</span>
                </b-button>
            </b-col>
        </b-card>
        <b-card no-body class="mt-1">
            <b-row>
                <b-col md="4" xl="4" class="mb-3 p-3">
                    <b-img class="imgLogo" :src="require('@/assets/images/logo/firma.png')" fluid alt="Responsive image" />
                </b-col>
                <b-col md="2" class="mb-3 p-3" />
                <b-col md="3" offset="1" class="mb-3 p-3">
                    <b-row class="ml-5 mt-4 d-flex">
                        <b-col md="12">
                            <strong>
                                <p class="ml-3 d-flex">Subtotal</p>
                            </strong>
                        </b-col>
                        <b-col md="12">
                            <strong>
                                <p class="ml-3 d-flex">Descuento</p>
                            </strong>
                        </b-col>
                        <b-col md="12">
                            <strong>
                                <p class="ml-3 d-flex">Subtotal</p>
                            </strong>
                        </b-col>
                        <template v-for="(item, index) in form.totals.MostrarTax">
                            <b-col :key="index" md="12">
                                <strong>
                                    <p class="ml-3">{{ item.text }}</p>
                                </strong>
                            </b-col>
                        </template>
                        <b-col md="12">
                            <strong>
                                <p class="ml-3">Total</p>
                            </strong>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="2" class="mb-3 p-3 text-right">
                    <b-row class="mr-5 mt-4 d-flex">
                        <b-col md="12">
                            <p>RD${{ formatPrice(form.totals.subtotal) }}</p>
                        </b-col>
                        <b-col md="12">
                            <p>-RD${{ CalcularDescuento() }}</p>
                        </b-col>
                        <b-col md="12">
                            <p>RD${{ CalcularSubtotal() }}</p>
                        </b-col>
                        <template v-for="(item, index) in form.totals.MostrarTax">
                            <b-col :key="index" md="12">
                                <p>RD${{ CalcularImpuesto((item.discount * item.quantity)) }}</p>
                            </b-col>
                        </template>
                        <b-col md="12">
                            <p>RD${{ CalcularTotal(form.totals.subtotal) }}</p>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12" class="mt-0 mb-3 pl-3 pr-3 pt-1">
                    <label for="textarea-default">Notas</label>
                    <b-form-textarea v-model="form.note" placeholder="Visible en la impresión del documento" rows="3" />
                </b-col>
                <b-col md="12" class="text-center mb-3">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="storeInvoice()">
                        Guardar
                    </b-button>
                </b-col>
            </b-row>
        </b-card>
        <br>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import { BCard, BRow, BCol, BImg, BForm, BButton, BFormGroup, BFormInput, BFormTextarea, BFormDatepicker, BFormSelect } from 'bootstrap-vue'

export default {
    name: 'EditarCotizacion',
    mounted() {
        this.$http.get("invoiceDriver/showDriver/" + this.id).then((response) => {
            this.listprice();
            this.showContacts();
            this.fetchProducts();
            this.discounts();

            this.form = response.data.Conduces;
            this.form.date = moment(response.data.Conduces.date).format('YYYY-MM-DD');
            this.form.expiration = moment(response.data.Conduces.expiration).format('YYYY-MM-DD');
            this.form.totals = {
                subtotal: 0,
                discount: 0,
                total: 0,
                tax: 0,
                taxMostrar: [],
                MostrarTax: []
            };

            var selfs = this;
            setTimeout(() => {
                this.changeTax();
                this.calculateTotals();
                selfs.mostrarEdit = true;
            }, "1000")
        });
    },
    data() {
        return {
            mostrarEdit: false,
            id: this.$route.params && this.$route.params.id,
            listPrice: [],
            contacts: [],
            products: [],
            tax: [],
            form: {
                cotizacion_id: this.$route.params && this.$route.params.id,
                contact: '',
                rnc: '',
                phone: '',
                date: '',
                payment_deadline: '',
                expiration: '',
                products: [
                    {
                        id: null,
                        name: null,
                        ref: '',
                        price: 0,
                        percentage: 0,
                        tax: [],
                        description: '',
                        quantity: '',
                        total: '',
                    },
                ],
                totals: {
                    subtotal: 0,
                    discount: 0,
                    total: 0,
                    tax: 0,
                    taxMostrar: [],
                },
                note: '',
            },
            type_ids: [
                { value: 1, title: 'Conduce' },
                { value: 2, title: 'Orden de servicio' },
            ],
        }
    },
    methods: {
        deleteTax(index) {
            this.form.totals.taxMostrar = [];
            this.form.products.forEach(item => {
                item.tax.forEach(element => {
                    this.form.totals.taxMostrar.push(element);
                });
            });
            const array = this.form.totals.taxMostrar;
            const arreglo = [];
            for (let index = 0; index < array.length; index++) {
                const item = array[index];
                const existe = arreglo.find(i => i.value == item.value);
                if (existe) {
                    var indexExiste = arreglo.indexOf(existe);
                    arreglo[indexExiste].quantity = arreglo[indexExiste].quantity + 1;
                    arreglo.splice(indexExiste, 1, arreglo[indexExiste]);
                } else {
                    item.quantity = 1;
                    arreglo.push(item);
                }
            }

            this.form.totals.MostrarTax = arreglo;
        },
        storeInvoice() {
            this.$http
                .post('/invoiceDriver/updateDriver', this.form)
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
                        this.$router.push('/invoice/drive')
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
                if (this.form.products[index].quantity > 0) {
                    sum += +(this.form.products[index].price * this.form.products[index].quantity)
                } else {
                    sum += +this.form.products[index].price
                }
                this.changePercentage(index);
            }
            this.form.totals.subtotal = sum
        },
        changePrice(index) {
            if (
                this.form.products[index].price == ''
                || this.form.products[index].price == 0
            ) {
                this.form.products[index].total = 0
                this.calculateTotals()
            } else {
                this.form.products[index].total = this.form.products[index].price
                this.calculateTotals()
                this.totalProduct(index)
            }
        },
        totalProduct(index) {
            if (this.form.products[index].quantity > 1) {
                var total = this.form.products[index].total * this.form.products[index].quantity
            } else {
                var total = this.form.products[index].price
            }

            const descuentos = (total * (this.form.products[index].percentage / 100))

            this.form.products[index].total = (total - descuentos)
        },
        changePercentage(index) {
            let sum = 0
            for (let index = 0; index < this.form.products.length; index++) {
                sum += +this.form.products[index].percentage
            }
            this.form.totals.discount = sum
            this.totalProduct(index)
        },
        changeTax(index) {
            let sum = 0
            this.form.totals.taxMostrar = []
            for (let index = 0; index < this.form.products.length; index++) {
                for (let index2 = 0; index2 < this.form.products[index].tax.length; index2++) {
                    sum += +this.form.products[index].tax[index2].discount
                    const llenar = this.form.totals.taxMostrar.find(item => item.text == this.form.products[index].tax[index2].text)
                    if (!llenar) {
                        sum = this.form.products[index].tax[index2].discount + this.form.products[index].tax[index2].discount
                    }
                    this.form.totals.taxMostrar.push(this.form.products[index].tax[index2])
                }
            }
            this.form.totals.tax = sum
            this.deleteTax(index);
        },
        changeQuantity(index) {
            if (this.form.products[index].quantity == '' || this.form.products[index].quantity > 0) {
                this.changePrice(index)
            } else {
                this.totalProduct(index)
                this.calculateTotals()
            }
        },
        searchProduct(index, id) {
            this.$http.get(`identification/product/${id}`).then(response => {
                this.form.products[index].ref = null
                this.form.products[index].price = response.data.product.price
                this.form.products[index].percentage = 0
                this.form.products[index].tax = []
                this.form.products[index].description = null
                this.form.products[index].quantity = 1
                this.form.products[index].total = response.data.product.price
                this.calculateTotals()
            })
        },
        discounts() {
            this.$http.get('identification/listDiscounts').then(response => {
                this.tax = response.data.discounts;
            })
        },
        change(val) {
            this.form.expiration = moment(val).format('YYYY-MM-DD')
        },
        resetContact() {
            this.form = {
                contact: '',
                rnc: '',
                phone: '',
                date: null,
                payment_deadline: '',
                expiration: null,
            }
        },
        listprice() {
            this.$http.get('identification/listPrice').then(response => {
                this.listPrice = response.data.listPrice
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
                // this.form.date = new Date()
                this.form.payment_deadline = response.data.contact.payment_deadline
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
        repeateAgain() {
            this.form.products.push({
                id: null,
                name: null,
                ref: '',
                price: 0,
                percentage: 0,
                tax: [],
                taxselect: [],
                description: '',
                quantity: 1,
                total: '',
            })
        },
        removeItem(index) {
            this.form.products.splice(index, 1)
        },
        formatPrice(value) {
            const val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        CalcularDescuento() {
            var descuento = this.form.totals.subtotal * (this.form.totals.discount / 100);
            return this.formatPrice(descuento)
        },
        CalcularSubtotal() {
            var descuento = this.form.totals.subtotal * (this.form.totals.discount / 100);
            var subtotal = this.form.totals.subtotal - descuento;
            return this.formatPrice(subtotal)
        },
        CalcularImpuesto(tax) {
            var descuento = this.form.totals.subtotal * (this.form.totals.discount / 100);
            var subtotal = this.form.totals.subtotal - descuento;
            const impuestos = subtotal * (tax / 100)
            return this.formatPrice(impuestos)
        },
        CalcularTotal(subtotal) {
            if (this.form.totals.tax) {
                const impuestos = subtotal * (this.form.totals.tax / 100)
                this.form.total = subtotal + impuestos
                return this.formatPrice(subtotal + impuestos)
            }
            this.form.total = subtotal

            return this.formatPrice(subtotal)
        },
    },
    watch: {
        'form.contact': function (val) {
            if (val) {
                this.showContactId(val)
            } else {
                this.resetContact()
            }
        },
        // 'form.date': function (val) {
        //     this.change(val)
        // },
    },
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
.repeater-form {
    overflow-y: auto;
    overflow-x: hidden;
    height: 500px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>