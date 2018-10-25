import React from 'react'
import styles from '../list-item.css'
import NavLink from 'umi/navlink'
import ReadingPraiseShare from '../ReadingPraiseShare'

function Content({item, shareNews, color, current, dispatch}) {
  const url = `detail/?id=${item.code}&category=${item.belongCategoryCode}&fromCategory=${current}`
  const share = (item) => {
    item.url = window.location.origin + window.location.pathname + url
    shareNews(item)
  }
  const ztStyle = {
    color: `${color[item.belongCategoryCode]}`,
    border: `1px solid ${color[item.belongCategoryCode]}`
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><a onClick={()=> {
          dispatch({
            type: 'mobile/infoPraiseReadingShare',
            payload: {id: item.code, category: current, type: 'reading', goto: item.type === '0' ? item.detail : url}
          })
        }}>{item.title}</a></div>
        <div className={styles.footer}>
          <div className={styles.left}>
            {item.type === '1' ? <span className={styles.zt}>专题</span> : ''}<span className={styles.source}>{item.actor}</span>
          </div>
          <div className={styles.right}>
            <span className={styles.type} style={ztStyle}>{item.belongCategoryName}</span>
          </div>
        </div>
      </div>
      <ReadingPraiseShare item={item} current={current} share={share}></ReadingPraiseShare>
    </div>
  )
}

Content.propTypes = {
}

export default Content
