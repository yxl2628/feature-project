import React from 'react'
import styles from './index.less'
import NavLink from 'umi/navlink'
import ReadingPraiseShare from '../PCReadingPraiseShare'

function Download({item, current}) {
  const url = `download/?id=${item.code}&category=${item.belongCategoryCode}&fromCategory=${current}`
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
      <ReadingPraiseShare item={item} current={current} url={url}></ReadingPraiseShare>
    </div>
  )
}

Download.propTypes = {
}

export default Download
