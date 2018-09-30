import React from 'react'
import Header from '../../components/Header'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import {connect} from 'dva'
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
    this.el = null
    this.start = 0
    this.end = 0
  }
  shareNews(item) {
    utils.share(item)
  }
  componentDidMount() {
    this.el = document.getElementById('body')
    this.el.addEventListener('touchstart', this.touchstart, false)
    this.el.addEventListener('touchmove', this.touchmove, false)
  }
  componentWillUnmount() {
    this.el.removeEventListener('touchstart', this.touchstart)
    this.el.removeEventListener('touchmove', this.touchmove)
  }
  touchstart = (event) => {
    this.start = event.touches[0].pageY
  }
  touchmove = (event) => {
    const _this = this
    this.end = event.touches[0].pageY - this.start
    const viewHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    if (this.end > 0 && scrollTop === 0) {
      event.preventDefault()
    }
    if (!this.state.refreshing && this.end > 50 && window.pageYOffset < 10) {
      this.setState({refreshing: true})
      this.props.dispatch({
        type: 'mobile/getNewsList',
        payload: {
          category: this.props.location.query.category
        }
      })
      setTimeout(function() {
        _this.setState({refreshing: false})
      }, 1500)
    }
  }
  render() {
    const {dispatch, pageData} = this.props
    return (<div id="body" className={styles.body}>
      <div className={styles.loading} style={{
          display: this.state.refreshing
            ? 'block'
            : 'none'
        }}>
        <i className="iconfont icon-jiazai" style={{
            fontSize: 40,
            color: '#d43d3d'
          }}></i>
      </div>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <Menu></Menu>
      <div id="scroll">
        <NewsList {...pageData} shareNews={this.shareNews}></NewsList>
        <Footer></Footer>
      </div>
      <FixedMenu showFixed={pageData.showFixed} dispatch={dispatch}></FixedMenu>
    </div>)
  }
}

MobileIndex.propTypes = {}

export default connect(state => {
  return {pageData: state.mobile}
})(MobileIndex)
