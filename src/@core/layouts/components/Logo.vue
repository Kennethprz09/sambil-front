<template>
  <div class="w-100 d-lg-flex align-items-center justify-content-center">
    <b-img
      fluid
      :src="imgLogo"
      alt="logo sambil"
    />
  </div>
</template>
<script>
import { 
  BImg, 
} from 'bootstrap-vue'
export default {
  components: {
    BImg,
  },
  data() {
    return {
      imgLogo: require('@/assets/images/logo/sambil-logo.png'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.imgLogo = require('@/assets/images/logo/sambil-logo-blanco.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
}
</script>
