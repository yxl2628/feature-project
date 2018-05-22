import { Component } from 'react'
import styles from './index.css'
import data from '../../../assets/videoData.json'
import ReactPlayer from 'react-player'
import router from 'umi/router'
import Link from 'umi/link'
import { Breadcrumb } from 'antd'

class VideoDetail extends Component {
  constructor (props){
    super(props)
    let queryTime = this.props.location.query.t
    const current = this.getCurrent(this.props.location.query.id)
    current.tempUlr = current.url
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const nowTime = [year.toString(), month.toString(), date.toString()]
    if (queryTime) {
      queryTime = queryTime.split('-')
    } else {
      queryTime = [year.toString(), month.toString(), date.toString()]
    }
    this.state = {
      width: 0,
      height: 0,
      current: current,
      now: nowTime,
      query: queryTime,
      currentday: ''
    }
  }
  getCurrent = (id) => {
    return data.find(value => {
      return `${value.id}` === id
    })
  }
  componentDidMount() {
    const width = document.getElementById('videoDetail').offsetWidth
    this.setState({
      width: width,
      height: width*9/16
    })
  }
  changeMonth = (month) => {
    const query = this.state.query
    query[1] = month.toString()
    this.setState({
      query: query
    })
  }
  changeDate = (date) => {
    const {now, query, current} = this.state
    query[2] = date.toString()
    current.tempUlr = this.getDataUrl(now, query, current)
    this.setState({
      query: query,
      current: current,
      currentday: query[1] + '-' + query[2]
    })
    router.push({path: '/video/detail', query: {id: current.id, t: query.join('-')}})
  }
  getDataUrl = (_now, _query, current) => {
    const _temp = data[Math.floor((Math.random()*data.length))].url
    if (_now[0] === _query[0] && _now[1] === _query[1] && _now[2] === _query[2]) {
      return current.url
    }
    if (_temp === current.tempUlr) {
      return this.getDataUrl(_now, _query, current)
    } else {
      return _temp
    }
  }
  render () {
    const {now, query, current, currentday} = this.state
    const renderMonth = (_nowMonth, _queryMonth) => {
      const monthArray = []
      for (let i = 1; i <= _nowMonth; i++) {
        monthArray.push(<span key={i} onClick={() => {this.changeMonth(i)}} className={i.toString() === _queryMonth ? styles.monthActive : styles.monthItem}>{i}月</span>)
      }
      return monthArray
    }
    const renderDate = (_now, _query) => {
      const dateArray =[]
      let max = new Date(_query[0], _query[1], 0).getDate()
      if (_now[0] === _query[0] && _now[1] === _query[1]) {
        max = _now[2]
      }
      for (let i = 1; i <= max; i++) {
        const today = currentday === (_query[1] + '-' + i)
        dateArray.push(<span key={i} onClick={() => {this.changeDate(i)}} className={today ? styles.dateActive : styles.dateItem}>{_query[1]}月{i}日</span>)
      }
      return dateArray
    }
    return (
      <div>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item><Link to="/home">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/video?id=${current.id}`}>监控设备</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{current.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.content}>
          <div className={styles.title}><span>{current.name}</span><span className={styles.stauts}>{currentday === '' ? '直播中' : '回看'}</span></div>
          <div id="videoDetail" className={styles.video}>
            <ReactPlayer url={current.tempUlr} playing={true} width={this.state.width} height={this.state.height} controls={currentday === '' ? false : true}/>
          </div>
          <div className={styles.relevant}>回看视频</div>
          <div className={styles.relevantList}>
            <div className={styles.year}>{query[0]}年</div>
            <div className={styles.month}>
              {renderMonth(now[1], query[1])}
            </div>
            <div className={styles.date}>
              {renderDate(now, query)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default VideoDetail
