import React from 'react'
import styles from './index.css'
import NavLink from 'umi/navlink'

function Content({item, shareNews}) {
  const share = (item) => {
    item.url = `detail/?id=${item.id}&key=${item.key}`
    shareNews(item)
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={`detail/?id=${item.id}&key=${item.key}`}>{item.title}</NavLink></div>
        <div className={styles.footer}>
          <div className={styles.left}>
            {item.id%2 !== 0 ? <span className={styles.zt}>专题</span> : ''}<span className={styles.source}>{item.source}</span>
          </div>
          <div className={styles.right}>
            {item.type ? <span className={styles[item.key]}>{item.type}</span> : ''}
          </div>
        </div>
      </div>
      <div className={styles.btngroup}>
        <span className={styles.read}><i className="iconfont icon-yuedu"></i>{item.read}</span>
        <span className={styles.zan}><i className="iconfont icon-zan1"></i>{item.zan}</span>
        <span className={styles.share} onClick={() => {
            share(item)
          }}><i className="iconfont icon-fenxiang1"></i>8972</span>
      </div>
    </div>
  )
}

Content.propTypes = {
}

export default Content
