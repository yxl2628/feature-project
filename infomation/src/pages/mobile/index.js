import Header from '../../components/Header'
import Menu from '../../components/Menu'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'
import utils from '../../utils'
import FixedMenu from '../../components/FixedMenu'

function MobileIndex({dispatch, pageData, location: {query}}) {
  const shareNews = (item) => {
    utils.share(item)
  }
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <div className={styles.content}>
        <Menu></Menu>
        <NewsList {...pageData} dispatch={dispatch} query={query} shareNews={shareNews}></NewsList>
      </div>
      <FixedMenu showFixed={pageData.showFixed} dispatch={dispatch}></FixedMenu>
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
