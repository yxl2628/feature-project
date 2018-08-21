import React from 'react'
import styles from './index.css'

function Content({item}) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.footer}>
        <div className={styles.left}>
          {item.type ? <span className={styles[item.key]}>{item.type}</span> : ''}
        </div>
        <div className={styles.right}>
          <span className={styles.source}>{item.source}</span>
          <span className={styles.read}><i className="iconfont icon-yuedu1"></i>{item.read}</span>
          <span className={styles.zan}><i className="iconfont icon-zan1"></i>{item.zan}</span>
          <span className={styles.share}><i className="iconfont icon-fenxiang1"></i></span>
        </div>
      </div>
    </div>
  )
}

Content.propTypes = {
}

export default Content
