import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'

function DownlaodDetail({ pageData: { detail, newsList }}) {
  const descHtml = () => {
    return {__html: detail.desc}
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
            <span className={styles.downloadTitle}>文章下载步骤如下：</span>
          </div>
          <div className={styles.currentNews}>
            <div className={styles.bodyLeft}>
              <div className={styles.currentNewsTitle}>{detail.title}</div>
            </div>
          </div>
          <div className={styles.downlaodDetail}>
            <div className={styles.step}>
              第一步：关注公众号“”
              <div className={styles.step2}>方式一：微信中搜索公众号“”，并关注</div>
              <div className={styles.step2}>
                <img src={require('../../assets/qrcode.png')} className={styles.qrcode}/>
              </div>
              <div className={styles.step2}>方式二：扫描下方二维码</div>
            </div>
            <div className={styles.step}>第二步：在公众号后台回复“大数据”三个关键字</div>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.downloadTitle}>下载后可以获取的所有文章如下：</span>
            </div>
            <div className={styles.downloadDesc} dangerouslySetInnerHTML={descHtml()}></div>
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
