import Vue from 'vue'
import Vuex from 'vuex'
import {GET_EXCEPTION, LOGIN, SEND_CODE} from '@/store/type'
import myAxios from '@/plugins/axios/myAxios'

Vue.use(Vuex)

const myState = {
  token: '',
  userInfo: '',
  exception: {
    message: ''
  },
  secret: ''
}

const myMutations = {
  [LOGIN](state, data) {
    console.log('data-->' + data)
    // state.exception.message = ''
    console.log('第四步')
    state.token = data
    localStorage.setItem('token', state.token)
<<<<<<< HEAD
    // console.log('存储token完毕')
    // console.log('state.token -->' + state.token)
    // console.log(state.token)
=======
    console.log('存储token完毕')
    console.log('state.token -->' + state.token)
    console.log(state.token)
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
  },
  [GET_EXCEPTION](state, data) {
    state.exception = data
  },
  [SEND_CODE](state, data) {
    console.log('data-->' + data)
    state.secret = data
  }
}

const myActions = {
  async [LOGIN]({commit}, data) {
    console.log('第二步')
    console.log(JSON.stringify(data))
    const resp = await myAxios({
      method: 'POST',
      url: 'login',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('第三步')
    // console.log(resp.headers)
    console.log('resp.data -->' + JSON.stringify(resp.data))
    console.log(resp.data.role)
    /**
     *      同步方法
     */
    commit(LOGIN, resp.headers.authorization)
  },
  async [SEND_CODE]({commit}, data) {
    console.log(data)
    const resp = await myAxios({
      method: 'GET',
      url: `/communist/code/${data}`
    })
    console.log(resp)
    commit(SEND_CODE, resp.data.secret)
  }
}

const store = new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
})
export default store
