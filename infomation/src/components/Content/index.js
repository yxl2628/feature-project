import React from 'react'
import styles from './index.css'

function Content({item}) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.footer}>
        <span className={styles.source}>{item.source}</span>
        <span className={styles.read}><i className="iconfont icon-yuedu"></i>{item.read}</span>
        <span className={styles.zan}><i className="iconfont icon-zan1"></i>{item.zan}</span>
      </div>
    </div>
  )
}

Content.propTypes = {
}

export default Content
