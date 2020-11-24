<template>
  <div class="userSpace">
    <Header :is-back="true" title="个人空间"></Header>
<!--    <van-field label="消息通知" @click="$router.push('/notice')"></van-field>-->
    <van-field label="个人信息" @click="$router.push('/userInfo')"></van-field>
<!--    <van-field label="修改信息" @click="$router.push('/updateUserInfo')"></van-field>-->
    <van-field label="退出登陆" @click="loginOut"></van-field>
    <van-field label="更改绑定的手机号" @click="$router.push('/updatePhone')"></van-field>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'UserSpace',
  components: { Header },
  data () {
    return {

    }
  },
  methods: {
    async loginOut () {
      console.log('触发退出登陆事件!')
      localStorage.setItem('token', '')
      await this.$router.push('/login')
      console.log(localStorage.getItem('token'))
      this.$toast.success({
        message: '退出成功',
        forbidClick: true,
        duration: 2000
      })
    }
  }
}
</script>

<style scoped>

</style>
