import React from 'react'
import styles from '../list-item.css'
import customStyles from './index.css'
import { connect } from 'dva'

class ReadingPraiseShare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      canClick: true
    }
  }
  add (type) {
    const {item, current, dispatch} = this.props
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
    this.setState({show: true, canClick: false})
    const _this = this
    setTimeout(function(){
      _this.setState({show: false})
    }, 3000)
  }
  render() {
    const {item, share} = this.props
    return (
      <div className={styles.btngroup}>
        <a className={styles.read}><i className="iconfont icon-yuedu"></i>{item.read}</a>
        <a className={styles.zan} onClick={() => {
            if (this.state.canClick) {
              this.add('praise')
              this.showAnimate()
            }
          }}><i className="iconfont icon-zan1"></i>{item.praise}
          {this.state.show ? <div className={customStyles.add1}>+1</div> : ''}
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
