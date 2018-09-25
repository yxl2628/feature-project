import React from 'react'
import styles from './index.css'
import addStyles from '../ReadingPraiseShare/index.css'
import Item from './Item'

function VoteItem({code, voteItems, dispatch}) {
  return (
    <div className={styles.voteList}>
      {
        voteItems.map((item, index)=> {
          return <Item key={index} index={index} code={code} item={item} dispatch={dispatch}></Item>
        })
      }
    </div>
  )
}

export default VoteItem
