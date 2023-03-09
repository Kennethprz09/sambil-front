<template>
  <div>
    <b-card
      no-body
      class="mb-0"
    >
      <table-component />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import TableComponent from './TableComponent.vue'

export default {
  name: 'InventoryProductsServicesIndex',
  components: {
    TableComponent,
    BCard,
  },
}
</script>
