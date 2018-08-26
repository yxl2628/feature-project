import React from 'react'
import styles from './index.css'
// import NativeShare from 'nativeshare'
import NavLink from 'umi/navlink'

// const nativeShare = new NativeShare()

function Content({item}) {
  const share = (item) => {
    // nativeShare.setShareData({
    //   title: item.title,
    //   desc: 'duanbao123.com 优质且有价值的信息',
    //   link: window.location.origin + '/mobile/detail/?id=' + item.id
    // })
    // try {
	  //   nativeShare.call()
    // } catch(err) {
    //   // 如果不支持，你可以在这里做降级处理
    //   alert('浏览器不支持分享功能，请使用浏览器自带的分享功能')
    // }
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}><NavLink to={`detail/?id=${item.id}&key=${item.key}`}>{item.title}</NavLink></div>
        <div className={styles.footer}>
          <div className={styles.left}>
            {item.id%2 !== 0 ? <span className={styles.zt}>专题</span> : ''}<span className={styles.source}>{item.source}</span>
          </div>
          <div className={styles.right}>
            {item.type ? <span className={styles[item.key]}>{item.type}</span> : ''}
          </div>
        </div>
      </div>
      <div className={styles.btngroup}>
        <span className={styles.read}><i className="iconfont icon-yuedu"></i>{item.read}</span>
        <span className={styles.zan}><i className="iconfont icon-zan1"></i>{item.zan}</span>
        <span className={styles.share} onClick={() => {
            share(item)
          }}><i className="iconfont icon-fenxiang1"></i>8972</span>
      </div>
    </div>
  )
}

Content.propTypes = {
}

export default Content
