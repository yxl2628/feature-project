import React from 'react'
import styles from './index.less'
import QRCode from 'qrcode'

function FixedMenu({showFixed, dispatch}) {
  window.onscroll=function(){
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    const showFixed = scrollTop > 50 ? 'block' : 'none'
    dispatch({
      type: 'mobile/setFixedMenu',
      payload: { showFixed }
    })
  }
  let codeDataUrl = ''
  QRCode.toDataURL(window.location.href, function(err, url) {
    codeDataUrl = url
  })
  const addFavorite = () => {
      const url = window.location
      const title = document.title
      const ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf("360se") > -1) {
          alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！")
      }
      else if (ua.indexOf("msie 8") > -1) {
          window.external.AddToFavoritesBar(url, title) //IE8
      }
      else if (document.all) {//IE类浏览器
        try{
         window.external.addFavorite(url, title)
        }catch(e){
         alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!')
        }
      }
      else if (window.sidebar) {//firfox等浏览器；
          window.sidebar.addPanel(title, url, "")
      }
      else {
          alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!')
      }
  }
  return (
    <div className={styles.fixedMenu}>
      <div className={styles.top} onClick={()=>{
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }} style={{display: showFixed, height: '38px', paddingTop: '12px'}}><i className="iconfont icon-iconfontxiangshang"></i></div>
      <div className={styles.top} onClick={addFavorite}>
        <div className={styles.collection}>收藏</div><div className={styles.collection}>本站</div>
      </div>
      <div className={styles.top}>
        <div className={styles.collection}>手机</div><div className={styles.collection}>观看</div>
        <div className={styles.qrcode}>
          <img src={codeDataUrl} alt="" />
        </div>
      </div>
    </div>
  )
}

export default FixedMenu
