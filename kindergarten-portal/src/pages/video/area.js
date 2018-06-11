import styles from './index.css'
import youeryuanData from '../../assets/data.json'
import Redirect from 'umi/redirect'
import Tongji from './components/AreaTongji'
import { Breadcrumb } from 'antd'
import Link from 'umi/link'

export default function(props) {
  const name = decodeURIComponent(props.location.query.name)
  const areaList = youeryuanData.filter(value => {
    if (value.area === name && value.status === 1) {
      return value
    } else {
      return null
    }
  })

  if (areaList.length > 0) {
    return (
      <div className={styles.content}>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item><Link to="/home/">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>区县数据统计</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.main}>
        <Tongji name={name} list={areaList}/>
        </div>
      </div>
    )
  } else {
    return <Redirect to="/404" />
  }
}
