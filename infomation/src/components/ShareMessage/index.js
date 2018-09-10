import styles from './index.css'
export default ({show}) => {
  return (
    <div className={styles.shareInput}>
      {show}
    </div>
  )
}
