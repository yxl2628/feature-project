import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'

function Download({item, shareNews}) {
  const share = (item) => {
    item.url = window.location.href + `detail/?id=${item.id}&key=${item.key}`
    shareNews(item)
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={`detail/?id=${item.id}&key=${item.key}`}>{item.title}</NavLink></div>
        <div className={styles.footer}>
          <div>{item.desc}</div>
        </div>
      </div>
      <div className={styles.btngroup}>
        <span className={styles.read}><i className="iconfont icon-yuedu"></i>{item.read}</span>
        <span className={styles.zan}><i className="iconfont icon-zan1"></i>{item.zan}</span>
        <span className={styles.defaultBtn}>获取下载方式</span>
      </div>
    </div>
  )
}

Download.propTypes = {
}

export default Download
