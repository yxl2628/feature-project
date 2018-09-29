import errorCode from './error'
import NativeShare from 'nativeshare'
// import CryptoJS from 'crypto-js'
import { ActionSheet } from 'antd-mobile'
import ShareMessage from '../components/ShareMessage'

const nativeShare = new NativeShare()

/**
 * 获取字符串的字节码
 * @param  {String} _str
 * @return {Array}
 */
// function getBytes(_str){
//   var bytes = []
//   for (var i = 0; i < _str.length; i++) {
//     bytes[i] = _str.charCodeAt(i)
//   }
//   return bytes
// }
/**
 * 处理服务器错误
 * @param  {Json} response 返回response
 * @return {String}          反馈错误信息
 */
function handleError(code){
  if (code) {
    return errorCode[code]
  }
}
/**
 * 获取info信息
 * @return {Object}
 */
// function getInfo(){
//   const _info = sessionStorage.getItem('_info')
//   if (_info) {
//     const bytes = CryptoJS.AES.decrypt(_info.toString(), 'startimes ott')
//     const info = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
//     return info
//   } else {
//     return null
//   }
// }

function share(item) {
  if (window.navigator.userAgent.indexOf('MicroMessenger') >= 0) {
    const div = document.createElement("div")
    div.setAttribute('class', 'share_wechat')
    div.innerHTML = '<img src="/static/share_wechat.png" /><div class="close">关闭</div>'
    document.body.appendChild(div)
    div.addEventListener('click', function() {
      this.parentNode.removeChild(this)
    })
  } else {
    nativeShare.setShareData({
      icon: '//www.chabao123.com/static/share_logo.jpg',
      link: item.url,
      title: item.title,
      desc: 'www.chabao123.com - 每个人都最值得阅读的高品质科技信息',
      from: 'www.chabao123.com'
    })
    try {
      nativeShare.call()
    } catch (err) {
      ActionSheet.showShareActionSheetWithOptions({
        options: [],
        title: '长按复制，分享给好友吧',
        message: <ShareMessage show={item.url}/>,
      })
    }
  }
}

export default {
  share, handleError
}
