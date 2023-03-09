<template>
  <div>
    <b-card
      no-body
      class="mb-0"
    >
      <table-products-services />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import TableProductsServices from './TableProductsServices.vue'

export default {
  name: 'InventoryProductsServicesIndex',
  components: {
    TableProductsServices,
    BCard,
  },
}
</script>
