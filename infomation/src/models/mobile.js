import * as mobileService from '../services/mobile'
import { ActionSheet } from 'antd-mobile'

export default {
  namespace: 'mobile',
  state: {
    currentKey: '',
    list: [],
    newsList: [],
    show: true,
    detail: null,
    showFixed: 'none'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        ActionSheet.close()
        if (pathname === '/mobile/') {
          dispatch({type: 'getMenuList'})
        }
        if (pathname === '/mobile/detail/' || pathname === '/mobile/download/' || pathname === '/mobile/vote/') {
          dispatch({type: 'getNewsDetail', payload: {id: query.id, key: query.key}})
        }
      })
    },
  },
  effects: {
    *getMenuList({ payload }, { call, put }) {
      const result = yield call(mobileService.getMenuList)
      if (result) {
        yield put({type: 'setMenuList', payload: {list: result}})
        yield put({type: 'getNewsList', payload: {}})
      }
    },
    *getNewsList({ payload: {key} }, { call, put, select }) {
      let currentKey = yield select(state => state.mobile.currentKey)
      if (key !== undefined && key) {
        currentKey = key
      }
      yield put({type: 'setCurrentKey', payload: {key: currentKey}})
      const result = yield call(mobileService.getNewsList, {key: currentKey})
      if (result) {
        yield put({type: 'setNewsList', payload: {list: result}})
      }
    },
    *getNewsDetail({ payload: {id, key} }, { call, put, select }) {
      yield put({type: 'setCurrentKey', payload: {key: key}})
      const result = yield call(mobileService.getNewsList, {key: key})
      if (result) {
        const detail = result.find((item) => {
          return item.id.toString() === id.toString()
        })
        yield put({type: 'setNewsDetail', payload: {detail}})
        yield put({type: 'setNewsList', payload: {list: result}})
      }
    }
  },
  reducers: {
    setMenuList(state, { payload: { list } }) {
      let currentKey = ''
      if (list && list.length > 0) {
        currentKey = list[0].key
      }
      return { ...state, list, currentKey }
    },
    setCurrentKey(state, { payload: { key } }) {
      return { ...state, currentKey: key }
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
