<template>
    <div>
        <b-card no-body class="mb-5 mt-0">
            <div class="m-2">
                <b-row>
                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center mb-1 mb-md-0">
                        <h3 class="text-center">Nuevo contacto</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center mb-1 mb-md-0">
                        <p>Crea tus contactos para asociarlos en los documentos y transacciones que registres a su
                            nombre.</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center">
                        <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" class="mt-1 d-flex"
                            variant="outline-primary" @click="toggleIndeterminate">
                            <p class="mb-0">Cliente</p>
                            <b-form-checkbox class="ml-5 mt-0" v-model="form.checked1" :disabled="disabled"
                                :indeterminate1.sync="indeterminate1">

                            </b-form-checkbox>
                        </b-button>
                        <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" class="mt-1 d-flex ml-5"
                            variant="outline-primary" @click="toggleIndeterminate2">
                            <p class="mb-0">Proveedor</p>
                            <b-form-checkbox class="ml-5 mt-0" v-model="form.checked2" :disabled="disabled"
                                :indeterminate2.sync="indeterminate2">

                            </b-form-checkbox>
                        </b-button>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="4" class="align-items-center justify-content-center">
                        <v-select v-model="form.type_identification" :disabled="disabled" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listIdentification" :reduce="val => val.value" placeholder="Tipo de identificación" />
                    </b-col>
                    <b-col cols="12" md="4" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.number_identify" v-if="form.type_identification == 1" :disabled="disabled" placeholder="Numero RNC" />
                        <b-form-input v-model="form.number_identify" v-else-if="form.type_identification == 2" :disabled="disabled" placeholder="Numero Cédula" />
                        <b-form-input v-model="form.number_identify" v-else-if="form.type_identification == 3" :disabled="disabled" placeholder="Numero" />
                        <b-form-input v-model="form.number_identify" v-else-if="form.type_identification == ''" placeholder="RNC o Cédula" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="4" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.full_name" :disabled="disabled"
                            placeholder="Razón social / nombre completo" />
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="6" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.address" placeholder="Dirección" :disabled="disabled" />
                    </b-col>

                    <b-col cols="12" md="6" class="align-items-center justify-content-center">
                        <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title"
                            :options="municipalies" v-model="form.province"  :disabled="disabled" :reduce="val => val.value" placeholder="Municipio / Provincia" />
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <h3 class="text-center">INFORMACIÓN DE CONTACTO</h3>
                    </b-col>
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <p class="mb-0 text-center">Agrega estos datos para comunicarte en cualquier momento con tu
                            contacto.</p>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <b-form-input placeholder="Correo electrónico" v-model="form.email_contact" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <b-form-input placeholder="Celular" v-model="form.mobil_contact" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <b-form-input placeholder="Teléfono 1" v-model="form.phone_one_contact" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <b-form-input placeholder="Teléfono 2" v-model="form.phone_two_contact" :disabled="disabled" />
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <h3 class="text-center">Personas asociadas</h3>
                    </b-col>
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <p class="mb-0 text-center">Vincula los datos de personas relacionadas a este contacto y activa
                            notificaciones de vencimiento para tus clientes.</p>
                    </b-col>
                </b-row>
                <div class="mt-3 mb-2" v-if="formItems">
                    <b-form ref="form" :style="{ height: trHeight }" class="repeater-form">

                        <!-- Row Loop -->
                        <b-row v-for="(item, index) in form.items" :id="item.id" :key="item.id" ref="row">

                            <b-col md="2">
                                <b-form-group label="Nombre/Razón social" label-for="Nombre/Razón social">
                                    <b-form-input v-model="form.items[index].bussiness_name" type="text" :disabled="disabled"
                                        placeholder="Nombre/Razón social" />
                                </b-form-group>
                            </b-col>


                            <b-col md="2">
                                <b-form-group label="Apellido" label-for="Apellido">
                                    <b-form-input v-model="form.items[index].last_name" placeholder="Apellido" :disabled="disabled" />
                                </b-form-group>
                            </b-col>


                            <b-col md="2">
                                <b-form-group label="Correo electrónico" label-for="Correo electrónico">
                                    <b-form-input v-model="form.items[index].email" placeholder="Correo electrónico" :disabled="disabled"/>
                                </b-form-group>
                            </b-col>


                            <b-col lg="2" md="2">
                                <b-form-group label="Teléfono" label-for="Teléfono">
                                    <b-form-input v-model="form.items[index].phone" placeholder="Teléfono" :disabled="disabled"/>
                                </b-form-group>
                            </b-col>
                            <b-col lg="2" md="2">
                                <b-form-group label="Celular" label-for="Celular">
                                    <b-form-input v-model="form.items[index].mobil" placeholder="Celular" :disabled="disabled"/>
                                </b-form-group>
                            </b-col>


                            <b-col lg="2" md="2" class="mb-50">
                                <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger" :disabled="disabled"
                                    class="mt-0 mt-md-2" @click="removeItem(index)">
                                    <feather-icon icon="XIcon" class="mr-25" />
                                    <span>Eliminar</span>
                                </b-button>
                            </b-col>
                            <b-col cols="12">
                                <hr>
                            </b-col>
                        </b-row>

                    </b-form>
                </div>
                <b-col cols="12" md="12" class="align-items-center justify-content-center d-flex mt-2">
                    <b-button class="text-center" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" :disabled="disabled"
                        @click="repeateAgain">
                        <feather-icon icon="PlusIcon" class="mr-25" />
                        <span>Agregar nuevo</span>
                    </b-button>
                </b-col>
                <b-row class="mt-2">
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <h3 class="text-center">INFORMACIÓN COMERCIAL</h3>
                    </b-col>
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <p class="mb-0 text-center">Agrega los datos administrativos y condiciones comerciales de tu
                            contacto.</p>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <v-select v-model="form.type_ncf" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listNfc" :reduce="val => val.value" placeholder="Tipo de NCF" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <v-select v-model="form.payment_deadline" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listDeadline" :reduce="val => val.value" placeholder="Plazo de pago" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <v-select v-model="form.list_price" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listPrice" :reduce="val => val.value" placeholder="Lista de precios" :disabled="disabled" />
                    </b-col>
                    <b-col cols="12" md="3" class="align-items-center justify-content-center">
                        <v-select v-model="form.seller" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listsellers" :reduce="val => val.value" placeholder="Vendedor" :disabled="disabled"/>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <h3 class="text-center">CONFIGURACIÓN PARA CONTABILIDAD</h3>
                    </b-col>
                    <b-col cols="12" md="12" class="align-items-center justify-content-center">
                        <p class="mb-0 text-center">Elige las cuentas contables que recibirán los movimientos de valores
                            pendientes de pago</p>
                    </b-col>
                </b-row>
                <b-row class="mt-2 mb-5">
                    <b-col cols="12" md="6" class="align-items-center justify-content-center">
                        <v-select v-model="form.receivable" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="accountsReceivable" :reduce="val => val.value" placeholder="Cuenta por cobrar" :disabled="disabled"/>
                    </b-col>
                    <b-col cols="12" md="6" class="align-items-center justify-content-center">
                        <v-select v-model="form.bill_to_pay" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="debtsToPay" :reduce="val => val.value" placeholder="Cuenta por pagar" :disabled="disabled"/>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center">
                        <b-button class="text-center" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" :disabled="disabled"
                            @click="formStore()">
                            <span>Guardar</span>
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-card><br>
    </div>
</template>
<script>
extend('required', {
    ...required,
    message: 'El campo {_field_} es obligatorio'
});
import { extend } from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
    BCard, BRow, BCol, BFormCheckbox, BButton, BFormInput, BForm, BFormGroup
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
export default {
    name: 'StoreContact',
    components: {
        BCard,
        BRow,
        BCol,
        BFormCheckbox,
        BButton,
        vSelect,
        BFormInput,
        BForm,
        BFormGroup
    },
    mixins: [heightTransition],
    data() {
        return {
            form: {
                type_identification: '',
                type_ncf: '',
                checked1: false,
                checked2: false,
                items: [],
                number_identify: '',
                full_name: '',
                address: '',
                province: '',
                email_contact: '',
                mobil_contact: '',
                phone_one_contact: '',
                phone_two_contact: '',
                list_price: '',
                seller: '',
                receivable: '',
                bill_to_pay: '',
            },
            id: this.$route.params.id,
            indeterminate1: true,
            indeterminate2: true,
            listIdentification: [],
            listNfc: [],
            listDeadline: [],
            listPrice: [],
            listsellers: [],
            accountsReceivable: [],
            debtsToPay: [],
            disabled: false,
            municipalies: [],
            showContacts: this.$route.params.showContacts,
            edit: this.$route.params.edit,
            formItems: false
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
        window.addEventListener('resize', this.initTrHeight)
        this.fetchMunicipalies()
        this.typeIdentification()
        this.typeNfc()
        this.listdeadline()
        this.listprice()
        this.listSellers()
        this.listaAcountsReceivable()
        this.listDebtsToPay()
        this.showContact()
        this.showContactEnabled()
    },
    destroyed() {
        window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
        formStore() {
            this.$http.post('/contact/store', this.form)
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
                        this.$router.push('/contacts/all');
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
        showContact() {
            if (this.id && this.showContacts) {
                this.$http.get('/' + this.id).then((response) => {
                    this.disabled = true;
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Client') {
                        this.form.checked1 = true;
                        this.form.checked2 = false;
                    }
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Provider') {
                        this.form.checked2 = true;
                        this.form.checked1 = false;
                    }
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Client' || response.data.contact.client_of_provider[1].client_of_provider == 'Provider') {
                        this.form.checked2 = true;
                        this.form.checked1 = true;
                    }
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Provider' || response.data.contact.client_of_provider[1].client_of_provider == 'Client') {
                        this.form.checked2 = true;
                        this.form.checked1 = true;
                    }
                    this.form.type_identification = response.data.contact.type_identification;
                    this.form.number_identify = response.data.contact.number_identification;
                    this.form.full_name = response.data.contact.reason;
                    this.form.address = response.data.contact.address;
                    this.form.province = response.data.contact.municipaly;
                    this.form.email_contact = response.data.contact.email;
                    this.form.mobil_contact = response.data.contact.mobil;
                    this.form.phone_one_contact = response.data.contact.phone1;
                    this.form.phone_two_contact = response.data.contact.phone2;
                    this.form.items = response.data.contact.associatePersons;
                    this.form.type_ncf = response.data.contact.type_nfc;
                    this.form.list_price = response.data.contact.price_list;
                    this.form.seller = response.data.contact.seller;
                    this.form.receivable = response.data.contact.receivable;
                    this.form.bill_to_pay = response.data.contact.bill_to_pay;
                    this.formItems = true;
                })
            } else {
                this.disabled = false;
                this.formItems = true;
            }
        },
        showContactEnabled() {
            if (this.id && this.edit) {
                this.$http.get('/contact/show/' + this.id).then((response) => {
                    this.disabled = false;
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Client') {
                        this.form.checked1 = true;
                        this.form.checked2 = false;
                    }
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Provider') {
                        this.form.checked2 = true;
                        this.form.checked1 = false;
                    }
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Client' || response.data.contact.client_of_provider[1].client_of_provider == 'Provider') {
                        this.form.checked2 = true;
                        this.form.checked1 = true;
                    }
                    if (response.data.contact.client_of_provider[0].client_of_provider == 'Provider' || response.data.contact.client_of_provider[1].client_of_provider == 'Client') {
                        this.form.checked2 = true;
                        this.form.checked1 = true;
                    }
                    this.form.type_identification = response.data.contact.type_identification;
                    this.form.number_identify = response.data.contact.number_identification;
                    this.form.full_name = response.data.contact.reason;
                    this.form.address = response.data.contact.address;
                    this.form.province = response.data.contact.municipaly;
                    this.form.email_contact = response.data.contact.email;
                    this.form.mobil_contact = response.data.contact.mobil;
                    this.form.phone_one_contact = response.data.contact.phone1;
                    this.form.phone_two_contact = response.data.contact.phone2;
                    this.form.items = response.data.contact.associatePersons;
                    this.form.type_ncf = response.data.contact.type_nfc;
                    this.form.list_price = response.data.contact.price_list;
                    this.form.seller = response.data.contact.seller;
                    this.form.receivable = response.data.contact.receivable;
                    this.form.bill_to_pay = response.data.contact.bill_to_pay;
                    this.formItems = true;
                })
            } else {
                this.disabled = false;
                this.formItems = true;
            }
        },
        fetchMunicipalies() {
            this.$http.get('municipaly/list').then((response) => {
                this.municipalies = response.data.municipalies
            })
        },
        typeIdentification() {
            this.$http.get('identification/list').then((response) => {
                this.listIdentification = response.data.listIdentification
            })
        },
        typeNfc() {
            this.$http.get('identification/listNfc').then((response) => {
                this.listNfc = response.data.listNfc
            })
        },
        listdeadline() {
            this.$http.get('identification/listDeadline').then((response) => {
                this.listDeadline = response.data.listDeadline
            })
        },
        listprice() {
            this.$http.get('identification/listPrice').then((response) => {
                this.listPrice = response.data.listPrice
            })
        },
        listSellers() {
            this.$http.get('identification/listSeller').then((response) => {
                this.listsellers = response.data.listSellers
            })
        },
        listaAcountsReceivable() {
            this.$http.get('identification/listAccountsReceivable').then((response) => {
                this.accountsReceivable = response.data.listAccountsReceivable
            })
        },
        listDebtsToPay() {
            this.$http.get('identification/listDebtsToPay').then((response) => {
                this.debtsToPay = response.data.debtsToPay
            })
        },
        toggleIndeterminate() {
            this.indeterminate1 = !this.indeterminate1;
            this.form.checked1 = true;
        },
        toggleIndeterminate2() {
            this.indeterminate2 = !this.indeterminate2
            this.form.checked2 = true;
        },
        repeateAgain() {
            this.form.items.push({
                bussiness_name: '',
                last_name: '',
                email: '',
                phone: '',
                mobil: ''
            })

            this.$nextTick(() => {
                this.trAddHeight(this.$refs.row[0].offsetHeight)
            })
        },
        removeItem(index) {
            this.form.items.splice(index, 1)
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
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style lang="scss" scoped>
.repeater-form {
    overflow: hidden;
    transition: .35s height;
}
</style>