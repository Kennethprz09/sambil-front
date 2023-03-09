<template>
    <div>
        <b-card no-body class="mb-5 mt-0">
            <div class="m-2">
                <b-row>
                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center mb-1 mb-md-0">
                        <h3 class="text-center">Nuevo Inventario</h3>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="12" class="d-flex align-items-center justify-content-center mb-1 mb-md-0">
                        <p>Crea los bienes y mercancías que vendes e indica si deseas tener el control de tu inventario.</p>
                    </b-col>
                </b-row>
                
                <b-row class="mt-2 justify-content-md-center">
                    <b-col cols="12" md="5" class="d-flex align-items-center justify-content-center ">
                        <b-form-input v-model="form.full_name" :disabled="disabled"
                            placeholder="Nombre" />
                    </b-col>
                    <b-col cols="12" md="5" class="align-items-center justify-content-center">
                        <v-select v-model="form.unity" :disabled="disabled" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listUnityOptions" :reduce="val => val.value" placeholder="Unidad" />
                    </b-col>
                </b-row>
                <b-row class="mt-2 justify-content-md-center">
                    <b-col cols="12" md="4" class="align-items-center justify-content-center">
                        <v-select v-model="form.wineCellar" :disabled="disabled" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listWineCellarOptions" :reduce="val => val.value" placeholder="Bodega" />
                    </b-col>
                    <b-col cols="12" md="3" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.quantity" :disabled="disabled"
                            placeholder="Cantidad" />
                    </b-col>
                    <b-col cols="12" md="3" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.initialcost" :disabled="disabled"
                            placeholder="Costo Inicial - $0.000" />
                    </b-col>
                </b-row>
                <b-row class="mt-2 justify-content-md-center">
                    <b-col cols="12" md="4" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.basePrice" :disabled="disabled"
                            placeholder="Precio Base - $0.000" />
                    </b-col>
                    <b-col cols="1" md="1" class="align-items-center justify-content-center d-flex">
                            <feather-icon icon="PlusIcon" class="mr-25" />
                    </b-col>
                    <b-col cols="12" md="2" class="align-items-center justify-content-center">
                        <v-select v-model="form.tax" :disabled="disabled" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="listTaxOptions" :reduce="val => val.value" placeholder="Impuesto" />
                    </b-col>
                    <b-col cols="1" md="1" class="align-items-center justify-content-center d-flex">
                            <feather-icon icon="ArrowRightIcon" class="mr-1" />
                    </b-col>
                    <b-col cols="12" md="2" class="d-flex align-items-center justify-content-center">
                        <b-form-input v-model="form.finalcost" disabled
                            placeholder="Precio Total" />
                    </b-col>
                </b-row>
                <b-row class="mt-2 justify-content-md-center">
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
    BCard, BRow, BCol, BButton, BFormInput, BForm, BFormGroup
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
export default {
    name: 'NewInventory',
    components: {
        BCard,
        BRow,
        BCol,
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
                full_name: '',
                unity: '',
                wineCellar: '',
                quantity: '',
                initialcost: '',
                basePrice: '',
                tax: '',
                finalcost: '', 
            },
            id: this.$route.params.id,
            listUnityOptions: [],
            listWineCellarOptions: [],
            listTaxOptions: [],
            disabled: false,
        }
    },
    mounted() {
        this.initTrHeight()
    },
    directives: {
        Ripple,
    },
    watch: {
        "form.basePrice"(val) {
            this.writeFinalCost(val)
        },
    },
    created() {
        window.addEventListener('resize', this.initTrHeight)
        //this.listUnity()
        //this.listWineCellar()
        //this.listTax()
        //this.listaAcountsReceivable()
        //this.showContact()
        //this.showContactEnabled()
    },
    destroyed() {
        window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
        formStore() {
            if(this.edit){
                this.$http.post('/contact/edit/' + this.id, this.form)
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
            }else{
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
            }
        },
        showContact() {
            if (this.id && this.showContacts) {
                this.$http.get('/contact/show/' + this.id).then((response) => {
                    this.disabled = true;
                    this.form.full_name = response.data.inventory.full_name;
                    this.form.unity = response.data.inventory.unity;
                    this.form.wineCellar = response.data.inventory.wineCellar;
                    this.form.quantity = response.data.inventory.quantity;
                    this.form.initialcost = response.data.inventory.initialcost;
                    this.form.tax = response.data.inventory.tax;
                    this.form.finalcost = response.data.inventory.finalcost;
                    this.form.items = response.data.contact.associatePersons;
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
                    this.form.full_name = response.data.inventory.full_name;
                    this.form.unity = response.data.inventory.unity;
                    this.form.wineCellar = response.data.inventory.wineCellar;
                    this.form.quantity = response.data.inventory.quantity;
                    this.form.initialcost = response.data.inventory.initialcost;
                    this.form.tax = response.data.inventory.tax;
                    this.form.finalcost = response.data.inventory.finalcost;
                    this.formItems = true;
                })
            } else {
                this.disabled = false;
                this.formItems = true;
            }
        },
        listUnity() {
            this.$http.get('identification/listUnity').then((response) => {
                this.listUnityOptions = response.data.listUnity
            })
        },
        listWineCellar() {
            this.$http.get('identification/listWineCellar').then((response) => {
                this.listWineCellarOptions = response.data.listWineCellar
            })
        },
        listTax() {
            this.$http.get('identification/listTax').then((response) => {
                this.listTaxOptions = response.data.listTax
            })
        },
        listaAcountsReceivable() {
            this.$http.get('identification/listAccountsReceivable').then((response) => {
                this.accountsReceivable = response.data.listAccountsReceivable
            })
        },
        writeFinalCost(val) {
            this.form.finalcost = val
        },
        repeateAgain() {
            this.form.items.push({
                id: null,
                bussiness_name: '',
                last_name: '',
                email: '',
                phone: '',
                mobil: ''
            })

    
        },
        initTrHeight() {
            this.trSetHeight(null)
            
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