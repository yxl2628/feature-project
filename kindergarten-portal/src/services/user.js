import request from '../utils/request'
import { baseURL, api } from '../utils/config'
import CryptoJS from 'crypto-js'

/**
 * 用户登录
 * @param  {Object} payload 登录所需参数：用户名、密码
 * @return {Promise}         返回登录信息
 */
export function login({ account, password }) {
  return request({
    url: baseURL + api.systemUserLogin,
    method: 'POST',
    params:{
      account,
      password: CryptoJS.MD5(password).toString(),
      device_type: "pc-web"
    }
  })
}
