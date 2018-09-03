import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'

function Vote({item, shareNews}) {
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={`detail/?id=${item.id}&key=${item.key}`}>{item.title}</NavLink></div>
      </div>
      <div className={styles.vote}>
        <span><NavLink to={`vote/?id=${item.id}&key=${item.key}`}  className={styles.defaultBtn}>已有{item.zan}人参与，点击查看投票结果 >>></NavLink></span>
      </div>
    </div>
  )
}

Vote.propTypes = {
}

export default Vote
