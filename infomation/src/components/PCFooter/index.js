import React from 'react'
import styles from './index.css'

function Footer (){
  return (
    <div className={styles.footer}>
      <div className={styles.center}>
        @copyright 2018 <span>chabao123.com-高品质信息才值得阅读</span>
        <span><img src={require('../../assets/gongan.png')} />京公网安备 11000002002023号</span>
      </div>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer
