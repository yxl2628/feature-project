import React from 'react'
import styles from './index.less'
import { connect } from 'dva'

class ReadingPraiseShare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }
  add (type) {
    const {item, current, share, dispatch} = this.props
    dispatch({
      type: 'mobile/infoPraiseReadingShare',
      payload: {
        category: current,
        id: item.code,
        type: type
      }
    })
  }
  showAnimate () {
    this.setState({show: true})
    const _this = this
    setTimeout(function(){
      _this.setState({show: false})
    }, 3000)
  }
  render() {
    const {item, current, share, dispatch} = this.props
    return (
      <div className={styles.btngroup}>
        <a className={styles.read}><span className={styles.num}>{item.read}</span> <span className={styles.text}>阅读</span></a>
        <a className={styles.zan} onClick={() => {
            this.add('praise')
            this.showAnimate()
          }}><i className="iconfont icon-zan1"></i>{item.praise}
          {this.state.show ? <div className={styles.add1}>+1</div> : ''}
      </a>
        <a className={styles.share} onClick={() => {
            share(item)
            this.add('sharing')
          }}><i className="iconfont icon-fenxiang1"></i>{item.share}
        </a>
      </div>
    )
  }
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(ReadingPraiseShare)
