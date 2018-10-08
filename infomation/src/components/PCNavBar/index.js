import React from 'react'
import styles from './index.less'
import NavLink from 'umi/navlink'


function NavBar ({current, name}){
  return (
    <div className={styles.body}>
      <NavLink to={`/pc/?category=${current}`}>
        <i className="iconfont icon-shouye"></i>返回首页
      </NavLink>
      <span className={styles.arrow}>></span>{name}
    </div>
  )
}

export default NavBar
