import styles from './index.less'
import NavBar from '../../components/PCNavBar'
import Share from '../../components/PCShare'
import Footer from '../../components/PCSubFooter'
import FixedMenu from '../../components/PCFixedMenu'
import { connect } from 'dva'

function PCDownload({ pageData: { detail, newsList, current, color, name, showFixed }, location: {query}, dispatch}) {
  const descHtml = () => {
    if (detail.detail) {
      return {__html: detail.detail.replace(/\n/gm, '<br />')}
    } else {
      return {__html: detail.detail}
    }
  }
  return (
    <div className={styles.content}>
      <NavBar current={current} name={name[current]}></NavBar>
      <div className={styles.detail}>
        <div className={styles.current}>
          <span className={styles.title}>文章下载步骤如下：</span>
          <span className={styles.share}>
            <Share item={detail} current={current} dispatch={dispatch}><i className="iconfont icon-fenxiang1 pc-detail-fenxiang"></i>分享下载</Share>
          </span>
        </div>
        <div className={styles.download}>
          <div className={styles.step}>
            <span className={styles.stepTitle}>第一步：</span>关注公众号“机器森林”
            <div className={styles.step2}>方式一：微信中搜索公众号“机器森林”，并关注</div>
            <div className={styles.step2}>方式二：扫描下方二维码</div>
            <div className={styles.step2}>
              <img src={require('../../assets/qrcode.png')} className={styles.qrcode} alt=""/>
            </div>
          </div>
          <div className={styles.step}><span className={styles.stepTitle}>第二步：</span>在公众号后台回复“<span className={styles.keyword}>{detail.typeDes}</span>”三个关键字</div>
        </div>
        <div className={styles.current}>
          <span className={styles.title}>下载后可获取的资料列表：</span>
        </div>
        <div className={styles.downloadDesc} dangerouslySetInnerHTML={descHtml()}></div>
      </div>
      <Footer current={current}></Footer>
      <FixedMenu showFixed={showFixed} dispatch={dispatch}></FixedMenu>
    </div>
  )
}


PCDownload.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(PCDownload)
