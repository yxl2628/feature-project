import Header from '../../components/Header'
import Menu from '../../components/Menu'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'
import utils from '../../utils'
import FixedMenu from '../../components/FixedMenu'
import Footer from '../../components/Footer'

function MobileIndex({dispatch, pageData, location: {query}}) {
  const shareNews = (item) => {
    utils.share(item)
  }
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <Menu></Menu>
      <NewsList {...pageData} dispatch={dispatch} query={query} shareNews={shareNews}></NewsList>
      <FixedMenu showFixed={pageData.showFixed} dispatch={dispatch}></FixedMenu>
      <Footer show={true}></Footer>
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
