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
      const mapList = {}
      const exist = []
      payload.forEach(item => {
        const date = moment(item.start_time).format('MM-DD')
        const month = moment(item.start_time).format('MM')
        exist.push(month,date)
        item.streams.forEach(stream => {
          if(stream.status === 'RECORDING_SUCCESS') {
            stream.start_time = moment(item.start_time).format('HH:mm:ss')
            stream.end_time = moment(item.end_time).format('HH:mm:ss')
            if (list[date] === undefined) {
              list[date] = [stream.url]
              mapList[date] = [stream]
            } else {
              list[date].push(stream.url)
              mapList[date].push(stream)
            }
          }
        })
      })
      return { ...state, exist, list, mapList }
    }
  },
}
