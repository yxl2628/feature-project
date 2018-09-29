import React from 'react'
import styles from './index.less'
import NavLink from 'umi/navlink'
import ReadingPraiseShare from '../PCReadingPraiseShare'

function Content({item, shareNews, color, current}) {
  const url = `detail/?id=${item.code}&category=${item.belongCategoryCode}&fromCategory=${current}`
  const share = (item) => {
    item.url = window.location.origin + window.location.pathname + url
    shareNews(item)
  }
  const ztStyle = {
    color: `${color[item.belongCategoryCode]}`,
    // background: `${color[item.belongCategoryCode]}`,
    // border: `1px solid ${color[item.belongCategoryCode]}`
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={item.type === '0' ? item.detail : url}>{item.title}</NavLink></div>
        <div className={styles.footer}>
          {item.type === '1' ? <span className={styles.zt}>专题</span> : ''}
          <span className={styles.source}>{item.actor}</span>
          <span className={styles.type} style={ztStyle}>{item.belongCategoryName}</span>
        </div>
      </div>
      <ReadingPraiseShare item={item} current={current} share={share}></ReadingPraiseShare>
    </div>
  )
}

Content.propTypes = {
}

export default Content
