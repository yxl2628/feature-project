import React from 'react'
import Content from '../Content'
import Download from '../Download'
import Vote from '../Vote'
import styles from './index.css'

function NewsList({newsList, shareNews, color, current, vote, dispatch}){
  return (
    <div className={styles.list}>
      {
        newsList.map((item,index) => {
          if (item.type === '2') {
            return (<Download key={`${item.code}-${index}`} item={item} shareNews={shareNews} current={current}></Download>)
          } else if (item.type === '3') {
            return (<Vote key={`${item.code}-${index}`} item={item} shareNews={shareNews} current={current} vote={vote}></Vote>)
          } else {
            return (<Content key={`${item.code}-${index}`} item={item} shareNews={shareNews} color={color} current={current} dispatch={dispatch}></Content>)
          }
        })
      }
    </div>
  )
}

NewsList.propTypes = {
}

export default NewsList
