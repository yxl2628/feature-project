import * as vcmsService from '../services/vcms'
import moment from 'moment-timezone'

export default {
  namespace: 'vcms',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/video/detail/' || pathname === '/video/back/') {
          const now =  moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
          dispatch({type: 'getEpgList', payload: {start_time_from: '2018-01-01T00:00:00.000Z', start_time_to:now}})
        }
      });
    },
  },
  effects: {
    *getEpgList({ payload: {start_time_from, start_time_to} }, { call, put }) {
      const result = yield call(vcmsService.getEpgList, { start_time_from, start_time_to })
      const resultStr = JSON.stringify(result).replace(/\d+\.\d+\.\d+\.\d+/gi, '218.205.169.222')
      yield put({type: 'setEpgList', payload: JSON.parse(resultStr)})
    },
  },
  reducers: {
    setEpgList(state, { payload }) {
      const list = {}
      const exist = []
      payload.forEach(item => {
        const date = item.start_time.substring(5,10)
        const month = item.start_time.substring(5,7)
        exist.push(month,date)
        if (list[date]) {
          list[date].concat(list[date], item.streams)
        } else {
          list[date] = item.streams
        }
      })
      return { ...state, exist, list }
    }
  },
}
