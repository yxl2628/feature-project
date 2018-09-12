import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import utils from '../../utils'

function NewsDetail({ pageData: { detail, newsList }}) {
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
