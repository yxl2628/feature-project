import Header from '../../components/Header'
import Menu from '../../components/Menu'
import NewsList from '../../components/NewsList'
import styles from './index.css'
import { connect } from 'dva'
import {ActionSheet} from 'antd-mobile'
import utils from '../../utils'
import ShareMessage from '../../components/ShareMessage'

function MobileIndex({dispatch, pageData}) {
  const shareNews = (item) => {
    utils.share(item)
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
      <div className={styles.fixedMenu}>
        <div className={styles.top} onClick={()=>{
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }} style={{display: pageData.showFixed}}><i className="iconfont icon-top"></i></div>
        <div className={styles.top} onClick={()=> {
          if(window.navigator.userAgent.indexOf('UCBrowser') > -1) {
            window.location.href = 'ext:add_favorite'
          } else {
            ActionSheet.showShareActionSheetWithOptions({
              options: [],
              title: '收藏本站，方便下次查看',
              message: <ShareMessage show="1.点击浏览器下方菜单栏 -> 2. 点击“添加书签”"/>,
            })
          }
        }}><div className={styles.collection}>收藏</div><div className={styles.collection}>本站</div></div>
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
