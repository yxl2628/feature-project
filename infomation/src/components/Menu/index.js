import React from 'react'
import styles from './index.css'
import { connect } from 'dva'
import NavLink from 'umi/navlink'


function Menu ({dispatch, pageData}){
  const show = () => {
    dispatch({
      type: 'mobile/changeMenu',
      payload: { show: !pageData.show }
    })
  }
  return (
    <div className={styles.menu}>
      <ul className={styles.list} style={{height: pageData.show ? '68px': Math.ceil(pageData.list.length/4)*35 + 'px'}}>
        {pageData.list.map((item) => (<NavLink to={`/mobile/?category=${item.code}`} className={styles.item} style={pageData.current === item.code ? {color : '#d43d3d'} : {}} key={item.code}>{item.name}</NavLink>))}
      </ul>
      {
        pageData.list.length > 8 ? (
          <div className={styles.show} onClick={show}>{
            pageData.show ? <span>更多<i className="iconfont icon-open"></i></span> :
            <span>收起<i className="iconfont icon-shouqi_m"></i></span>
          }</div>
        ) : ''
      }

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
