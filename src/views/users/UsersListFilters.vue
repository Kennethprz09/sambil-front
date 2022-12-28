<template>
  <div>
    <v-select
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
      :value="roleFilter"
      :options="roleOptions"
      placeholder="Roles"
      class="w-100"
      :reduce="val => val.value"
      @input="(val) => $emit('update:roleFilter', val)"
    />
  </div>
        
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  props: {
    roleFilter: {
      type: [String, null],
      default: null,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
