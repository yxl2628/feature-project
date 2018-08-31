import Header from '../../components/Header'
import Menu from '../../components/Menu'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'
import NativeShare from 'nativeshare'
import {ActionSheet} from 'antd-mobile'

const nativeShare = new NativeShare()

function MobileIndex({pageData}) {
  const shareNews = (item) => {
    nativeShare.setShareData({
      icon: '//47.92.104.253:5656/static/logo.jpg',
      link: item.url,
      title: item.title,
      desc: 'xuan123.com - 每天看一点最有价值的信息',
      from: 'xuan123.com'
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
          message: item.url,
        })
      }
    }
  }
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      <div className={styles.content}>
        <Menu></Menu>
        <NewsList newsList={pageData.newsList} shareNews={shareNews}></NewsList>
      </div>
    </div>

  )
}

MobileIndex.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(MobileIndex)
