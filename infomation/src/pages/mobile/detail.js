import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import NativeShare from 'nativeshare'
import {ActionSheet} from 'antd-mobile'

const nativeShare = new NativeShare()

function NewsDetail({ pageData: { detail, newsList }}) {
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
            <span className={styles.currentTitle}>本次想看的文章</span>
            <span className={styles.share} onClick={() => {
                shareNews(detail)
              }}>
              <i className="iconfont icon-fenxiang1 detail-fenxiang"></i>分享文章</span>
          </div>
          <div className={styles.currentNews}>
            <div className={styles.bodyLeft}>
              <div className={styles.currentNewsTitle}>{detail.title}</div>
              <div className={styles.footer}>
                <div className={styles.left}>
                  {
                    detail.type
                      ? <span className={styles[detail.key]}>{detail.type}</span>
                      : ''
                  }
                </div>
                <div className={styles.right}>
                  <span className={styles.source}>{detail.source}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.otherTitle}>专题相关推荐</span>
            </div>
            <div className={styles.list}>
              {
                newsList.map((item => (
                  item.id !== detail.id
                  ? <div key={item.id} className={styles.item}>
                    <NavLink to={`${item.url}`} className={styles.bodyLeft}>
                      <div className={styles.newsTitle}>{item.title}</div>
                      <div className={styles.footer}>
                        <div className={styles.left}>
                          {
                            detail.type
                              ? <span className={styles[detail.key]}>{detail.type}</span>
                              : ''
                          }
                        </div>
                        <div className={styles.right}>
                          <span className={styles.source}>{detail.source}</span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                  : '')))
              }
            </div>
          </div>
        </div>)
        : ''
    }
  </div>)
}

NewsDetail.propTypes = {}

export default connect(state => {
  return {pageData: state.mobile}
})(NewsDetail)
