import React from 'react'
import styles from './index.css'

function Header (){
  return (
    <div className={styles.header}>
      {/* <img src={require('../../assets/logo.png')} className={styles.logo} alt="xuan123.com"/>
      <img src={require('../../assets/title-logo.png')} className={styles.title} alt="每天看一点最具价值的信息！"/> */}
      xuan123.com
    </div>
  )
}

Header.propTypes = {
}

export default Header
