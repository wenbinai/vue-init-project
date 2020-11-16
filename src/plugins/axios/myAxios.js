import axios from 'axios'
import { Authorization } from '@/utils/const'
import Vue from 'vue'
const myAxios = axios.create({
  baseURL: '/api/'
})

myAxios.interceptors.request.use(
  req => {
    const auth = localStorage.getItem('token')
    if (auth != null) {
      req.headers[Authorization] = auth
    }
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

myAxios.interceptors.response.use(
  resp => resp,
  error => {
    console.log('error =>', error)
    const resp = error.response
    if (resp) {
      console.log(resp)
      switch (resp.data.status) {
        case 401:
          console.log(resp.data.message)
          Vue.prototype.$msg.fail(resp.data.message)
          break
          // store.commit(GET_EXCEPTION, { message: resp.data.message })
        case 404:
          Vue.prototype.$msg.fail(resp.data.message)
          break
        default:
          Vue.prototype.$toast.fail({
            message: '操作失败,请重试',
            forbidClick: true,
            duration: 2000
          })
      }
    }
  }
)
export default myAxios
