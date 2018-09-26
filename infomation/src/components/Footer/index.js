import React from 'react'
import styles from './index.css'

function Footer (){
  return (
    <div className={styles.footer}>
      <div className={styles.title}>
        <img alt="" src={require('../../assets/footer_logo.png')} />
      </div>
      <div className={styles.desc}>每个人都值得阅读的高品质科技信息！</div>
      <div className={styles.copyright}>copyright © 2018 www.chabao123.com</div>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer
