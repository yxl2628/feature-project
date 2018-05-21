import styles from './index.css'
import Link from 'umi/link'

export default function({ current }) {
  return (
    <div className={styles.content}>
      监控详情
      <Link to={`/video/detail?id=${current.id}`}>详情</Link>
    </div>
  )
}
