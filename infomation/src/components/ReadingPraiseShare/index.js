import React from 'react'
import styles from '../list-item.css'
import { connect } from 'dva'

function ReadingPraiseShare({item, current, share, dispatch}) {
  const add = (type) => {
    dispatch({
      type: 'mobile/infoPraiseReadingShare',
      payload: {
        category: current,
        id: item.code,
        type: type
      }
    })
  }
  return (
    <div className={styles.btngroup}>
      <span className={styles.read}><i className="iconfont icon-yuedu"></i>{item.read}</span>
      <span className={styles.zan} onClick={() => {
        add('praise')
      }}><i className="iconfont icon-zan1"></i>{item.praise}</span>
      <span className={styles.share} onClick={() => {
          share(item)
          add('sharing')
        }}><i className="iconfont icon-fenxiang1"></i>{item.share}</span>
    </div>
  )
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(ReadingPraiseShare)
