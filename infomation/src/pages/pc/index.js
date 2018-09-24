import styles from './index.css'
import Header from '../../components/PCHeader'
import Footer from '../../components/PCFooter'
import Menu from '../../components/PCMenu'
import NewsList from '../../components/PCNewsList'
import { connect } from 'dva'
import utils from '../../utils'

function PCIndex({dispatch, pageData}) {
  const shareNews = (item) => {
    utils.share(item)
  }
  return (
    <div className={styles.content}>
      <Header></Header>
      <div className={styles.body}>
        <div className={styles.menu}>
          <Menu></Menu>
        </div>
        <div className={styles.news}>
          <NewsList color={pageData.color} newsList={pageData.newsList} shareNews={shareNews} current={pageData.current} vote={pageData.vote}></NewsList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}


PCIndex.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(PCIndex)
