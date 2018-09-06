import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import NativeShare from 'nativeshare'
import {ActionSheet} from 'antd-mobile'

const nativeShare = new NativeShare()

function VoteDetail({ pageData: { detail, newsList }}) {
  const shareNews = (item) => {
    item.url = window.location.href
    nativeShare.setShareData({
      icon: '//47.92.104.253:5656/static/logo.jpg',
      link: item.url,
      title: item.title,
      desc: 'xuanchabao123.com - 每天看一点最有价值的信息',
      from: 'xuanchabao123.com'
    })
    try {
      nativeShare.call()
    } catch (err) {
      const a = window.navigator.appVersion.toLowerCase();
      if (a.match(/MicroMessenger/i) === "micromessenger") {
        ActionSheet.showShareActionSheetWithOptions({
          options: [],
          title: '点击右上角分享给好友',
          message: item.title
        })
      } else {
        ActionSheet.showShareActionSheetWithOptions({
          options: [],
          title: '长按复制，分享给好友吧',
          message: item.url
        })
      }
    }
  }
  return (<div className={styles.body}>
    <div className={styles.header}>
      <Header></Header>
    </div>
    {
      detail
        ? (<div className={styles.detail}>
          <div className={styles.navbar}>
            <NavLink to='/mobile/'>
              <i className="iconfont icon-shouye"></i>返回首页</NavLink>
            <span className={styles.arrow}>></span>{detail.type}</div>
          <div className={styles.otherHeader}>
            <div className={styles.currentTitle}>投票：{detail.title}</div>
            <div className={styles.share} onClick={() => {
                shareNews(detail)
              }}>
              <i className="iconfont icon-fenxiang1 detail-fenxiang"></i>分享投票</div>
          </div>
          <div className={styles.voteDetail}>
            {detail.desc}
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.otherTitle}>投票详情</span>
            </div>
            <div className={styles.voteList}>
              {
                detail.voteList.map((item, index)=> {
                  return (
                    <div className={styles.voteItem}>
                      <div className={styles.title}>{index + 1}. {item.title}</div>
                      <div className={styles.zan}><i className="iconfont icon-zan1" style={{color: '#d43d3d'}}></i> {item.zan}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>)
        : ''
    }
  </div>)
}

VoteDetail.propTypes = {}

export default connect(state => {
  return {pageData: state.mobile}
})(VoteDetail)
