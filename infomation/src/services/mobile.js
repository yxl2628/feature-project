import request from '../utils/request'
import {baseURL, apiURL} from '../utils/config'

/**
 * 用户登录
 * @param  {Object} payload 登录所需参数：用户名、密码
 * @return {Promise}         返回登录信息
 */
export function getMenuList() {
  return request({
    url: baseURL + '/data/categories.json?v=' + new Date().getTime(),
    method: 'GET',
    params: {}
  })
}
export function getNewsList({enName}) {
  return request({
    url: baseURL + '/data/' + enName + '.json?v=' + new Date().getTime(),
    method: 'GET',
    params: {}
  })
}
export function getInfoPraiseReading({category, infoCodes}) {
  return request({
    url: apiURL + '/info/praise-reading/',
    method: 'POST',
    body: [
      {
        "categoryCode": category,
        "infoCodes": infoCodes
      }
    ]
  })
}
export function infoPraiseReadingShare({category, id, type}) {
  return request({
    url: apiURL + `/info/praise/reading/?categoryCode=${category}&infoCode=${id}&type=${type}&terminalType=wap`,
    method: 'POST',
    params: {}
  })
}
export function getVoteItems({ids}) {
  return request({
    url: apiURL + `/vote/vote-items/?ids=${ids}`,
    method: 'GET',
    params: {}
  })
}
export function voteItems({voteCode, itemCode}) {
  return request({
    url: apiURL + `/vote/${voteCode}/vote-items/${itemCode}`,
    method: 'POST',
    params: {}
  })
}
