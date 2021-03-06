import styles from './index.css'
import { Icon, Breadcrumb } from 'antd'
import Link from 'umi/link'

export default function({current, type}) {
  return (
    <div className={styles.content}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item><Link to="/home/">首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{ type === 'jk' ? '监控设备' : '数据统计' }</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.title}>{current.name}</div>
      <div className={styles.type}>
        <div className={styles.item}>
          <Link to={`/video/?id=${current.id}&type=jk`}><img src={require('../../../../assets/jiankong.png')} alt="监控设备"/></Link>
          { type === 'jk' ? <Icon type="caret-down" style={{fontSize: '18px', color: '#3992d6'}} />: ''}
        </div>
        <div className={styles.item}>
          <Link to={`/video/?id=${current.id}&type=tj`}><img src={require('../../../../assets/shujutongji.png')} alt="统计数据"/></Link>
          { type === 'tj' ?  <Icon type="caret-down" style={{fontSize: '18px', color: '#e76650'}} /> : ''}
        </div>
      </div>
    </div>
  )
}
