import * as mobileService from '../services/mobile'
import { ActionSheet } from 'antd-mobile'

export default {
  namespace: 'mobile',
  state: {
    current: '',
    list: [],
    newsList: [],
    show: true,
    detail: null,
    showFixed: 'none',
    color: {},
    json: {},
    name: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        ActionSheet.close()
        if (pathname === '/mobile/') {
          dispatch({type: 'getNewsList', payload: {category: query.category}})
        }
        if (pathname === '/mobile/detail/' || pathname === '/mobile/download/' || pathname === '/mobile/vote/') {
          dispatch({type: 'getNewsDetail', payload: {id: query.id, category: query.category, fromCategory: query.fromCategory}})
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          dispatch({type: 'infoPraiseReadingShare', payload: {id: query.id, category: query.fromCategory, type: 'reading'}})
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
      let infoCodes = []
      result&&result.forEach(item => {
        item.read = 0
        item.praise = 0
        item.share = 0
        infoCodes.push(item.code)
      })
      yield put({type: 'getInfoPraiseReading', payload: {category, infoCodes}})
      yield put({type: 'setNewsList', payload: {list: result}})
    },
    *getNewsDetail({ payload: {id, category, fromCategory} }, { call, put, select }) {
      const list = yield call(mobileService.getMenuList)
      yield put({type: 'setMenuList', payload: {list}})
      const json = yield select(state=>state.mobile.json)
      yield put({type: 'setCurrent', payload: {category: fromCategory}})
      const result = yield call(mobileService.getNewsList, {enName: json[category]})
      if (result) {
        const detail = result.find((item) => {
          return item.code.toString() === id.toString()
        })
        yield put({type: 'setNewsDetail', payload: {detail}})
        yield put({type: 'setNewsList', payload: {list: result}})
        yield put({type: 'getVoteItems', payload: {ids: detail.code}})
      }
    },
    *getInfoPraiseReading({ payload: {category, infoCodes} }, { call, put, select }) {
      const result = yield call(mobileService.getInfoPraiseReading, {category, infoCodes})
      yield put({type: 'setReadingPraiseReading', payload: {result}})
    },
    *infoPraiseReadingShare({ payload: {category, id, type} }, { call, put, select }) {
      yield call(mobileService.infoPraiseReadingShare, {category, id, type})
    },
    *getVoteItems({ payload: {ids} }, { call, put, select }) {
      const result = yield call(mobileService.getVoteItems, {ids: ids})
      yield put({type: 'setVoteItems', payload: {result}})
    },
    *voteItems({ payload: {voteCode, itemCode} }, { call, put, select }) {
      yield call(mobileService.voteItems, {voteCode, itemCode})
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
        if (item.code !== 'o') {
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
    setNewsDetail(state, { payload: { detail } }) {
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
            praise: info.praise,
            reading: info.reading,
            sharing: info.sharing
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
        item.voteItems.forEach(child => {
          vote[item.code + child.code] = child.vote
        })
      })
      detail.voteItems && detail.voteItems.forEach(item => {
        item.praise = vote[detail.code + item.code] || 0
      })
      return { ...state, detail }
    },
  },
}
