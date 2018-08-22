import React from 'react'
import styles from './index.css'

function Header (){
  return (
    <div className={styles.header}>
      <img src={require('../../assets/logo.jpg')} className={styles.logo} alt="xuan123.com"/>
      xuan123.com
    </div>
  )
}

Header.propTypes = {
}

export default Header
