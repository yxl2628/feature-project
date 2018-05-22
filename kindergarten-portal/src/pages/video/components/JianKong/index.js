import { Component } from 'react'
import styles from './index.css'
import Link from 'umi/link'
import data from '../../../../assets/videoData.json'
import ReactPlayer from 'react-player'

class JianKong extends Component {
  state = {
    url: '',
    default: require('../../../../assets/loading.png'),
    playing: false
  }
  componentDidMount() {
    // 设置循环显示视频
    this.setState({index: 0, id: data[0].id, url: data[0].url, playing: true})
  }
  onReady = () => {
    const video = this.refs.video.wrapper.lastChild
    this.captureImage(video)
  }
  captureImage = (video) => {
    if (this.state.playing) {
      const canvas = document.createElement("canvas")
      var img = document.getElementById('img_' + this.state.id)
      canvas.width = img.offsetWidth
      canvas.height = img.offsetHeight
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
      data[this.state.index].src = canvas.toDataURL("image/png")
      let next = {index: 0, id: data[0].id, url: data[0].url}
      if (data[this.state.index + 1]) {
        const nextVideo = data[this.state.index + 1]
        next = {index: this.state.index + 1, id: nextVideo.id, url: nextVideo.url}
      }
      const _this = this
      _this.setState(next)
      // setTimeout(function(){
      //   _this.setState(next)
      // }, 1000)
    }
  }
  componentWillUnmount () {
    this.setState({url: '', playing: false})
  }
  render () {
    return (
      <div className={styles.content}>
        园区共计视频{data.length}个，正在直播中
        <div className={styles.list}>
          {
            data.map(video => {
              return (
                <Link key={video.id} to={`/video/detail/?id=${video.id}`} className={styles.item}>
                  <img id={`img_${video.id}`} src={video.src ? video.src : this.state.default} alt={video.name} />
                  <div className={styles.title}>{video.name}</div>
                </Link>
              )
            })
          }
        </div>
        <div className={styles.video}>
          <ReactPlayer ref="video" url={this.state.url} playing={this.state.playing} onReady={this.onReady} muted={true}/>
        </div>
      </div>
    )
  }
}
export default JianKong
