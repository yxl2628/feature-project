import Header from '../../components/Header'
import Menu from '../../components/Menu'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'
import NativeShare from 'nativeshare'
import {ActionSheet} from 'antd-mobile'
import ShareMessage from '../../components/ShareMessage'

const nativeShare = new NativeShare()

function MobileIndex({dispatch, pageData}) {
  const shareNews = (item) => {
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
          message: <ShareMessage show={item.url}/>,
        })
      }
    }
  }
  window.onscroll=function(){
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    const showFixed = scrollTop > 50 ? 'block' : 'none'
    dispatch({
      type: 'mobile/setFixedMenu',
      payload: { showFixed }
    })
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
      <div className={styles.fixedMenu} style={{display: pageData.showFixed}}>
        <div className={styles.top} onClick={()=>{
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }}><i className="iconfont icon-top"></i></div>
        <div className={styles.top} onClick={()=> {
          if(window.navigator.userAgent.indexOf('UCBrowser') > -1) {
            window.location.href = 'ext:add_favorite'
          } else {
            ActionSheet.showShareActionSheetWithOptions({
              options: [],
              title: '收藏本站',
              message: <ShareMessage show="点击浏览器下方的菜单->加入书签，收藏本站，方便下次查看"/>,
            })
          }
        }}><i className="iconfont icon-shoucang2"></i></div>
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
