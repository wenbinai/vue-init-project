<template>
  <div class="login">
    <van-nav-bar
<<<<<<< HEAD
      title="登录"
=======
      title="登陆"
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="login"
              @failed="onFailed"
              ref="login-form"
              :show-error="false"
              :show-error-message="false"
              validate-first>
      <van-field
        v-model="user.username"
        name="手机号"
        label="手机号"
        placeholder="请输入您的手机号"
        :rules="[{ required: true, message: '请输入手机号' },
                 { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入您的密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
        <van-button  native-type="button" round block @click="forgetPassword">忘记密码</van-button>
        <van-button native-type="button" round block @click="$router.push('/register')">注册新用户</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { LOGIN } from '@/store/type'
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
    onFailed (error) {
      if (error.errors[0]) {
        this.$msg.fail({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    forgetPassword () {
      console.log('触发了忘记密码事件')
      this.$router.push('/forgetPassword')
    },
    async login () {
      console.log('第一步')
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      await this.$store.dispatch(LOGIN, this.user)
      console.log('最后一步')
      await this.$router.push('/')
      this.$toast.success('登陆成功')
    }
  }
}
</script>

<style scoped>

</style>
