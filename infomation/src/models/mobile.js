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
    json: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        ActionSheet.close()
        if (pathname === '/mobile/') {
          dispatch({type: 'getNewsList', payload: {category: query.category}})
        }
        if (pathname === '/mobile/detail/' || pathname === '/mobile/download/' || pathname === '/mobile/vote/') {
          dispatch({type: 'getNewsDetail', payload: {id: query.id, category: query.category}})
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
      yield put({type: 'getInfoPraiseReading', payload: {category: category}})
      yield put({type: 'setNewsList', payload: {list: result}})
    },
    *getNewsDetail({ payload: {id, category} }, { call, put, select }) {
      const list = yield call(mobileService.getMenuList)
      yield put({type: 'setMenuList', payload: {list}})
      const json = yield select(state=>state.mobile.json)
      yield put({type: 'setCurrent', payload: {category: category}})
      const result = yield call(mobileService.getNewsList, {enName: json[category]})
      if (result) {
        const detail = result.find((item) => {
          return item.code.toString() === id.toString()
        })
        yield put({type: 'setNewsDetail', payload: {detail}})
        yield put({type: 'setNewsList', payload: {list: result}})
      }
    },
    *getInfoPraiseReading({ payload: {category} }, { call, put, select }) {
      const result = yield call(mobileService.getInfoPraiseReading, {category: category})
      console.log(result)
    },
  },
  reducers: {
    setMenuList(state, { payload: { list } }) {
      const color = {}, json = {}
      for(let i in list) {
        const item = list[i]
        color[item.code] = item.color
        json[item.code] = item.enName
      }
      return { ...state, list, color, json }
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
    }
  },
}
