import React from 'react'
import Content from '../Content'
import Download from '../Download'
import Vote from '../Vote'
import styles from './index.css'

function NewsList({newsList, shareNews, color, current}) {
  return (
    <div className={styles.list}>
      {
        newsList.map((item) => {
          if (item.type === '2') {
            return (<Download key={item.code} item={item} shareNews={shareNews}></Download>)
          } else if (item.type === '3') {
            return (<Vote key={item.code} item={item} shareNews={shareNews}></Vote>)
          } else {
            return (<Content key={item.code} item={item} shareNews={shareNews} color={color} current={current}></Content>)
          }
        })
      }
    </div>
  )
}

NewsList.propTypes = {
}

export default NewsList
