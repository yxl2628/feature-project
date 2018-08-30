import React from 'react'
import Content from '../Content'
import styles from './index.css'

function NewsList({newsList, shareNews}) {
  return (
    <div className={styles.list}>
      {
        newsList.map((item) => (<Content key={item.id} item={item} shareNews={shareNews}></Content>))
      }
    </div>
  )
}

NewsList.propTypes = {
}

export default NewsList
