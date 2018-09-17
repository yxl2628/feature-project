import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'

function Content({item, shareNews, color, current}) {
  const share = (item) => {
    item.url = window.location.href + `detail/?id=${item.code}&category=${item.belongCategoryCode}`
    shareNews(item)
  }
  const ztStyle = {
    color: `${color[item.belongCategoryCode]}`,
    border: `1px solid ${color[item.belongCategoryCode]}`
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={item.type === '0' ? item.detail :`detail/?id=${item.code}&category=${item.belongCategoryCode}`}>{item.title}</NavLink></div>
        <div className={styles.footer}>
          <div className={styles.left}>
            {item.type === '1' ? <span className={styles.zt}>专题</span> : ''}<span className={styles.source}>{item.source} {item.actor}</span>
          </div>
          <div className={styles.right}>
            <span className={styles.type} style={ztStyle}>{item.belongCategoryName}</span>
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
