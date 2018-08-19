import errorCode from './error'
import CryptoJS from 'crypto-js'
/**
 * 获取字符串的字节码
 * @param  {String} _str
 * @return {Array}
 */
export function getBytes(_str){
  var bytes = []
  for (var i = 0; i < _str.length; i++) {
    bytes[i] = _str.charCodeAt(i)
  }
  return bytes
}
/**
 * 处理服务器错误
 * @param  {Json} response 返回response
 * @return {String}          反馈错误信息
 */
export function handleError(code){
  if (code) {
    return errorCode[code]
  }
}
/**
 * 获取info信息
 * @return {Object}
 */
export function getInfo(){
  const _info = sessionStorage.getItem('_info')
  if (_info) {
    const bytes = CryptoJS.AES.decrypt(_info.toString(), 'startimes ott')
    const info = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return info
  } else {
    return null
  }
}
