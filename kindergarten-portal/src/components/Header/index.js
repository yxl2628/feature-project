import React from 'react'
import styles from './index.css'
import router from 'umi/router'
import Link from 'umi/link'

function Header ({ location: { pathname } }){
  function logout () {
    sessionStorage.removeItem('_info')
    router.push('/login')
  }
  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        <Link to="/home" className={styles.logo}>掌上幼儿园</Link>
        <div className={styles.info}>
          {
            pathname === '/login' ? '欢迎加入我们' : (
              <a onClick={logout} className={styles.logout}>登出</a>
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
