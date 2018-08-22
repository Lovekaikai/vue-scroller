import axios from 'axios'
import qs from 'qs'
export default class Common {
  static req (url, param, successCallback, errorCallback) {
    param = param || {}
    let _p = new Promise((resolve, reject) => {
      axios({
        url: url,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          data: param
        })
      }).then((res) => {
        if (Number(res.data.errcode) === 0) {
          successCallback(res)

          resolve(res)
        } else {
          if (errorCallback === 'function') {
            errorCallback(res)
          }
        }
      }).catch((res) => {
        reject(res)
      })
    })
    return _p
  }
}
