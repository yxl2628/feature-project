import React from 'react'
import Content from '../Content'
import Download from '../Download'
import Vote from '../Vote'
import styles from './index.css'

function NewsList({newsList, shareNews}) {
  return (
    <div className={styles.list}>
      {
        newsList.map((item) => {
          if (item.key === 'xiazai') {
            return (<Download key={item.id} item={item} shareNews={shareNews}></Download>)
          } else if (item.key === 'toupiao') {
            return (<Vote key={item.id} item={item} shareNews={shareNews}></Vote>)
          } else {
            return (<Content key={item.id} item={item} shareNews={shareNews}></Content>)
          }
        })
      }
    </div>
  )
}

NewsList.propTypes = {
}

export default NewsList
