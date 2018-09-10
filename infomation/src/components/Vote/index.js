import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'

function Vote({item, shareNews}) {
  const share = (item) => {
    item.url = window.location.href + `vote/?id=${item.id}&key=${item.key}`
    shareNews(item)
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.download}>
          <div className={styles.title}>{item.title}</div>
          <div><NavLink to={`vote/?id=${item.id}&key=${item.key}`} className={styles.defaultBtn}>点击投票</NavLink></div>
        </div>
        <div className={styles.footer}>
          <div className={styles.left}>
            <span className={styles.vote_zt}>已有2.8万人参与投票</span>
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

Vote.propTypes = {
}

export default Vote
