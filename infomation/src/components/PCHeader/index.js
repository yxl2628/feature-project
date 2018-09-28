import React from 'react'
import styles from './index.css'

function Header (){
  return (
    <div className={styles.header}>
      <div className={styles.center}>
        <div className={styles.logo}><img src={require('../../assets/pc_logo.png')} alt="" /></div>
        <div className={styles.title}><img src={require('../../assets/pc_title.png')} alt="" /></div>
      </div>
    </div>
  )
}

Header.propTypes = {
}

export default Header
