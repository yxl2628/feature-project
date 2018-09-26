import React from 'react'
import Header from '../../components/Header'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'
import utils from '../../utils'
import FixedMenu from '../../components/FixedMenu'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'

class MobileIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }
  shareNews(item) {
    utils.share(item)
  }
  componentDidMount() {

  }
  render() {
    const {dispatch, pageData} = this.props
    return (
      <div className={styles.body}>
        <div className={styles.header}>
          <Header></Header>
        </div>
        <Menu></Menu>
        <NewsList {...pageData} shareNews={this.shareNews}></NewsList>
        <Footer></Footer>
        <FixedMenu showFixed={pageData.showFixed} dispatch={dispatch}></FixedMenu>
      </div>
    )
  }
}

MobileIndex.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(MobileIndex)
