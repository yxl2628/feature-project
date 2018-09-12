import Header from '../../components/Header'
import styles from './index.css'
import {connect} from 'dva'
import NavLink from 'umi/navlink'
import utils from '../../utils'

function DownlaodDetail({ pageData: { detail, newsList }}) {
  const descHtml = () => {
    return {__html: detail.desc}
  }
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
            <span className={styles.currentTitle}>文章下载步骤如下：</span>
            <span className={styles.share} onClick={() => {
                shareNews(detail)
              }}>
              <i className="iconfont icon-fenxiang1 detail-fenxiang"></i>分享下载</span>
          </div>
          <div className={styles.downlaodDetail}>
            <div className={styles.step}>
              <span className={styles.stepTitle}>第一步：</span>关注公众号“机器森林”
              <div className={styles.step2}>方式一：微信中搜索公众号“机器森林”，并关注</div>
              <div className={styles.step2}>方式二：扫描下方二维码</div>
              <div className={styles.step2}>
                <img src={require('../../assets/qrcode.png')} className={styles.qrcode} alt=""/>
              </div>
            </div>
            <div className={styles.step}><span className={styles.stepTitle}>第二步：</span>在公众号后台回复“<span className={styles.keyword}>大数据</span>”三个关键字</div>
          </div>
          <div className={styles.otherNews}>
            <div className={styles.otherHeader}>
              <span className={styles.currentTitle}>下载后可获取的资料列表：</span>
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
