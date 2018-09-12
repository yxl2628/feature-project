import request from '../utils/request'
import { baseURL} from '../utils/config'

/**
 * 用户登录
 * @param  {Object} payload 登录所需参数：用户名、密码
 * @return {Promise}         返回登录信息
 */
export function getMenuList() {
  return request({
    url: baseURL + '/menu.json?v=' + new Date().getTime(),
    method: 'GET',
    params:{}
  })
}
export function getNewsList({key}) {
  return request({
    url: baseURL + '/' + key + '.json?v=' + new Date().getTime(),
    method: 'GET',
    params:{}
  })
}
