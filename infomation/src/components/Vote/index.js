import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'

function Vote({item, shareNews}) {
  const share = (item) => {
    item.url = window.location.href + `detail/?id=${item.id}&key=${item.key}`
    shareNews(item)
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={`detail/?id=${item.id}&key=${item.key}`}>{item.title}</NavLink></div>
      </div>
      <div className={styles.vote}>
        <span><span className={styles.defaultBtn}>已有{item.zan}人参与，点击查看投票结果 >>></span></span>
      </div>
    </div>
  )
}

Vote.propTypes = {
}

export default Vote
