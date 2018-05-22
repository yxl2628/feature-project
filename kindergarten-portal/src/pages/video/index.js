import styles from './index.css'
import youeryuanData from '../../assets/data.json'
import Redirect from 'umi/redirect'
import Header from './components/Header'
import JianKong from './components/JianKong'
import Tongji from './components/Tongji'

export default function(props) {
  const current = youeryuanData.find(value => {
    return `${value.id}` === props.location.query.id
  })
  const type = props.location.query.type ? props.location.query.type : 'jk'

  if (current) {
    return (
      <div className={styles.content}>
        <Header current={current} type={type} />
        <div className={styles.main}>
        {
          type === 'jk' ? <JianKong /> : <Tongji />
        }
        </div>
      </div>
    )
  } else {
    return <Redirect to="/404" />
  }
}
