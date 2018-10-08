import styles from './index.less'
import Header from '../../components/PCHeader'
import NavBar from '../../components/PCNavBar'
import Share from '../../components/PCShare'
import Footer from '../../components/PCFooter'
import FixedMenu from '../../components/PCFixedMenu'
import VoteItem from '../../components/VoteItem'
import { connect } from 'dva'

function PCVote({ pageData: { detail, newsList, current, color, name, showFixed }, location: {query}, dispatch}) {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <NavBar current={current} name={name[current]}></NavBar>
      <div className={styles.detail}>
        <div className={styles.current}>
          <span className={styles.title}>投票主题：</span>
          <span className={styles.share}>
            <Share item={detail} current={current} dispatch={dispatch}><i className="iconfont icon-fenxiang1 pc-detail-fenxiang"></i>分享投票</Share>
          </span>
        </div>
        <div className={styles.item}>
          <div className={styles.vote}><a href={detail.detail}>{detail.subtitle}</a></div>
        </div>
        <div className={styles.current}>
          <span className={styles.title}>投票列表：</span>
        </div>
        {detail.voteItems ? (
          <VoteItem code={detail.code} voteItems={detail.voteItems} dispatch={dispatch}></VoteItem>
        ) : ''}
      </div>
      <Footer></Footer>
      <FixedMenu showFixed={showFixed} dispatch={dispatch}></FixedMenu>
    </div>
  )
}


PCVote.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(PCVote)
