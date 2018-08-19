import request from '../utils/request'
import { baseURL, api } from '../utils/config'

/**
 * 用户登录
 * @param  {Object} payload 登录所需参数：用户名、密码
 * @return {Promise}         返回登录信息
 */
export function getMenuList() {
  return request({
    url: baseURL + api.getMenuList,
    method: 'GET',
    params:{}
  })
}
export function getNewsList({key}) {
  return request({
    url: baseURL + '/' + key + '.json',
    method: 'GET',
    params:{}
  })
}
