import React from 'react'
import styles from './index.less'
import QRCode from 'qrcode'

class PCShare extends React.Component {
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
  render() {
    const {item, children} = this.props
    return (
      <div className={styles.body}>
        <div className={styles.share} onClick={(event) => {
          const _this = this
            QRCode.toDataURL(window.location.href, function(err, dataURL) {
              _this.setState({share: true, url: dataURL})
            })
            this.add('sharing')
        }}>{children}</div>
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

export default PCShare
