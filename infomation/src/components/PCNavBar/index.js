import React from 'react'
import styles from './index.less'
import NavLink from 'umi/navlink'


function NavBar ({current, name}){
  return (
    <div className={styles.content}>
      <div className={styles.body}>
        <img className={styles.navLogo} src={require('../../assets/nav_logo.png')} alt="" />
        <i className="iconfont icon-shouye icon-pc-shouye"></i><NavLink to={`/pc/?category=${current}`}>返回首页</NavLink>
        <span className={styles.arrow}>/</span><a>{name}</a>
      </div>
    </div>
  )
}

export default NavBar
