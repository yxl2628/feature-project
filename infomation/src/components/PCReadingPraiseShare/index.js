import React from 'react'
import styles from './index.less'
import { connect } from 'dva'
import QRCode from 'qrcode'

class ReadingPraiseShare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      share: false,
      url: ''
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
    this.setState({show: true})
    const _this = this
    setTimeout(function(){
      _this.setState({show: false})
    }, 3000)
  }
  render() {
    const {item, url, dispatch} = this.props
    console.log(url)
    return (
      <div className={styles.btngroup}>
        <a className={styles.read}><span className={styles.num}>{item.read}</span> <span className={styles.text}>阅读</span></a>
        <a className={styles.zan} onClick={() => {
            this.add('praise')
            this.showAnimate()
          }}><i className="iconfont icon-dianzan1"></i><span className={styles.num}>{item.praise}</span>
          {this.state.show ? <div className={styles.add1}>+1</div> : ''}
        </a>
        <a className={styles.share} onClick={(event) => {
          const _this = this
            QRCode.toDataURL(window.location.href, function(err, url) {
              _this.setState({share: true, url: url})
            })
            this.add('sharing')
          }}><i className="iconfont icon-fenxiang3"></i><span className={styles.num}>{item.share}</span>
        </a>
        {this.state.share ? (
          <div className={styles.qrcode}>
            微信“扫一扫” <i className="iconfont icon-guanbi" onClick={(event)=>{
              event.preventDefault()
              this.setState({share: false})
            }}></i>
            <img src={this.state.url} alt=""/>
          </div>
        ) : ''}
      </div>
    )
  }
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(ReadingPraiseShare)
