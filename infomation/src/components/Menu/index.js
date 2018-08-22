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
  const show = () => {
    dispatch({
      type: 'mobile/changeMenu',
      payload: { show: !pageData.show }
    })
  }
  return (
    <div className={styles.menu}>
      <ul className={styles.list} style={{height: pageData.show ? '70px': '105px'}}>
        {pageData.list.map((item) => (<li className={styles.item} onClick={() => {
          setCurrentKey(item.key)
        }} style={pageData.currentKey === item.key ? {color : '#d43d3d'} : {}} key={item.key}>{item.name}</li>))}
      </ul>
      <div className={styles.show} onClick={show}>{
        pageData.show ? <span>全部 <i className="iconfont icon-open"></i></span> :
        <span>收起 <i className="iconfont icon-shouqi_m"></i></span>
      }</div>
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
