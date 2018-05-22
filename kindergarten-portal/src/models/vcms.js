import * as vcmsService from '../services/vcms'

export default {
  namespace: 'vcms',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/video/detail') {
          // dispatch({type: 'getEpgList', payload: {start_time_from: '2018-01-01T00:00:00.000Z', start_time_to: '2018-05-22T07:45:44.999Z'}})
        }
      });
    },
  },
  effects: {
    *getEpgList({ payload: {start_time_from, start_time_to} }, { call, put }) {
      const result = yield call(vcmsService.getEpgList, { start_time_from, start_time_to })
      console.log(result)
    },
  },
  reducers: {
    setUser(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
