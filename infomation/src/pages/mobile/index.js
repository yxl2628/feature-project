import Header from '../../components/Header'
import Menu from '../../components/Menu'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'

function MobileIndex({pageData}) {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <div className={styles.content}>
        <Menu></Menu>
        <NewsList newsList={pageData.newsList}></NewsList>
      </div>
    </div>

  )
}

MobileIndex.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(MobileIndex)
