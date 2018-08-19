import * as mobileService from '../services/mobile'

export default {
  namespace: 'mobile',
  state: {
    currentKey: '',
    list: [],
    newsList: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/mobile/') {
          dispatch({type: 'getMenuList'})
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
    }
  },
}
