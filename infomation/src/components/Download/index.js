import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'

function Download({item, shareNews, current}) {
  const url = `download/?id=${item.code}&category=${item.belongCategoryCode}&fromCategory=${current}`
  const share = (item) => {
    item.url = window.location.origin + window.location.pathname + url
    shareNews(item)
  }
  const descHtml = () => {
    return {__html: item.detail.replace(/\n/gm, '<br />')}
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.download}>
          <div className={styles.title}>{item.title}</div>
          <div><NavLink to={url} className={styles.defaultBtn}>点击下载</NavLink></div>
        </div>
        <div className={styles.footer}>
          <div className={styles.desc} dangerouslySetInnerHTML={descHtml()}></div>
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

Download.propTypes = {
}

export default Download
