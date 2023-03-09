<template>

    <div>
        <!-- Table Container Card -->
        <b-card no-body class="mb-0">

            <div class="m-2">

                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="3" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                        <label>Mostrar</label>
                        <v-select v-model="tableSettings.perPage" :options="perPageOptions" :clearable="false"
                            class="per-page-selector d-inline-block mx-50" />
                        <label>registros</label>
                    </b-col>

                    <b-col md="2">
                        <b-form-group>
                            <v-select class="d-inline" v-model="tableSettings.input"
                            label="title" :options="inputs" :reduce="val => val.value" placeholder="Título" />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group>
                            <v-select class="d-inline" v-model="tableSettings.typeSearch"
                            label="title" :options="typeSearch" :reduce="val => val.value" placeholder="Tipo de búsqueda"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group>  
                            <b-form-input v-model="tableSettings.searchQuery" class="d-inline" style="width: 90%" placeholder="Buscar..." />
                        </b-form-group>
                    </b-col>
                    <!-- Search -->
                    <b-col cols="12" md="1">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-button variant="primary" @click="fetchInvoices" class="btn-icon rounded-circle mr-1">
                                <feather-icon icon="SearchIcon" />
                            </b-button>
                            <b-button variant="primary" class="btn-icon rounded-circle mr-1" @click="newInvoice()">
                                <feather-icon icon="PlusIcon" />
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <b-table ref="refContactListTable" class="position-relative" :items="invoices" responsive
                :fields="tableColumns" primary-key="id" :sort-by.sync="tableSettings.sortBy" show-empty
                empty-text="No se encontraron datos" :sort-desc.sync="tableSettings.sortDesc">
                <template #cell(total)="data">
                        $RD{{ new Intl.NumberFormat('es-RD', { maximumSignificantDigits: 6 }).format(data.item.total) }}
                </template>

                <template #cell(expiration)="data">
                    <b-badge variant="danger" v-if="(data.item.expiration <= dateFormat)">
                        {{ data.item.expiration }}
                    </b-badge>
                    <b-badge variant="success" v-else-if="(data.item.expiration > dateFormat)">
                        {{ data.item.expiration }}
                    </b-badge>
                </template>
                
                <!-- Column: Actions -->
                <template #cell(actions)="data">
                    <div class="d-flex">
                        <b-button variant="primary" class="btn-icon rounded-circle ml-2" v-b-tooltip.hover.v-primary
                            title="Ver" @click="viewInvoice(data.item.id)">
                            <feather-icon icon="EyeIcon" />
                        </b-button>
                        <b-button variant="warning" class="btn-icon rounded-circle ml-2" v-b-tooltip.hover.v-primary title="Editar" @click="editInvoice(data.item.id)">
                            <feather-icon icon="EditIcon" />
                        </b-button>
                        <b-button variant="danger" class="btn-icon rounded-circle ml-2" :id="`form-item-settings-icon-${data.item.id}`">
            <feather-icon  
              size="16"
              icon="TrashIcon"
              class="cursor-pointer"
            />
            <b-popover
              :ref="`form-item-settings-popover-${data.item.id}`"
              :target="`form-item-settings-icon-${data.item.id}`"
              triggers="click"
              placement="lefttop"
            >
              <b-form @submit.prevent>
                <b-row>
                  <b-col cols="12">
                    <p>¡Esta a punto de eliminar esta factura!</p>
                  </b-col>
                  <b-col
                    cols="12"
                    class="d-flex justify-content-between mt-1"
                  >
                    <b-button
                      variant="outline-danger"
                      @click="deleteContact(data.item.id)"
                    >
                      Eliminar
                    </b-button>
                    <b-button
                      variant="outline-secondary"
                      @click="() => {$refs[`form-item-settings-popover-${data.item.id}`].$emit('close')}"
                    >
                      Cancelar
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-popover>
          </b-button>
                    </div>
                </template>
            </b-table>
            <div class="mx-2 mb-2">
                <b-row>

                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Viendo del {{ dataMeta.from }} al {{ dataMeta.to }} de {{
                            dataMeta.of
                        }}
                            registros</span>
                    </b-col>
                    <!-- Pagination -->
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end">

                        <b-pagination v-model="tableSettings.page" :total-rows="totalRows"
                            :per-page="tableSettings.perPage" first-number last-number class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item" next-class="next-item">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
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
import {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BFormGroup, BForm, VBTooltip,BPopover
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
export default {
    name: 'Facturas',
    components: {
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
        vSelect,
        BFormGroup,
        BForm,
        ValidationProvider,
        ValidationObserver,
        VBTooltip,
        BPopover
    },
    data() {
        return {
            refContactListTable: null,
            perPageOptions: [10, 25, 50, 100],
            searchQuery: '',
            tableColumns: [
                { key: 'id', label: 'Id', sortable: true },
                { key: 'identification', label: 'NCF/Número', sortable: true },
                { key: 'client', label: 'Cliente' },
                { key: 'created', label: 'Creación' },
                { key: 'expiration', label: 'Vencimiento' },
                { key: 'total', label: 'Total' },
                { key: 'actions', label: 'Acciones' },
            ],
            date : new Date(),
            dateFormat:'',
            sortBy: 'id',
            isSortDirDesc: true,
            totalRows: 0,
            dataMeta: {
                from: 0,
                to: 0,
                of: 0,
            },
            dataTable: [],
            showLoadingTable: false,
            tableSettings: {
                searchQuery: '',
                input: '',
                typeSearch: '',
                perPage: 10,
                page: 1,
                sortBy: 'id',
                sortDesc: true,
            },
            invoices: [],
            inputs: [
                { value: 'invoices.id', title: 'Id' },
                { value: 'number_identification', title: 'Ncf/Número' },
                { value: 'reason', title: 'Cliente' },
                { value: 'invoices.created', title: 'Creación' },
                { value: 'invoices.expiration', title: 'Vencimiento' },
                { value: 'total', title: 'Total' },
            ],
            typeSearch: [
                { value: 'LIKE', title: 'Igual' },
                { value: 'NOT LIKE', title: 'No es igual' },
                { value: '>', title: 'Mayor que' },
                { value: '<', title: 'Menor que' }
            ],
        }
    },
    directives: {
        Ripple,
        'b-tooltip': VBTooltip,
    },
    watch: {
        "tableSettings.sortBy": {
            handler(val) {
                this.fetchInvoices()
            },
        },
        "tableSettings.sortDesc": {
            handler(val) {
                this.fetchInvoices()
            },
        },
        "tableSettings.perPage": {
            handler(val) {
                this.fetchInvoices()
            },
        },
        "tableSettings.page": {
            handler(val) {
                this.fetchInvoices()
            },
        },
        "tableSettings.input": {
            handler(val) {
                 this.resetFilter(val)
            },
        },
        "tableSettings.typeSearch": {
            handler(val) {
                 this.resetFilter(val)
            },
        },
    },
    created() {
        this.fetchInvoices();
    },
    methods: {
    fetchInvoices() {
        this.$http.get('invoice/list', { params: this.tableSettings }).then((response) => {
        this.invoices = response.data.invoices
        this.totalRows = response.data.total;
        this.dataMetaCounter(response.data.invoices.length);
        this.dateFormat = this.date.getFullYear()+"-"+this.padTo2Digits(this.date.getMonth() + 1)+"-"+this.padTo2Digits(this.date.getDate())
        })
    },
    newInvoice() {
        this.$router.push('/invoice/store');
    },
    dataMetaCounter(dataTable) {
        const localItemsCount = dataTable
        this.dataMeta.from = this.tableSettings.perPage * (this.tableSettings.page - 1) + (localItemsCount ? 1 : 0);
        this.dataMeta.to = this.tableSettings.perPage * (this.tableSettings.page - 1) + localItemsCount;
        this.dataMeta.of = this.totalRows;
    },
    padTo2Digits(num) {
    return num.toString().padStart(2, '0');
    },
    viewInvoice(id){
    this.$router.push({name:'invoice-view',params: {id}});
    },
    editInvoice(id){
    this.$router.push({name:'invoice-edit',params: {id}});
    },
    deleteContact(id) {
      this.$http.get('invoice/delete/' + id)
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
            this.fetchInvoices();
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
    resetFilter(val){
        if(val === '' || val== null){
            this.tableSettings = {
                searchQuery: '',
                input: '',
                typeSearch: '',
                perPage: 10,
                page: 1,
                sortBy: 'id',
                sortDesc: true,
            }
            this.fetchInvoiceProvider();
        }
    }
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