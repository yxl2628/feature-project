import React from 'react'
import styles from './index.css'

function Header (){
  return (
    <div className={styles.header}>
      <div className={styles.center}>
        <div className={styles.logo}><a href="/pc/?category=a" ><img src={require('../../assets/pc_logo.png')} width="234px" height="45px" alt="" /></a></div>
        <div className={styles.title}><img src={require('../../assets/pc_title.png')} width="308px" height="30px" alt="" /></div>
      </div>
    </div>
  )
}

Header.propTypes = {
}

export default Header
