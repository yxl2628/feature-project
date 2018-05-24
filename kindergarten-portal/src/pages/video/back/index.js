import { Component } from 'react'
import styles from '../detail/index.css'
import data from '../../../assets/videoData.json'
import ReactPlayer from 'react-player'
import router from 'umi/router'
import Link from 'umi/link'
import { Breadcrumb } from 'antd'
import { connect } from 'dva'

class VideoBackDetail extends Component {
  constructor (props){
    super(props)
    let queryTime = this.props.location.query.t
    const id = this.props.location.query.id
    const name = this.props.location.query.name
    const now = new Date()
    const year = now.getFullYear().toString()
    const month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1).toString()
    const date = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate().toString()
    const nowTime = [year, month, date]
    let currentday = ''
    if (queryTime) {
      queryTime = queryTime.split('-')
      currentday = queryTime[1] + '-' + queryTime[2]
    } else {
      queryTime = [year, month, date]
    }
    this.state = {
      width: 0,
      height: 0,
      id: id,
      name: name,
      now: nowTime,
      query: queryTime,
      currentday: currentday
    }
  }
  getCurrent = (id) => {
    return data.find(value => {
      return `${value.id}` === id
    })
  }
  componentDidMount() {
    const width = document.getElementById('VideoBackDetail').offsetWidth
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
    const {query, id, name} = this.state
    query[2] = date.toString()
    this.setState({
      query: query,
      currentday: query[1] + '-' + query[2]
    })
    router.push({path: '/video/back/', query: {id: id, name: name, t: query.join('-')}})
  }
  getDataUrl = () => {
    return this.getCurrent(this.state.id).url
  }
  render () {
    const { now, query, id, name, currentday } = this.state
    const { exist, list } = this.props.vcms
    const renderMonth = (_nowMonth, _queryMonth) => {
      const monthArray = []
      for (let i = 1; i <= _nowMonth; i++) {
        const month = i < 10 ? ('0' + i) : i.toString()
        if (id === '1') {
          if (exist && exist.indexOf(month) >= 0) {
            monthArray.push(<span key={i} onClick={() => {this.changeMonth(month)}} className={month === _queryMonth ? styles.monthActive : styles.monthItem}>{month}月</span>)
          }
        } else {
          monthArray.push(<span key={i} onClick={() => {this.changeMonth(month)}} className={month === _queryMonth ? styles.monthActive : styles.monthItem}>{month}月</span>)
        }
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
        const day = i < 10 ? ('0' + i) : i
        const today = currentday === (_query[1] + '-' + day)
        if (id === '1') {
          if (exist && exist.indexOf(_query[1] + '-' + day) >= 0) {
            dateArray.push(<span key={i} onClick={()=>{this.changeDate(day)}} className={today ? styles.dateActive : styles.dateItem}>{_query[1]}月{day}日</span>)
          }
        } else {
          dateArray.push(<span key={i} onClick={()=>{this.changeDate(day)}} className={today ? styles.dateActive : styles.dateItem}>{_query[1]}月{day}日</span>)
        }
      }
      return dateArray
    }
    let url = this.getDataUrl()
    if (id === '1' && list && list[currentday] && list[currentday][0]) {
      url = list[currentday][0].url.replace('218.205.169.222', '218.205.169.222')
    }

    return (
      <div>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item><Link to="/home/">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/video/?id=${id}`}>监控设备</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>{name}</span>
            <Link to={`/video/detail/?id=${id}`}>切换到直播</Link>
          </div>
          <div id="VideoBackDetail" className={styles.video}>
            <ReactPlayer url={url} playing={true} width={this.state.width} height={this.state.height} controls={currentday === '' ? false : true}/>
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

function mapStateToProps(state) {
  return {
    vcms: state.vcms
  }
}

export default connect(mapStateToProps)(VideoBackDetail)
