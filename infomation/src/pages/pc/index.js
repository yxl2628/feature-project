import styles from './index.css'
import Header from '../../components/PCHeader'
import Footer from '../../components/PCFooter'
import Menu from '../../components/PCMenu'
import NewsList from '../../components/PCNewsList'
import FixedMenu from '../../components/PCFixedMenu'
import { connect } from 'dva'

function PCIndex({dispatch, pageData}) {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <div className={styles.body}>
        <div className={styles.menu}>
          <Menu></Menu>
        </div>
        <div className={styles.news}>
          <NewsList color={pageData.color} newsList={pageData.newsList} current={pageData.current} vote={pageData.vote}></NewsList>
        </div>
      </div>
      <Footer></Footer>
      <FixedMenu showFixed={pageData.showFixed} dispatch={dispatch}></FixedMenu>
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
