import React from 'react'
import styles from './index.css'

function Footer (){
  return (
    <div className={styles.footer}>
      <div className={styles.center}>
        @copyright 2018
        <a className={styles.link} href="http://www.miitbeian.gov.cn/">
          京ICP备18045058号
        </a>
        <a className={styles.link} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011202001495"><img alt="" src={require('../../assets/gongan.png')} />京公网安备 11011202001495号</a>
      </div>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer
