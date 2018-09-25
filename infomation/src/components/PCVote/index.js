import React from 'react'
import styles from '../PCDownload/index.less'
import extStyles from './index.less'
import NavLink from 'umi/navlink'
//import ReadingPraiseShare from '../ReadingPraiseShare'

function Vote({item, shareNews, current, vote}) {
  const url = `vote/?id=${item.code}&category=${item.belongCategoryCode}&fromCategory=${current}`
  // const share = (item) => {
  //   item.url = window.location.origin + window.location.pathname + url
  //   shareNews(item)
  // }
  const total = vote && vote[item.code] || 0
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.download}>
          <div className={styles.title}>{item.title}</div>
          <div><NavLink to={url} className={styles.defaultBtn}>点击投票</NavLink></div>
        </div>
        <div className={styles.footer}>
          <div className={styles.left}>
            <span className={extStyles.vote_zt}>已有{total}人参与投票</span>
          </div>
        </div>
      </div>
      {/* <ReadingPraiseShare item={item} current={current} share={share}></ReadingPraiseShare>*/}
    </div>
  )
}

Vote.propTypes = {
}

export default Vote
