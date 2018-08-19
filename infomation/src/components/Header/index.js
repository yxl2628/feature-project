import React from 'react'
import { NavBar } from 'antd-mobile'
import styles from './index.css'

function Header (){
  return (
    <NavBar>
      <img src={require('../../assets/logo.png')} className={styles.logo} alt="xuan123.com"/>
      <img src={require('../../assets/title-logo.png')} className={styles.title} alt="每天看一点最具价值的信息！"/>
    </NavBar>
  )
}

Header.propTypes = {
}

export default Header
