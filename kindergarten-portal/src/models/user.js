import * as userService from '../services/user'
import CryptoJS from 'crypto-js'
import router from 'umi/router'

export default {
  namespace: 'user',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  effects: {
    *login({ payload: {account, password} }, { call, put }) {
      const result = yield call(userService.login, { account, password })
      if (result) {
        const _res = JSON.stringify(result)
        const _info = CryptoJS.AES.encrypt(_res, 'startimes ott')
        sessionStorage.setItem('_info', _info)
        yield put({ type: 'setUser', payload: result })
        router.push('/home')
      }
    },
  },
  reducers: {
    setUser(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
