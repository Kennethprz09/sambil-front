import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'http://localhost/api/',
  baseURL: 'https://sambil-backend.test/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
// probando

Vue.prototype.$http = axiosIns

export default axiosIns
