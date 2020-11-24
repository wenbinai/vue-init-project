<template>
  <div class="updatePhoneContainer">
    <Header title="更改手机号" :is-back=true ></Header>
    <van-form @submit="changePhone"
              @failed="onFailed"
              ref="updatePhone-form"
              :show-error="false"
              :show-error-message="false"
              validate-first>
      <van-field
        v-model="newPhone"
        name="手机号"
        label="新手机号"
        placeholder="请输入您的新手机号"
        :rules="[{ required: true, message: '请输入手机号' },
                 { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }]"
      />
      <van-field
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        name="code"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]"
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
                      @click.prevent="onSendSms">点击发送验证码
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
export default {
  name: 'UpdatePhone',
  components: { Header },
  data () {
    return {
      newPhone: '',
      code: '',
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
    changePhone () {
      console.log('触发修改手机号事件')
    },
    /**
     * 发送验证码
     * 1. 判断前面字段是否填写
     * 2. 发送验证码
     * @returns {Promise<void>}
     */
    async onSendSms () {
      if (this.newPhone) {
        console.log('触发发送验证码的功能')
        this.isSendSmsLoading = true
        await this.$store.dispatch(SEND_CODE, this.newPhone)
        console.log('state.secret-->' + this.$store.state.secret)
        window.localStorage.setItem('secret', this.$store.state.secret)
        console.log('发送验证码完成')
        this.isCountDownShow = true
        this.isSendSmsLoading = false
      } else {
        this.$toast.fail({
          message: '请输入手机号',
          forbidClick: true,
          duration: 1000,
          position: 'top'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
