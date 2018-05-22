import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import withRouter from 'umi/withRouter'
import styles from './index.css'

function Layout({ children, location }) {
  return (
    <div className={styles.body}>
      <Header location={location} />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(Layout)
