import React from 'react'
import Content from '../Content'
import Download from '../Download'
import Vote from '../Vote'
import styles from './index.css'
import {PullToRefresh} from 'antd-mobile'

class NewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight - 45,
      down: true
    }
  }

  render() {
    const {newsList, shareNews, color, current, vote,  dispatch, query} = this.props
    return (
      <PullToRefresh  damping={60} ref={el => this.ptr = el} style={{
          height: this.state.height,
          overflow: 'auto',
        }} indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }} refreshing={this.state.refreshing}
        onRefresh={() => {
          dispatch({type: 'mobile/getNewsList', payload: {category: query.category}})
        }}>
        <div className={styles.list}>
          {
            newsList.map((item,index) => {
              if (item.type === '2') {
                return (<Download key={`${item.code}-${index}`} item={item} shareNews={shareNews} current={current}></Download>)
              } else if (item.type === '3') {
                return (<Vote key={`${item.code}-${index}`} item={item} shareNews={shareNews} current={current} vote={vote}></Vote>)
              } else {
                return (<Content key={`${item.code}-${index}`} item={item} shareNews={shareNews} color={color} current={current}></Content>)
              }
            })
          }
        </div>
      </PullToRefresh>
    )
  }
}

NewsList.propTypes = {
}

export default NewsList
