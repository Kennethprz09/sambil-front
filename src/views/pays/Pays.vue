<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>

  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <!-- Filter -->
      <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="3"
            class=""
          >
            <label>Mostrar</label>
            <v-select
              v-model="tableSettings.perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>registros</label>
          </b-col>

          <b-col md="2">
            <b-form-group>
              <v-select
                v-model="tableSettings.input"
                class="d-inline"
                label="title"
                :options="inputs"
                :reduce="val => val.value"
                placeholder="Título"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <v-select
                v-model="tableSettings.typeSearch"
                class="d-inline"
                label="title"
                :options="typeSearch"
                :reduce="val => val.value"
                placeholder="Tipo de búsqueda"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <b-form-input
                v-model="tableSettings.searchQuery"
                class="d-inline"
                style="width: 90%"
                placeholder="Buscar..."
              />
            </b-form-group>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="1"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-button
                variant="primary"
                class="btn-icon rounded-circle mr-1"
              >
                <feather-icon icon="SearchIcon" />
              </b-button>

              <b-button
                variant="primary"
                class="btn-icon rounded-circle mr-1"
                @click="newPay()"
              >
                <feather-icon icon="PlusIcon" />
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <!-- table -->
      <b-table
        ref="refContactListTable"
        class="position-relative"
        :items="pays"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="tableSettings.sortBy"
        show-empty
        empty-text="No se encontraron datos"
        :sort-desc.sync="tableSettings.sortDesc"
      >

        <template #cell(expiration)="data">
          <b-badge
            v-if="(data.item.status == 'payable')"
            variant="danger"
          >
            {{ data.item.expiration }}
          </b-badge>
          <b-badge
            v-else-if="(data.item.status == 'paid')"
            variant="success"
          >
            {{ data.item.expiration }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <div class="d-flex">
            <b-button
              v-b-tooltip.hover.v-primary
              variant="info"
              class="btn-icon rounded-circle ml-2"
              title="Ver"
              @click="showPay(data)"
            >
              <feather-icon
                icon="EyeIcon"
              />

            </b-button>

            <b-button
              v-b-tooltip.hover.v-primary
              variant="success"
              class="btn-icon rounded-circle ml-2"
              title="Editar"
              @click="editPay(data)"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
            <b-button
              v-b-tooltip.hover.v-primary
              variant="warning"
              class="btn-icon rounded-circle ml-2"
              title="anular"
              @click="cancelPay(data)"
            >
              <feather-icon icon="XIcon" />
            </b-button>
            <b-button
              v-b-tooltip.hover.v-primary
              variant="danger"
              class="btn-icon rounded-circle ml-2"
              title="Eliminar"
              @click="deletePay(data)"
            >
              <feather-icon icon="Trash2Icon" />
            </b-button>
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Viendo del {{ dataMeta.from }} al {{ dataMeta.to }} de {{
              dataMeta.of
            }}
              registros</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="tableSettings.page"
              :total-rows="totalRows"
              :per-page="tableSettings.perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  extend,
} from 'vee-validate'
import { required } from '@validations'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable,
  BBadge, BPagination, BFormGroup, VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

extend('required', {
  ...required,
  message: 'El campo {_field_} es obligatorio',
})

export default {
  name: 'Facturas',
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,

    BBadge,

    BPagination,
    vSelect,
    BFormGroup,

  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      refContactListTable: null,
      perPageOptions: [10, 25, 50, 100],
      searchQuery: '',
      inputs: [
        { value: 'id', title: 'Id' },
        { value: 'client', title: 'Cliente' },
        { value: 'detail', title: 'Detalle' },
        { value: 'created', title: 'Creacion' },
        { value: 'account', title: 'Cuenta' },
        { value: 'status', title: 'Estado' },
        { value: 'amount', title: 'Monto' },
      ],
      typeSearch: [
        { value: 'LIKE', title: 'Igual' },
        { value: 'NOT LIKE', title: 'No es igual' },
        { value: '>', title: 'Mayor que' },
        { value: '<', title: 'Menor que' },
      ],
      tableColumns: [
        { key: 'id', label: 'Numero', sortable: true },
        { key: 'client_name', label: 'Cliente' },
        { key: 'detail', label: 'Detalle', sortable: true },
        { key: 'created', label: 'Creación' },
        { key: 'account_name', label: 'Cuenta' },
        { key: 'status', label: 'Estado' },
        { key: 'amount', label: 'Monto' },
        { key: 'actions', label: 'Acciones' },
      ],

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
        filter: this.$route.params && this.$route.params.id,
        searchQuery: '',
        input: '',
        typeSearch: '',
        perPage: 1,
        page: 1,
        sortBy: 'id',
        sortDesc: true,
      },

      pays: [],
    }
  },
  watch: {
    'tableSettings.sortBy': {

      handler() {
        this.fetchPays()
      },
    },
    'tableSettings.sortDesc': {
      handler() {
        this.fetchPays()
      },
    },
    'tableSettings.perPage': {
      handler() {
        this.fetchPays()
      },
    },
    'tableSettings.searchQuery': {
      handler() {
        this.fetchPays()
      },
    },
    'tableSettings.page': {
      handler() {
        this.fetchPays()
      },
    },

  },
  created() {
    this.fetchPays()
  },
  methods: {

    async fetchPays() {
      try {
        const payList = await this.$http.get('pays/list', { params: this.tableSettings })
        const objRes = payList.data
        this.totalRows = objRes.total
        this.pays = objRes.pays
      } catch (error) {
        console.error(error)
      }
    },
    newPay() {
      this.$router.push('/pay/store')
    },
    showPay(data) {
      this.$router.push(`/pay/show/${data.index}`)
    },
    editPay(data) {
      this.$router.push(`/pay/edit/${data.index}`)
    },
    cancelPay(data) {
      console.log(`cancel Pay ${data.index}`)
    },
    deletePay(data) {
      console.log(`delete Pay ${data.index}`)
    },
    dataMetaCounter() {
      const localItemsCount = this.dataTable.length
      this.dataMeta.from = this.tableSettings.perPage * (this.tableSettings.page - 1) + (localItemsCount ? 1 : 0)
      this.dataMeta.to = this.tableSettings.perPage * (this.tableSettings.page - 1) + localItemsCount
      this.dataMeta.of = this.totalRows
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
