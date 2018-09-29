import React from 'react'
import styles from './index.less'

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
      }} style={{display: showFixed, height: '38px', paddingTop: '12px'}}><i className="iconfont icon-iconfontxiangshang"></i></div>
      <div className={styles.top}
        ><div className={styles.collection}>收藏</div><div className={styles.collection}>本站</div>
      </div>
      <div className={styles.top}
        ><div className={styles.collection}>手机</div><div className={styles.collection}>观看</div>
      </div>
    </div>
  )
}

export default FixedMenu
