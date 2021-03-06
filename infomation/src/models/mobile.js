import * as mobileService from '../services/mobile'
import { ActionSheet } from 'antd-mobile'
import utils from '../utils'

export default {
  namespace: 'mobile',
  state: {
    current: '',
    list: [],
    newsList: [],
    show: true,
    detail: {},
    showFixed: 'none',
    color: {},
    json: {},
    name: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        ActionSheet.close()
        if (pathname === '/mobile/' || pathname === '/pc/') {
          dispatch({type: 'getNewsList', payload: {category: query.category}})
          document.title = 'chabao123.com-每个人都最值得阅读的高品质科技信息！'
        }
        if (['/mobile/detail/', '/mobile/download/', '/mobile/vote/'].indexOf(pathname) >= 0) {
          dispatch({type: 'getNewsDetail', payload: {id: query.id, category: query.category, fromCategory: query.fromCategory, share: query.share}})
        }
        if (['/pc/detail/', '/pc/download/', '/pc/vote/'].indexOf(pathname) >= 0) {
          dispatch({type: 'getNewsDetail', payload: {id: query.id, category: query.category, fromCategory: query.fromCategory}})
        }
      })
    },
  },
  effects: {
    *getNewsList({ payload: {category} }, { call, put, select }) {
      const list = yield call(mobileService.getMenuList)
      yield put({type: 'setMenuList', payload: {list}})
      const json = yield select(state => state.mobile.json)
      yield put({type: 'setCurrent', payload: {category: category}})
      const result = yield call(mobileService.getNewsList, {enName: json[category]})
      let infoCodes = [], voteCodes = []
      result&&result.forEach(item => {
        item.read = 0
        item.praise = 0
        item.share = 0
        if (item.type === '3') {
          voteCodes.push(item.code)
        } else {
          infoCodes.push(item.code)
        }
      })
      yield put({type: 'getInfoPraiseReading', payload: {category, infoCodes}})
      yield put({type: 'getVoteItems', payload: {ids: voteCodes}})
      yield put({type: 'setNewsList', payload: {list: result}})
      setTimeout(function() {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 100)
    },
    *getNewsDetail({ payload: {id, category, fromCategory, share} }, { call, put, select }) {
      const list = yield call(mobileService.getMenuList)
      yield put({type: 'setMenuList', payload: {list}})
      const json = yield select(state=>state.mobile.json)
      yield put({type: 'setCurrent', payload: {category: fromCategory}})
      const result = yield call(mobileService.getNewsList, {enName: json[category]})
      if (result) {
        const detail = result.find((item) => {
          return item.code.toString() === id.toString()
        })
        yield put({type: 'setNewsDetail', payload: {detail, share}})
        yield put({type: 'setNewsList', payload: {list: result}})
        yield put({type: 'getVoteItems', payload: {ids: detail.code}})
      }
    },
    *getInfoPraiseReading({ payload: {category, infoCodes} }, { call, put, select }) {
      const result = yield call(mobileService.getInfoPraiseReading, {category, infoCodes})
      yield put({type: 'setReadingPraiseReading', payload: {result}})
    },
    *infoPraiseReadingShare({ payload: {category, id, type, goto} }, { call, put, select }) {
      const result = yield call(mobileService.infoPraiseReadingShare, {category, id, type})
      if (goto) {
        window.location.href = goto
      }
      yield put({type: 'updateItem', payload: {current: result}})
    },
    *getVoteItems({ payload: {ids} }, { call, put, select }) {
      if (ids) {
        const result = yield call(mobileService.getVoteItems, {ids: ids})
        yield put({type: 'setVoteItems', payload: {result}})
      }
    },
    *voteItems({ payload: {voteCode, itemCode} }, { call, put, select }) {
      yield call(mobileService.voteItems, {voteCode, itemCode})
      yield put({type: 'getVoteItems', payload: {ids: voteCode}})
    },
  },
  reducers: {
    setMenuList(state, { payload: { list } }) {
      const color = {}, json = {}, name = {}, newList = []
      for(let i in list) {
        const item = list[i]
        color[item.code] = item.color
        json[item.code] = item.enName
        name[item.code] = item.name
        if (item.name !== '投票') {
          newList.push(item)
        }
      }
      return { ...state, list: newList, color, json, name }
    },
    setCurrent(state, { payload: { category } }) {
      return { ...state, current: category }
    },
    setNewsList(state, { payload: { list } }) {
      return { ...state, newsList: list }
    },
    setNewsDetail(state, { payload: { detail, share } }) {
      setTimeout(function() {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        if (share) {
          detail.url = window.location.href
          utils.share(detail)
        }
      }, 100)
      document.title = detail.title
      return { ...state, detail }
    },
    changeMenu(state, { payload: { show } }) {
      return { ...state, show }
    },
    setFixedMenu(state, { payload: { showFixed } }) {
      return { ...state, showFixed }
    },
    setReadingPraiseReading(state, { payload: { result } }) {
      const {newsList, current} = state, infoCode = {}
      result && result.forEach(item=>{
        item && item.infoDTOS && item.infoDTOS.forEach(info => {
          infoCode[item.categoryCode + info.code] = {
            praise: info.praise > 9999 ? Math.round(parseFloat(info.praise/10000)*10)/10 + '万' : info.praise,
            reading: info.reading > 9999 ? Math.round(parseFloat(info.reading/10000)*10)/10 + '万' : info.reading,
            sharing: info.sharing > 9999 ? Math.round(parseFloat(info.sharing/10000)*10)/10 + '万' : info.sharing
          }
        })
      })
      newsList && newsList.forEach(item => {
        if (infoCode[current + item.code]) {
          item.praise = infoCode[current + item.code].praise
          item.read = infoCode[current + item.code].reading
          item.share = infoCode[current + item.code].sharing
        }
      })
      return { ...state, newsList }
    },
    setVoteItems(state, { payload: { result } }) {
      const detail = state.detail, vote = {}
      result && result.forEach(item => {
        vote[item.code] = item.total
        item.voteItems.forEach(child => {
          vote[item.code + child.code] = child.vote
        })
      })
      detail.voteItems && detail.voteItems.forEach(item => {
        item.praise = vote[detail.code + item.code] || 0
      })
      return { ...state, detail, vote }
    },
    updateItem(state, { payload: { current } }) {
      const newsList = state.newsList
      newsList && newsList.forEach(item => {
        if (item.code === current.code) {
          item.praise = current.praise > 9999 ? Math.round(parseFloat(current.praise/10000)*10)/10 + '万' : current.praise
          item.read = current.reading > 9999 ? Math.round(parseFloat(current.reading/10000)*10)/10 + '万' : current.reading
          item.share = current.sharing > 9999 ? Math.round(parseFloat(current.sharing/10000)*10)/10 + '万' : current.sharing
        }
      })
      return { ...state, newsList }
    },
  },
}
