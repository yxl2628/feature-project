import React from 'react'
import styles from './index.css'
import addStyles from '../ReadingPraiseShare/index.css'

class VoteItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }
  voteItem(itemCode) {
    this.props.dispatch({
      type: 'mobile/voteItems',
      payload: {
        voteCode: this.props.code,
        itemCode: itemCode
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
    const {item, index} = this.props
    return (
      <div key={item.code} className={styles.voteItem}>
        <div className={styles.index}>{index + 1}.</div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.zan} onClick={()=>{
          this.voteItem(item.code)
          this.showAnimate()
        }}>
          <i className="iconfont icon-zan1" style={{color: '#d43d3d', fontSize: '21px'}}></i>
          <span className={styles.voteZan}>{item.praise}</span>
          {this.state.show ? <div className={addStyles.add1}>+1</div> : ''}
        </div>
      </div>
    )
  }
}

export default VoteItem
