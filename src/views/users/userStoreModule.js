import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/user/index', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/user/users/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/user/users', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    roleOptions() {
      return new Promise((resolve, reject) => {
        axios
          .get('/roles/list')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    agencyOptions() {
      return new Promise((resolve, reject) => {
        axios
          .get('/agencies/list')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
