import React from 'react'
import styles from './index.less'
import NavLink from 'umi/navlink'
import ReadingPraiseShare from '../PCReadingPraiseShare'

function Content({item, color, current, dispatch}) {
  const url = `detail/?id=${item.code}&category=${item.belongCategoryCode}&fromCategory=${current}`
  const ztStyle = {
    color: `${color[item.belongCategoryCode]}`,
    // background: `${color[item.belongCategoryCode]}`,
    // border: `1px solid ${color[item.belongCategoryCode]}`
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
          {item.type === '1' ? <span className={styles.zt}>专题</span> : ''}
          <span className={styles.source}>{item.actor}</span>
          <span className={styles.type} style={ztStyle}>{item.belongCategoryName}</span>
        </div>
      </div>
      <ReadingPraiseShare item={item} current={current} url={url}></ReadingPraiseShare>
    </div>
  )
}

Content.propTypes = {
}

export default Content
