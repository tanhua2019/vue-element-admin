import { login, getUserInfo } from '@/api/user'
import { setTimeStamp } from '@/utils/loginTime'
import md5 from 'md5'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: sessionStorage.getItem('token') || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
      sessionStorage.setItem('token', payload)
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    loginOut(state) {
      state.token = ''
      state.userInfo = {}
      sessionStorage.clear()
      router.push('/login')
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
            setTimeStamp()
            commit('setToken', res.data.token)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      commit('setUserInfo', res.data)
      return res
    }
  }
}
