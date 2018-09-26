import React from 'react'
import styles from './index.css'

function Footer ({show}){
  return (
    <div className={styles.footer}>
      <div className={styles.title}>
        <img alt="" src={require('../../assets/footer_logo.png')} />
      </div>
      <div className={styles.desc}>每个人都值得阅读的高品质科技信息！</div>
      {show ? (
        <a className={styles.link} href="http://www.miitbeian.gov.cn/">
          京ICP备18045058号
        </a>
      ) : ''}
      {show ? (
        <a className={styles.link} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011202001495"><img alt="" src={require('../../assets/gongan.png')} />京公网安备 11011202001495号</a>
      ) : ''}
    </div>
  )
}

Footer.propTypes = {
}

export default Footer
