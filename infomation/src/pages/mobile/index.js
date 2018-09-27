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
    this.start = 0
    this.end = 0
  }
  shareNews(item) {
    utils.share(item)
  }
  componentDidMount() {
    document.addEventListener('touchstart', this.touchstart, false)
    document.addEventListener('touchend', this.touchend, false)
  }
  componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchstart)
    document.removeEventListener('touchend', this.touchend)
  }
  touchstart = (event) => {
    event.preventDefault()
    if (window.pageYOffset < 10) {
      this.start = event.changedTouches[0].pageY
    }
  }
  touchend = (event) => {
    event.preventDefault()
    const _this = this
    if (window.pageYOffset < 10) {
      this.setState({refreshing: true})
      this.end = event.changedTouches[0].pageY
      if (this.end - this.start > 150) {
        this.setState({refreshing: true})
        this.props.dispatch({type: 'mobile/getNewsList', payload: {category: this.props.location.query.category}})
      }
    }
    setTimeout(function() {
      _this.setState({refreshing: false})
      _this.start = 0
      _this.end = 0
    }, 1500)
  }
  render() {
    const {dispatch, pageData} = this.props
    return (
      <div className={styles.body}>
        <div className={styles.loading} style={{display: this.state.refreshing ? 'block' : 'none'}}>
          <i className="iconfont icon-jiazai" style={{fontSize: 40, color: '#d43d3d'}}></i>
        </div>
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
