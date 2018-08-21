import React from 'react'
import styles from './index.css'
import { connect } from 'dva'


function Menu ({dispatch, pageData}){
  const setCurrentKey = (key) => {
    dispatch({
      type: 'mobile/getNewsList',
      payload: { key }
    })
  }
  return (
    <div className={styles.menu}>
      <div className={styles.scroll}>
        {pageData.list.map((item) => (<span className={styles.item} onClick={() => {
          setCurrentKey(item.key)
        }} style={pageData.currentKey === item.key ? {color : '#d43d3d'} : {}} key={item.key}>{item.name}</span>))}
      </div>
    </div>
  )
}

Menu.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(Menu)
