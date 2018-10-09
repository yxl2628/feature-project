import React from 'react'
import styles from './index.css'

function Footer (){
  return (
    <div className={styles.footer}>
      <div className={styles.center}>
        <span className={styles.copyright}>copyright©2018<a className={styles.gohome} href='/pc/?category=a'>www.chabao123.com</a></span>
        每个人都最值得阅读的高品质科技信息！
      </div>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer
