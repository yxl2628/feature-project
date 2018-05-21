import { Component } from 'react'
import styles from './index.css'
import data from '../../../assets/videoData.json'
import ReactPlayer from 'react-player'

class VideoDetail extends Component {
  state = {
    width: 0,
    height: 0
  }
  componentDidMount() {
    const width = document.getElementById('videoDetail').offsetWidth
    this.setState({
      width: width,
      height: width*9/16
    })
  }
  render () {
    const current = data.find(value => {
      return `${value.id}` === this.props.location.query.id
    })
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    return (
      <div className={styles.content}>
        <div className={styles.title}>{current.name}</div>
        <div id="videoDetail" className={styles.video}>
          <ReactPlayer url={current.url} playing={true} width={this.state.width} height={this.state.height}/>
        </div>
        <div className={styles.relevant}>相关视频</div>
        <div className={styles.relevantList}>
          <div className={styles.year}>{year}年</div>
          <div className={styles.month}>{month}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
    )
  }
}
export default VideoDetail
