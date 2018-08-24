import Header from '../../components/Header'
import styles from './index.css'
import { connect } from 'dva'
import NavLink from 'umi/navlink'
import { Button } from 'antd-mobile'

function NewsDetail({pageData: {detail, newsList}}) {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Header></Header>
      </div>
      {
        detail ? (
          <div className={styles.detail}>
            <div className={styles.navbar}><NavLink to='/mobile/'>首页</NavLink> / {detail.type}</div>
            <div className={styles.currentNews}>
              <div className={styles.currentNewsTitle}>{detail.title}</div>
              <div className={styles.btngroup}>
                <span className={styles.read}><i className="iconfont icon-yuedu"></i>{detail.read}</span>
                <span className={styles.zan}><i className="iconfont icon-zan1"></i>{detail.zan}</span>
                <div className={styles.view}><Button type="primary" size="small" inline onClick={() => {
                  window.location.href = detail.link
                }}>点击查看</Button></div>
              </div>
            </div>
            <div className={styles.otherNews}>
              <div className={styles.otherHeader}>
                <span className={styles.otherTitle}>极力推荐：</span>
              </div>
              <div className={styles.list}>
                {newsList.map((item => (
                  item.id !== detail.id ? <div key={item.id} className={styles.item}>
                    <div className={styles.newsTitle}>{item.title}</div>
                    <div className={styles.btngroup}>
                      <span className={styles.read}><i className="iconfont icon-yuedu"></i>{detail.read}</span>
                      <span className={styles.zan}><i className="iconfont icon-zan1"></i>{detail.zan}</span>
                      <div className={styles.view}><Button type="primary" size="small" inline onClick={() => {
                        window.location.href = detail.link
                      }}>点击查看</Button></div>
                    </div>
                  </div> : ''
                )))}
              </div>
            </div>
          </div>
        ) : ''
      }
    </div>

  )
}

NewsDetail.propTypes = {
}

export default connect(state => {
    return {
        pageData: state.mobile
    }
})(NewsDetail)
