import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'

function DownlaodDetail({ pageData: { detail, newsList }}) {
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
            <span className={styles.currentTitle}>下载文章</span>
          </div>
          <div className={styles.currentNews}>
            <div className={styles.bodyLeft}>
              <div className={styles.currentNewsTitle}>{detail.title}</div>
            </div>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.otherTitle}>下载内容</span>
            </div>
            <div className={styles.list}>
              {detail.desc}
            </div>
          </div>
        </div>)
        : ''
    }
  </div>)
}

DownlaodDetail.propTypes = {}

export default connect(state => {
  return {pageData: state.mobile}
})(DownlaodDetail)
