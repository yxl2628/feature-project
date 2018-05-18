import styles from './index.css'
import youeryuanData from '../../assets/data.json'
import Redirect from 'umi/redirect'

export default function(props) {
  const current = youeryuanData.find(value => {
    return value.id == props.location.query.id
  })
  if (current) {
    return (
      <div className={styles.content}>
        <div className={styles.title}>{current.name}</div>
      </div>
    )
  } else {
    return <Redirect to="/404" />
  }
}
