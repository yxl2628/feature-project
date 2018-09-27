import React from 'react'
import styles from './index.css'

function Header (){
  return (
    <div className={styles.header}>
      <div className={styles.center}>
        <div className={styles.logo}><img src={require('../../assets/footer_logo.png')} alt="" /></div>
        <div className={styles.title}>每个人都最值得阅读的高品质科技信息！</div>
      </div>
    </div>
  )
}

Header.propTypes = {
}

export default Header
