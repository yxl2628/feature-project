import React from 'react'
import styles from './index.less'
import ShareMessage from '../ShareMessage'
import {ActionSheet} from 'antd-mobile'

function FixedMenu({showFixed, dispatch}) {
  window.onscroll=function(){
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    const showFixed = scrollTop > 50 ? 'block' : 'none'
    dispatch({
      type: 'mobile/setFixedMenu',
      payload: { showFixed }
    })
  }
  return (
    <div className={styles.fixedMenu}>
      <div className={styles.top} onClick={()=>{
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }} style={{display: showFixed}}><i className="iconfont icon-top"></i></div>
      { window.navigator.userAgent.indexOf('MicroMessenger') < 0 ? (
        <div className={styles.top} onClick={()=> {
          if(window.navigator.userAgent.indexOf('UCBrowser') > -1) {
            window.location.href = 'ext:add_favorite'
          } else {
            ActionSheet.showShareActionSheetWithOptions({
              options: [],
              title: '收藏本站，方便下次查看',
              message: <ShareMessage show="1.点击浏览器下方菜单栏 -> 2. 点击“添加书签”"/>,
            })
          }
        }}><div className={styles.collection}>收藏</div><div className={styles.collection}>本站</div></div>
      ) : ''}
    </div>
  )
}

export default FixedMenu
