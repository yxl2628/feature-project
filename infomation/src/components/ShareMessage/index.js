import styles from './index.css'
function ShowMessage({show}) {
  return (
    <div className={styles.shareInput}>
      {show}
    </div>
  )
}
export default ShowMessage
