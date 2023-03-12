<template>
    <div>
        <b-card title="Nueva numeración">
            <b-row>
                <b-col sm="6">
                    <b-form-group>
                        <v-select v-model="form.typeDocument" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title" :options="typeDocuments" placeholder="Tipo de documento" />
                    </b-form-group>
                </b-col>
                <b-col sm="6"
                    v-if="form.typeDocument.value == 1 || form.typeDocument.value == 2 || form.typeDocument.value == 3 || form.typeDocument.value == 4 || form.typeDocument.value == 5 || form.typeDocument.value == null">
                    <b-form-group>
                        <v-select v-model="form.type" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title"
                            :options="types" placeholder="Tipo" />
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group>
                        <b-form-input v-model="form.name" placeholder="Nombre" />
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group>
                        <b-form-input v-model="form.number" placeholder="Numero Inicial" />
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group>
                        <b-form-input v-model="form.prefix" placeholder="Prefijo" />
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group>
                        <b-form-input v-model="form.branch" placeholder="Sucursal" />
                    </b-form-group>
                </b-col>
                <b-col sm="6"
                    v-if="form.typeDocument.value == 1 || form.typeDocument.value == 2 || form.typeDocument.value == 3 || form.typeDocument.value == 4 || form.typeDocument.value == 5 || form.typeDocument.value == null">
                    <b-form-group>
                        <flat-pickr v-model="form.date_expired" class="form-control" placeholder="Fecha de vencimiento" />
                    </b-form-group>
                </b-col>
                <b-col sm="12" class="text-center">
                    <b-form-group class="text-center">
                        <h5>Preferida</h5>
                        <div class="demo-inline-spacing justify-content-center">
                            <b-form-radio v-model="form.favorite" :value="true">
                                Si
                            </b-form-radio>
                            <b-form-radio v-model="form.favorite" :value="false">
                                No
                            </b-form-radio>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col sm="12" class="text-center">
                    <div class="demo-inline-spacing justify-content-center">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" @click="cancelNumber()">
                            Cancelar
                        </b-button>
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="storeNumber()">
                            Guardar
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
  
<script>
import { BCard, BFormGroup, BCol, BRow, BFormInput, BFormRadio, BButton } from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
export default {
    components: {
        BCard,
        BFormGroup,
        vSelect,
        BCol,
        BRow,
        BFormInput,
        flatPickr,
        BFormRadio,
        BButton
    },
    data() {
        return {
            form: {
                typeDocument: '',
                type: '',
                name: '',
                number: '',
                prefix: '',
                branch: '',
                date_expired: '',
                favorite: false
            },
            typeDocuments: [],
            types: []
        }
    },
    created() {
        this.fetchTypeDocuments();
    },
    watch: {
        'form.typeDocument.value'(val) {
            this.fetchType(val);
        }
    },
    methods: {
        fetchTypeDocuments() {
            this.$http.get('/typeDocuments/list').then(response => {
                this.typeDocuments = response.data.typeDocuments;
            });
        },
        fetchType(id) {
            this.$http.get('/typeDocuments/listType/' + id).then(response => {
                this.types = response.data.types;
            });
        },
        cancelNumber() {
            this.$router.push('/settings-numbers');
        },
        storeNumber() {
            this.$http.post('/typeDocuments/store', this.form)
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
                        this.$router.push('/settings-numbers');
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
    directives: {
        Ripple,
    },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
  