import store from '@/store'
import axios from 'axios'
import md5 from 'md5'
import { isTimeOut } from '@/utils/loginTime'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time

    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
      // 用户被动退出主动处理
      if (isTimeOut()) {
        store.commit('user/loginOut')
        ElMessage.error('token 失效')
        return Promise.reject(new Error('token 失效'))
      }
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 相应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  error => {
    // 用户被动退出被动处理： token过期、单点登录
    if (error.response?.data?.code === 401) {
      store.commit('user/loginOut')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

/**
 * 返回 Icode 的实现
 */
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}

export default service
