import request from '@/utils/request'

/**
 * 登录
 */
export const login = data => {
  return request({
    url: '/api/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
 export const getUserInfo = () => {
  return request({
    url: '/api/sys/profile'
  })
}

/**
 * 获取图片数据列表
 */
export const getPexelsList = (data) => {
  return request({
    url: '/font/pexels/list',
    params: data
  })
}