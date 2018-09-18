import fetch from 'dva/fetch'

function checkStatus(response) {
  if (response.status === 200) {
    return response.json()
  } else if (response.status === 204) {
    return 204
  } else {
    console.log('network error')
    return 400
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(arr) {
  //增加options的封装
  let options = {
    method: arr.method,
    mode: 'cors',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json;charset=utf-8"
    }
  }
  let real_url = arr.url
  if (arr.method === 'POST' || arr.method === 'PUT') {
    if (arr.body !== undefined && arr.body) {
      options.body = JSON.stringify(arr.body)
    } else {
      options.body = JSON.stringify(arr.params)
    }
  } else {
    real_url = real_url + '?'
    for (let key in arr.params) {
      real_url += key + '=' + arr.params[key] + '&'
    }
    real_url = real_url.substr(0, real_url.length - 1)
  }
  return fetch(real_url, options)
    .then(checkStatus)
}
