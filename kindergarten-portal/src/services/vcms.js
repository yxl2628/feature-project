import request from '../utils/request'
import { baseURL, api } from '../utils/config'
import { getInfo } from '../utils'

/**
 * 用户登录
 * @param  {Object} payload 登录所需参数：用户名、密码
 * @return {Promise}         返回登录信息
 */
export function getEpgList({ start_time_from, start_time_to }) {
  const info = getInfo()
  return request({
    url: baseURL + api.getEpgList.replace('*', window.channelId),
    method: 'GET',
    params:{
      token: info.token,
      start_time_from,
      start_time_to
    }
  })
}
