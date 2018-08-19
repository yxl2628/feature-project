import React from 'react'
import Content from '../Content'

function NewsList({newsList}) {
  return (
    <div>
      {
        newsList.map((item) => (<Content key={item.id} item={item}></Content>))
      }
    </div>
  )
}

NewsList.propTypes = {
}

export default NewsList
