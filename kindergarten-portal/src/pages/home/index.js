import JinZhongMap from './components/JinZhongMap'
import styles from './index.css'

export default function(props) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>晋中市幼儿园分布图表</div>
      <div className={styles.subTitle}>（请选择进入详情）</div>
      <JinZhongMap />
    </div>
  )
}
