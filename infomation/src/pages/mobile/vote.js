import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import utils from '../../utils'

function VoteDetail({ pageData: { detail, newsList }}) {
  const shareNews = (item) => {
    item.url = window.location.href
    utils.share(item)
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
            <div className={styles.currentTitle}>投票主题：</div>
            <div className={styles.share} onClick={() => {
                shareNews(detail)
              }}>
              <i className="iconfont icon-fenxiang1 detail-fenxiang"></i>分享投票</div>
          </div>
          <div className={styles.currentNews}>
            <div className={styles.bodyLeft}>
              <div className={styles.voteTitle}>{detail.title}</div>
            </div>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.otherTitle}>投票列表：</span>
            </div>
            <div className={styles.voteList}>
              {
                detail.voteList && detail.voteList.map((item, index)=> {
                  return (
                    <div className={styles.voteItem}>
                      <div className={styles.index}>{index + 1}.</div>
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.zan}><i className="iconfont icon-zan1" style={{color: '#d43d3d', fontSize: '21px'}}></i> <span className={styles.voteZan}>{item.zan}</span></div>
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
