<template>
  <div class="forgetPasswordContainer">
    <Header title="忘记密码" :is-back=true ></Header>
    <van-form @submit="submitUpdatePassword"
              @failed="onFailed"
              ref="updatePassword-form"
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
        name="新密码"
        label="新密码"
        placeholder="请输入您的新密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
        v-model="user.confirmPassword"
        type="password"
        name="确认新密码"
        label="确认新密码"
        placeholder="确认新密码"
        :rules="[{ required: true, message: '请输入密码' },
                 { validator, message: '两次密码不一致' }]"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        name="code"
        :rules="[{ required: true, message: '请输入短信验证码' },
                 { pattern: /^\d{6}$/, message: '验证码格式错误' }]"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000*60"
            format="ss s"
            @finish="isCountDownShow = false">
          </van-count-down>
          <van-button v-else size="small" type="primary"
                      :loading="isSendSmsLoading"
                      @click.prevent="onSendSms">发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { SEND_CODE } from '@/store/type'
import { updatePassword } from '@/api/updatePassword'
export default {
  name: 'ForgetPassword',
  components: { Header },
  data () {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        code: ''
      },
      isCountDownShow: false,
      isSendSmsLoading: false
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
    validator () {
      console.log(this.user.password)
      console.log(this.user.confirmPassword)
      return this.user.password === this.user.confirmPassword
    },
    async submitUpdatePassword () {
      console.log('触发更新密码事件!')
      console.log(localStorage.getItem('secret'))
      const resp = await updatePassword(this.user.username, this.user.password, localStorage.getItem('secret'), this.user.code)
      console.log(resp)
      if (resp.data.result === '修改成功') {
        await this.$router.push('/login')
        this.$toast.success({
          message: '修改成功, 请重新登陆',
          duration: 2000
        })
      } else {
        this.$toast.fail({
          message: resp.data.result,
          forbidClick: true,
          duration: 2000
        })
      }
    },
    async onSendSms () {
      const reg = /^1[3|5|7|8|9]\d{9}$/
      console.log(reg.test(this.user.username))
      if (this.user.username && reg.test(this.user.username)) {
        console.log('可以发送验证码')
        console.log('触发发送验证码的功能')
        this.isSendSmsLoading = true
        await this.$store.dispatch(SEND_CODE, this.user.username)
        console.log('state.secret-->' + this.$store.state.secret)
        window.localStorage.setItem('secret', this.$store.state.secret)
        console.log('发送验证码完成')
        this.isCountDownShow = true
        this.isSendSmsLoading = false
      } else {
        this.$toast.fail({
          message: '手机号为空或手机号格式错误',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
