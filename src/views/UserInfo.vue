<template>
  <div class="userInfoContainer">
    <Header title="用户信息页" is-back="true"></Header>
    <van-field label="姓名" v-if="userInfo.name" v-model="userInfo.name" readonly="readonly"></van-field>
    <van-field label="姓名" v-else v-model="defaultValue" readonly="readonly"></van-field>
    <van-field label="手机号" v-if="user.username" v-model="user.username" readonly="readonly"></van-field>
    <van-field label="手机号" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="身份证号" v-if="userInfo.idCard" v-model="userInfo.idCard" readonly="readonly"></van-field>
    <van-field label="身份证号" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="学历" v-if="userInfo.degree" v-model="userInfo.degree" readonly="readonly"></van-field>
    <van-field label="学历" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="性别" v-if="userInfo.sex" v-model="userInfo.sex" readonly="readonly"></van-field>
    <van-field label="性别" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="状态" v-if="userInfo.state" v-model="userInfo.state" readonly="readonly"></van-field>
    <van-field label="状态" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="公司" v-if="userInfo.company" v-model="userInfo.company" readonly="readonly"></van-field>
    <van-field label="公司" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="入党时间" v-if="userInfo.date" v-model="userInfo.date" readonly="readonly"></van-field>
    <van-field label="入党时间" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="务工地点" v-if="userInfo.address" v-model="userInfo.address" readonly="readonly"></van-field>
    <van-field label="务工地点" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="流动党员证编号" v-if="userInfo.no" v-model="userInfo.no" readonly="readonly"></van-field>
    <van-field label="流动党员证编号" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="党支部名称" v-if="branch.name" v-model="branch.name" readonly="readonly"></van-field>
    <van-field label="党支部名称" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <van-field label="党工委名称" v-if="committee.name" v-model="committee.name" readonly="readonly"></van-field>
    <van-field label="党工委名称" v-else v-model="defaultValue" readonly="readonly"></van-field>

    <!--    <van-field label="测试2" v-model="phone"></van-field>-->
    <van-button @click="$router.push('/updateUserInfo')" type="primary">完善用户信息</van-button>
    <van-field label="退出登陆" @click="loginOut"></van-field>
    <van-field label="更改绑定的手机号" @click="$router.push('/updatePhone')"></van-field>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/getUserInfo'
import Header from '@/components/Header'

export default {
  name: 'UserInfo',
  components: { Header },
  data () {
    return {
      test: '',
      defaultValue: '还未填写',
      userInfo: '',
      user: '',
      branch: '',
      committee: ''
    }
  },
  computed: {
    phone () {
      if (this.userInfo.tel) {
        return this.userInfo.tel
      } else {
        return this.defaultValue
      }
    }
  },
  async created () {
    this.userInfo = await this.getUserInfoMethod()
    this.user = this.userInfo.user
    if(this.userInfo.branch != null)
    {
    this.branch = this.userInfo.branch
    this.committee = this.userInfo.branch.committee
    }
    
    console.log('this.userInfo-->' + JSON.stringify(this.userInfo))
    // this.userInfo.tel = ''
  },
  methods: {
    async getUserInfoMethod () {
      console.log('触发用户信息')
      const resp = await getUserInfo()
      console.log(resp)
      return resp.data.communist
    },
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
