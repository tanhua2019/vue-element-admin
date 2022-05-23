import { login } from '@/api/login'
import md5 from 'md5'

export default {
  namespaced: true,
  state: {
    token: sessionStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
      sessionStorage.setItem('token', payload)
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(res => {
            commit('setToken', res.data.data.token)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
