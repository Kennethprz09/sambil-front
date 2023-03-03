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
            <hr />
            <b-row>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Contacto</label>
                    <v-select v-model="form.contact" class="mb-1" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title" :options="contacts" placeholder="Seleccionar" :reduce="(val) => val.value" disabled />
                    <label for="">RNC o Cédula</label>
                    <b-form-input v-model="form.rnc" disabled />
                    <label class="mt-2" for="">Teléfono</label>
                    <b-form-input v-model="form.phone" disabled />
                </b-col>
                <b-col md="6" xl="6" class="mb-3 p-3">
                    <label for="">Fecha</label>
                    <b-form-datepicker v-model="form.date" class="mb-1" disabled />
                    <label for="">Vencimiento</label>
                    <b-form-datepicker v-model="form.expiration" class="mb-1" disabled />
                </b-col>
            </b-row>
            <b-form ref="form" :style="{ height: trHeight }" class="repeater-form ml-2" @submit.prevent="repeateAgain"
                disabled>
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
                <hr class="line" />
                <!-- Row Loop -->
                <b-row class="mb-2" v-for="(item, index) in form.products" :id="item.id" :key="index" ref="row">
                    <b-col>
                        <b-form-select v-model="form.products[index].name" :options="products"
                            @change="searchProduct(index, form.products[index].name)" :reduce="(val) => val.value"
                            disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].ref" placeholder="Referencia" disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].price" type="number" placeholder="Precio unitario"
                            @keyup="changePrice(index)" disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].percentage" type="number" placeholder="%"
                            @keyup="changePercentage(index)" disabled />
                    </b-col>
                    <b-col>
                        <select v-model="form.products[index].tax" multiple="multiple" class="custom-select" id="BVID__125"
                            @change="changeTax(index)" disabled>
                            <option v-for="(item, index) in form.products[index].tax" :key="index" :value="item">
                                {{ item.text }}
                            </option>
                        </select>
                        <!-- <v-select v-model="form.products[index].tax" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="text" multiple :options="tax" @change="changeTax(index)" /> -->
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].description" placeholder="Descripción" disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].quantity" type="number" placeholder="Cantidad"
                            @keyup="changeQuantity(index)" disabled />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="form.products[index].total" placeholder="0.00" disabled />
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
        <b-card no-body class="mt-1">
            <b-row>
                <b-col md="4" xl="4" class="mb-3 p-3">
                    <b-img class="imgLogo" :src="require('@/assets/images/logo/firma.png')" fluid alt="Responsive image" />
                </b-col>
                <b-col md="2" class="mb-3 p-3"></b-col>
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
                        <template v-for="(item, index) in form.totals.taxMostrar">
                            <b-col md="12" :key="index">
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
                            <p>-RD${{ formatPrice(Descuento) }}</p>
                        </b-col>
                        <b-col md="12">
                            <p>RD${{ formatPrice(Subtotal) }}</p>
                        </b-col>
                        <template v-for="(item, index) in form.totals.taxMostrar">
                            <b-col md="12" :key="index">
                                <p>RD${{ CalcularImpuesto(item.discount) }}</p>
                            </b-col>
                        </template>
                        <b-col md="12">
                            <p>RD${{ Impuestos }}</p>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12" class="mt-0 mb-3 pl-3 pr-3 pt-1">
                    <label for="textarea-default">Notas</label>
                    <b-form-textarea v-model="form.note" placeholder="Visible en la impresión del documento" rows="3"
                        disabled />
                </b-col>
            </b-row> </b-card><br />
    </div>
</template>
<script>
import vSelect from "vue-select";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
import moment from "moment";
import { BCard, BRow, BCol, BImg, BForm, BButton, BFormGroup, BFormInput, BFormTextarea, BFormDatepicker, BFormSelect } from "bootstrap-vue";

export default {
    mixins: [heightTransition],
    name: "VERFacturas",
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
    data() {
        return {
            mostrarEdit: false,
            id: this.$route.params && this.$route.params.id,
            listPrice: [],
            nextTodoId: 2,
            form: {
                id: null,
                contact: "",
                rnc: "",
                phone: "",
                date: "",
                payment_deadline: "",
                expiration: "",
                products: [],
                totals: {
                    subtotal: 0,
                    discount: 0,
                    total: 0,
                    tax: 0,
                    taxMostrar: [],
                },
                note: "",
            },
            contacts: [],
            payment_deadline: [],
            products: [],
            tax: [],
            idDeadline: "",
        };
    },
    mounted() {
        // this.$http.get("invoice/showCotization/" + this.id).then((response) => {
        this.$http.get("invoice/showCotization/" + 2).then((response) => {
            this.listprice();
            this.showContacts();
            this.fetchProducts();
            this.discounts();
            this.fetchRetention();
            this.form = response.data.cotization;
            this.form.totals = {
                subtotal: 0,
                discount: 0,
                total: 0,
                tax: 0,
                taxMostrar: [],
            };


            this.changeTax();
            this.calculateTotals();
            var selfs = this;
            setTimeout(() => {
                selfs.mostrarEdit = true;
            }, "2000")
        });
        this.initTrHeight();
    },
    directives: {
        Ripple,
    },
    watch: {
        "form.date"(val) {
            this.change(val);
        },
    },
    created() {
        window.addEventListener("resize", this.initTrHeight);
    },
    destroyed() {
        window.removeEventListener("resize", this.initTrHeight);
    },
    methods: {
        storeInvoice() {
            this.$http
                .post("/invoice/storeCotization", this.form)
                .then((response) => {
                    if (response.data.code == 200) {
                        this.$swal({
                            title: response.data.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                            buttonsStyling: false,
                        });
                        this.$router.push("/invoice");
                    }
                    if (response.data.code == 500) {
                        this.$swal({
                            title: response.data.message,
                            icon: "warning",
                            customClass: {
                                confirmButton: "btn btn-warning",
                            },
                            buttonsStyling: false,
                        });
                    }
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                });
        },
        calculateTotals() {
            var sum = 0;
            for (let index = 0; index < this.form.products.length; index++) {
                if (this.form.products[index].quantity > 0) {
                    sum += +(this.form.products[index].price * this.form.products[index].quantity);
                } else {
                    sum += +this.form.products[index].price;
                }
                this.totalProduct(index);
            }
            this.form.totals.subtotal = sum;
        },
        changeValueRetention(val) {
            if (val == "") {
                this.form.retentions[va].value = "";
            }
        },
        addRetention() {
            this.form.retentions.push({
                id: "",
                retention: "",
                value: "",
            });
        },
        deleteRetention(index) {
            this.form.retentions.splice(index, 1);
        },
        changePrice(index) {
            if (
                this.form.products[index].price == "" ||
                this.form.products[index].price == 0
            ) {
                this.form.products[index].total = 0;
                this.calculateTotals();
            } else {
                this.form.products[index].total = this.form.products[index].price;
                this.calculateTotals();
                this.totalProduct(index);
            }
        },
        totalProduct(index, status) {
            if (this.form.products[index].quantity > 1) {
                var total = this.form.products[index].total * this.form.products[index].quantity;
            } else {
                var total = this.form.products[index].price;
            }

            var descuentos = (total * (this.form.products[index].percentage / 100));

            this.form.products[index].total = (total - descuentos);
        },
        changePercentage(index) {
            var sum = 0;
            for (let index = 0; index < this.form.products.length; index++) {
                sum += +this.form.products[index].percentage;
            }
            this.form.totals.discount = sum;
            this.totalProduct(index);
        },
        changeTax(index) {
            var sum = 0;
            this.form.totals.taxMostrar = [];
            for (let index = 0; index < this.form.products.length; index++) {
                for (
                    let index2 = 0;
                    index2 < this.form.products[index].tax.length;
                    index2++
                ) {
                    sum += +this.form.products[index].tax[index2].discount;
                    this.form.totals.taxMostrar.push(
                        this.form.products[index].tax[index2]
                    );
                }
            }
            this.form.totals.tax = sum;
        },
        changeQuantity(index) {
            if (this.form.products[index].quantity == "" || this.form.products[index].quantity > 0) {
                this.changePrice(index);
            } else {
                this.totalProduct(index);
                this.calculateTotals();
            }
        },
        searchProduct(index, id) {
            this.$http.get("identification/product/" + id).then((response) => {
                this.form.products[index].price = response.data.product.price;
                this.form.products[index].quantity = 1;
                this.form.products[index].total = response.data.product.price;
                this.form.products[index].percentage = 0;
                this.calculateTotals();
            });
        },
        discounts() {
            this.$http.get("identification/listDiscounts").then((response) => {
                this.tax = response.data.discounts;
            });
        },
        change(val) {
            this.form.expiration = moment(val)
                .add(this.idDeadline, "days")
                .format("YYYY-MM-DD");
        },
        resetContact() {
            this.form = {
                contact: "",
                rnc: "",
                phone: "",
                date: "",
                payment_deadline: "",
                expiration: "",
            };
        },
        listprice() {
            this.$http.get("identification/listPrice").then((response) => {
                this.listPrice = response.data.listPrice;
            });
        },
        fetchRetention() {
            this.$http.get("identification/listRetention").then((response) => {
                this.retentions = response.data.retentions;
            });
        },
        showContacts() {
            this.$http.get("contact/showContacts").then((response) => {
                this.contacts = response.data.contacts;
            });
        },
        deadLine() {
            this.$http.get("identification/listDeadline").then((response) => {
                this.payment_deadline = response.data.listDeadline;
            });
        },
        fetchProducts() {
            this.$http.get("identification/listProducts").then((response) => {
                this.products = response.data.products;
            });
        },
        repeateAgain() {
            this.form.products.push({
                id: null,
                name: null,
                ref: "",
                price: "",
                percentage: "",
                tax: "",
                description: "",
                quantity: "",
                total: "",
            });

            this.$nextTick(() => {
                this.trAddHeight(this.$refs.row[0].offsetHeight);
            });
        },
        removeItem(index) {
            this.form.products.splice(index, 1);
            this.trTrimHeight(this.$refs.row[0].offsetHeight);
        },
        initTrHeight() {
            this.trSetHeight(null);
            this.$nextTick(() => {
                // this.trSetHeight(this.$refs.form.scrollHeight);
            });
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        CalcularImpuesto(tax) {
            var impuestos = this.Subtotal * (tax / 100);
            return this.formatPrice(impuestos);
        },
    },
    computed: {
        Descuento() {
            return this.form.totals.subtotal * (this.form.totals.discount / 100);
        },
        Subtotal() {
            return this.form.totals.subtotal - this.Descuento;
        },
        Impuestos() {
            if (this.form.totals.tax) {
                var impuestos = this.Subtotal * (this.form.totals.tax / 100);
                this.form.total = this.Subtotal + impuestos;
                return this.formatPrice(this.Subtotal + impuestos);
            } else {
                this.form.total = this.Subtotal;
            }

            return this.formatPrice(this.Subtotal);
        },
    },
};
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