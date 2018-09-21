import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import utils from '../../utils'
import FixedMenu from '../../components/FixedMenu'

function NewsDetail(props) {
  const { pageData: { detail, newsList, current, color, name, showFixed }, location: {query}, dispatch} = props

  const shareNews = (item) => {
    item.url = window.location.href
    utils.share(item)
  }
  const ztStyle = {
    color: `${color[query.category]}`,
    border: `1px solid ${color[query.category]}`
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
            <span className={styles.currentTitle}>本次想看的文章</span>
            <span className={styles.share} onClick={() => {
                shareNews(detail)
              }}>
              <i className="iconfont icon-fenxiang1 detail-fenxiang"></i>分享文章</span>
          </div>
          <div className={styles.currentNews}>
            <a onClick={()=> {
              dispatch({
                type: 'mobile/infoPraiseReadingShare',
                payload: {id: detail.code, category: query.fromCategory, type: 'reading'}
              })
              window.location.href = detail.detail
            }}>
              <div className={styles.bodyLeft}>
                <div className={styles.currentNewsTitle}>{detail.title}</div>
                <div className={styles.footer}>
                  <div className={styles.left}>
                    <span className={styles.type} style={ztStyle}>{detail.belongCategoryName}</span>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.source}>{detail.actor}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.otherTitle}>专题相关推荐</span>
            </div>
            <div className={styles.list}>
              {
                newsList.map((item => (
                  item.code !== detail.code
                  ? <div key={item.code} className={styles.item}>
                    <a className={styles.bodyLeft} onClick={()=> {
                      dispatch({
                        type: 'mobile/infoPraiseReadingShare',
                        payload: {id: item.code, category: query.fromCategory, type: 'reading'}
                      })
                      window.location.href = item.detail
                    }}>
                      <div className={styles.newsTitle}>{item.title}</div>
                      <div className={styles.footer}>
                        <div className={styles.left}>
                          <span className={styles.type} style={ztStyle}>{item.belongCategoryName}</span>
                        </div>
                        <div className={styles.right}>
                          <span className={styles.source}>{item.actor}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                  : '')))
              }
            </div>
          </div>
        </div>)
        : ''
    }
    <FixedMenu showFixed={showFixed} dispatch={dispatch}></FixedMenu>
  </div>)
}

NewsDetail.propTypes = {}

export default connect(state => {
  return {pageData: state.mobile}
})(NewsDetail)
