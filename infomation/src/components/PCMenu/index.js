import React from 'react'
import styles from './index.less'
import { connect } from 'dva'
import NavLink from 'umi/navlink'


function Menu ({dispatch, pageData}){
  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        {pageData.list.map((item) => (
          <NavLink to={`/pc/?category=${item.code}`} onClick={()=>{
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
          }} className={pageData.current === item.code ? styles.active : styles.item} key={item.code}>{item.name}
          </NavLink>
        ))}
      </ul>
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
