import errorCode from './error'
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
