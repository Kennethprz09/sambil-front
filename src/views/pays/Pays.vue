<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>

  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
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
          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-button variant="primary">
                <span
                  class="text-nowrap"
                  @click="newInvoice()"
                >Nuevo Pago</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>
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

        <template #cell(status)="data">
          <b-badge
            v-if="(data.item.status == 'Por cobrar')"
            variant="danger"
          >
            {{ data.item.status }}
          </b-badge>
          <b-badge
            v-else-if="(data.item.status == 'Cobrado')"
            variant="success"
          >
            {{ data.item.status }}
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
            >
              <feather-icon icon="EyeIcon" />
            </b-button>

            <b-button
              v-b-tooltip.hover.v-primary
              variant="success"
              class="btn-icon rounded-circle ml-2"
              title="Editar"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
            <b-button
              v-b-tooltip.hover.v-primary
              variant="warning"
              class="btn-icon rounded-circle ml-2"
              title="Imprimir"
            >
              <feather-icon icon="PrinterIcon" />
            </b-button>
            <b-button
              v-b-tooltip.hover.v-primary
              variant="danger"
              class="btn-icon rounded-circle ml-2"
              title="Eliminar"
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
  extend, ValidationProvider, ValidationObserver, localize,
} from 'vee-validate'
import { required } from '@validations'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BFormGroup, BForm, VBTooltip,
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
      tableColumns: [
        { key: 'id', label: 'Numero', sortable: true },
        { key: 'client', label: 'Cliente' },
        { key: 'detail', label: 'Detalle', sortable: true },
        { key: 'created', label: 'Creación' },
        { key: 'account', label: 'Cuenta' },
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
        searchQuery: '',
        perPage: 10,
        page: 1,
        sortBy: 'id',
        sortDesc: true,
      },
      pays: [],
    }
  },
  watch: {
    'tableSettings.sortBy': {

      handler(val) {
        this.fetchPays()
      },
    },
    'tableSettings.sortDesc': {
      handler(val) {
        this.fetchPays()
      },
    },
    'tableSettings.perPage': {
      handler(val) {
        this.fetchPays()
      },
    },
    'tableSettings.searchQuery': {
      handler(val) {
        this.fetchPays()
      },
    },
    'tableSettings.page': {
      handler(val) {
        this.fetchPays()
      },
    },
  },
  created() {
    this.fetchPays()
  },
  methods: {
    fetchPays() {
      // this.$http.get('invoice/list').then(response => {
      // this.invoices = response.data.invoices

      // })
      this.pays = [{
        id: '1',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'payable',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '2',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '3',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'done',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '4',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '5',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '6',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '7',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '8',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '9',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '10',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '11',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'paid',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },
      {
        id: '12',
        client: 'Carlos Montes',
        detail: 'Iphone PRo',
        created: '21/09/1998',
        account: 'Banco 1',
        status: 'done',
        amount: '$ 4.500.000',
        actions: 'Acciones',
      },

      ]
    },
    newInvoice() {
      this.$router.push('/pay/store')
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
