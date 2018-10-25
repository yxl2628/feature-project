import styles from './index.less'
import NavBar from '../../components/PCNavBar'
import Share from '../../components/PCShare'
import Footer from '../../components/PCSubFooter'
import FixedMenu from '../../components/PCFixedMenu'
import { connect } from 'dva'

function PCDetail({ pageData: { detail, newsList, current, color, name, showFixed }, location: {query}, dispatch}) {
  const ztStyle = {
    color: `${color[query.category]}`
  }
  return (
    <div className={styles.content}>
      <NavBar current={current} name={name[current]}></NavBar>
      <div className={styles.detail}>
        <div className={styles.current}>
          <span className={styles.title}>本次想看的文章</span>
          <span className={styles.share}>
            <Share item={detail} current={current} dispatch={dispatch}><i className="iconfont icon-fenxiang1 pc-detail-fenxiang"></i>分享文章</Share>
          </span>
        </div>
        <div className={styles.item}>
          <div className={styles.title}><a href={detail.detail}>{detail.title}</a></div>
          <div className={styles.footer}>
            {detail.type === '1' ? <span className={styles.zt}>专题</span> : ''}
            <span className={styles.source}>{detail.actor}</span>
            <span className={styles.type} style={ztStyle}>{detail.belongCategoryName}</span>
          </div>
        </div>
        <div className={styles.current}>
          <span className={styles.title}>专题相关推荐</span>
        </div>
        <div className={styles.list}>
        {
          newsList.map(((item, index) => (
            item.code !== detail.code
            ? (
              <div key={index + item.code} className={styles.other}>
                <div className={styles.title}><a href={item.detail}>{item.title}</a></div>
                <div className={styles.footer}>
                  {item.type === '1' ? <span className={styles.zt}>专题</span> : ''}
                  <span className={styles.source}>{item.actor}</span>
                  <span className={styles.type} style={ztStyle}>{item.belongCategoryName}</span>
                </div>
              </div>
            )
            : '')))
        }
        </div>
      </div>
      <Footer current={current}></Footer>
      <FixedMenu showFixed={showFixed} dispatch={dispatch}></FixedMenu>
    </div>
  )
}


PCDetail.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(PCDetail)
