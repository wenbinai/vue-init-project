<template>
  <div class="index">
    <van-tabs v-model="activeName" v-if="isShow" @click="onClick">
      <van-tab title="未来活动" name="a">
        <van-card v-for="item in notices"
                  :key="item.id"
                  :title="item.notice.title"
                  :price="item.notice.date"
                  currency=" "
                  :desc="item.notice.detail"

        >
          <template #footer>
            <van-button v-if="item.join" color="deepskyblue" disabled>已签到</van-button>
            <van-button @click="sign(item.notice.id)" color="deepskyblue" v-else>签到</van-button>
          </template>
        </van-card>
        <van-popup v-model="showActivity">
          <van-field
            v-model="sms"
            label="签到码"
            placeholder="请输入活动验证码"
            style="width: 50vh"
          >
            <template #button>
              <van-button size="small" type="primary" @click="sendSmsMethod">点击确认</van-button>
            </template>
          </van-field>
        </van-popup>
      </van-tab>
      <van-tab title="已过期活动" name="b">
        <van-card v-for="item in notices"
                  :key="item.id"
                  :title="item.notice.title"
                  :price="item.notice.date"
                  currency=" "
                  :desc="item.notice.detail"

        >
          <template #footer>
            <van-button size="mini" v-if="item.join" color="deepskyblue" disabled>已签到</van-button>
            <van-button size="mini" v-else color="deepskyblue" disabled>未签到</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">活动</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/userInfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {Tab, Tabs} from 'vant'
import Vue from 'vue'
import {getNotice} from '@/api/getNotice'
import {sendSms} from '@/api/sendSms'

Vue.use(Tab)
Vue.use(Tabs)

export default {
  name: 'Index',
  data() {
    return {
      sms: '',
      showActivity: false,
      isShow: true,
      activeName: 'a',
      notices: '',
      outNotices: '',
      futureNotices: '',
      out: '',
      future: '',
      notice: '',
      noticeId: ''
    }
  },
  async created() {
    console.log(this.$store.state.token)
    if (this.$store.state.token === '' || this.$store.state.token === null) {
      // console.log('用户没有登陆或者登陆的token已过期, 请重新登陆')
      // alert('用户没有登陆或者登陆的token已过期, 请重新登陆, 3s后将跳转到登录页')
      this.$store.state.exception.message = '用户没有登陆或者登陆的token已过期, 请重新登陆'
      // setTimeout(() => this.$router.push('/login'), 3000)
    }
    const resp = await getNotice()
    // console.log(resp)
    // console.log('resp.data-->', resp.data)
    this.notices = resp.data.future
    // this.notice = resp.data.future.notice
    // this.future = resp.data.future
    // this.out = resp.data.out
    this.futureNotices = resp.data.future
    this.outNotices = resp.data.past
    // console.log('fu notice-->', this.futureNotices)
    // console.log('out notice-->', this.outNotices)
    // console.log('notices -->' + JSON.stringify(this.notices))
    if (this.notices.length !== 0) {
      this.isShow = true
    } else {
      this.$toast.success({
        message: '暂时没有活动',
        forbidClick: true,
        duration: '2000'
      })
    }
  },
  methods: {
    async initPage() {
      const resp = await getNotice()
      console.log(resp)
      console.log('resp.data-->', resp.data)
      this.notices = resp.data.future
      this.futureNotices = resp.data.future
      this.outNotices = resp.data.past
      console.log('fu notice-->', this.futureNotices)
      console.log('out notice-->', this.outNotices)
      console.log('notices -->' + JSON.stringify(this.notices))
      if (this.notices.length !== 0) {
        this.isShow = true
      } else {
        this.$toast.success({
          message: '暂时没有活动',
          forbidClick: true,
          duration: '2000'
        })
      }
    },
    onClick(name, title) {
      console.log('name-->', name)
      console.log('title-->', title)
      if (name === 'a') {
        this.notices = this.futureNotices
      }
      if (name === 'b') {
        this.notices = this.outNotices
      }
    },
    async sendSmsMethod() {
      console.log('触发发送活动签到码的功能')
      if (this.sms) {
        const resp = await sendSms(this.noticeId, this.sms)
        console.log(resp)
        console.log('resp-->', resp.data)
        if (resp.data.result === '签到失败，签到码错误') {
          this.$toast.fail({
            message: '签到码错误',
            forbidClick: true,
            duration: '2000'
          })
        } else {
          this.$toast.success({
            message: '签到成功'
          })
          this.showActivity = false
          await this.initPage()
        }
      } else {
        this.$toast.fail({
          message: '活动码不能为空',
          forbidClick: true,
          duration: '2000'
        })
      }
    },
    async getNoticeMethod() {
      console.log('触发获取通知事件')
      const resp = await getNotice()
      console.log(resp)
      console.log('resp.data.notice' + resp.data.notice)
      return resp.data.notice
    },
    async sign(id) {
      console.log('触发签到事件')
      console.log('id-->', id)
      this.showActivity = true
      this.noticeId = id
    }
  }
}
</script>

<style scoped>
.van-card__title {
  font-weight: bold;
  font-size: 15px;
  margin: 5px;
}

.van-card__desc {
  height: 60px !important;
  font-size: 14px;
  color: blue;
  /* overflow: visible; */
   display: block;
   width: 100%;
   overflow-wrap:normal ;
}

.van-card__desc {
  max-height: 80px;
  color: #646566;
  line-height: 20px;
}

.van-ellipsis {
  white-space: pre-wrap;
}

.van-card__desc, .van-card__title {
  word-wrap: break-word;
}
</style>
