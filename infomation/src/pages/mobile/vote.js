import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import utils from '../../utils'
import FixedMenu from '../../components/FixedMenu'
import VoteItem from '../../components/VoteItem'
import Footer from '../../components/Footer'

function VoteDetail({ pageData: { detail, newsList, current, name, showFixed }, dispatch}) {
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
            <NavLink to={`/mobile/?category=${current}`}>
              <i className="iconfont icon-shouye"></i>返回首页</NavLink>
            <span className={styles.arrow}>></span>{name[current]}</div>
          <div className={styles.otherHeader}>
            <div className={styles.currentTitle}>投票主题：</div>
            <div className={styles.share} onClick={() => {
                shareNews(detail)
              }}>
              <i className="iconfont icon-fenxiang1 detail-fenxiang"></i>分享投票</div>
          </div>
          <div className={styles.currentNews}>
            <div className={styles.bodyLeft}>
              <div className={styles.voteTitle}>{detail.subtitle}</div>
            </div>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.otherTitle}>投票列表：</span>
            </div>
            {detail.voteItems ? (
              <VoteItem code={detail.code} voteItems={detail.voteItems} dispatch={dispatch}></VoteItem>
            ) : ''}
          </div>
        </div>)
        : ''
    }
    <Footer></Footer>
    <FixedMenu showFixed={showFixed} dispatch={dispatch}></FixedMenu>
  </div>)
}

VoteDetail.propTypes = {}

export default connect(state => {
  return {pageData: state.mobile}
})(VoteDetail)
