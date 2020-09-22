<template>
  <div class="login">
    <h3>我是登陆页面</h3>
    <input v-model="user.username" placeholder="请输入用户名"/>
    <input v-model="user.password" placeholder="请输入密码" type="password"/>
    <button @click="login">登陆</button>
  </div>
</template>

<script>
import axios from '@/plugins/axios/MyAxios'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      console.log(axios.defaults.baseURL)
      const resp = await axios.post('login', this.user)
      console.log(resp)
    }
  }
}
</script>

<style scoped>

</style>
