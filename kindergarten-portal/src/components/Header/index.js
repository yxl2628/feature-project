import React from 'react'
import styles from './index.css'
import router from 'umi/router'
import Link from 'umi/link'

function Header ({ location: { pathname } }){
  function logout () {
    sessionStorage.removeItem('_info')
    router.push('/login/')
  }
  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        <Link to="/home/" className={styles.logo}>幼儿园统一监管系统</Link>
        <div className={styles.info}>
          {
            pathname.indexOf('/login/') >= 0 ? '欢迎加入我们' : (
              <a onClick={logout} className={styles.logout}>退出</a>
            )
          }
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
}

export default Header
