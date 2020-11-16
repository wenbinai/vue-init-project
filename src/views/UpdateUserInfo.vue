<template>
  <div class="user">
    <Header title="修改个人信息" :is-back=true></Header>
    <van-form @submit="subUpdateUserInfo"
              @failed="onFailed"
              :show-error="false"
              :show-error-message="false"
              validate-first>
      <van-field v-model="userInfo.name" label="姓名"
                 :rules="[{ required: true, message: '请输入姓名' }]">
      </van-field>
      <van-field name="sex" label="性别" :rules="[{ required: true, message: '请选择性别' }]">
        <template #input>
          <van-radio-group v-model="userInfo.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userInfo.idCard" label="身份证号"
                 :rules="[{ required: true, message: '请输入身份证号' },
                          { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证格式错误' }]">
      </van-field>
      <van-field v-model="userInfo.educationDegree" rqieadonly="readonly" label="学历" @click="showStudy"
                 :rules="[{ required: true, message: '请选择学历' }]">
      </van-field>
      <van-popup v-model="isShowStudy">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns"
          @confirm="confirmStudy"
          @cancel="isShowStudy = false"
        />
      </van-popup>
      <van-field v-model="userInfo.nio" label="党员证编号"
                 :rules="[{ required: true, message: '请填写党员证编号' }]">
      </van-field>
      <van-field label="入党时间" @click="showTime" readonly="readonly" v-model="userInfo.joinPartyTime"
                 :rules="[{ required: true, message: '请选择入党时间' }]">
      </van-field>
      <van-popup v-model="isShow">
        <van-datetime-picker v-model="currentDate"
                             type="date"
                             title="选择年月日"
                             :min-date="minDate"
                             :max-date="maxDate"
                             @cancel="isShow = false"
                             @confirm="confirmPicker"
                             :formatter="formatter"
        >
        </van-datetime-picker>
      </van-popup>
      <van-field name="radio"   label="状态" :rules="[{ required: true, message: '请选择流入流出状态' }]">
        <template #input>
          <van-radio-group disabled v-model="userInfo.state" direction="horizontal">
            <van-radio name="流入">流入</van-radio>
            <van-radio name="流出">流出</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field @click="openPopup" v-model="userInfo.workPlace" readonly="readonly" label="务工地点"
                 :rules="[{ required: true, message: '请选择务工地点' }]">
      </van-field>
      <van-popup
        v-model="isOpen"
      >
        <van-area :area-list="areaList" title="务工地区" @confirm="onConfirm" @cancel="onCancel"></van-area>
      </van-popup>
      <van-field v-model="userInfo.company" label="工作单位"
                 :rules="[{ required: true, message: '请填写工作单位' }]">
      </van-field>
      <van-button native-type="submit" type="info">确认修改</van-button>
      <van-button native-type="button" @click="$router.push('/userSpace')">取消修改</van-button>
    </van-form>

  </div>
</template>

<script>
import Header from '@/components/Header'
import {updateUserInfo} from '@/api/updateUserInfo'
import {areaLists} from "@/utils/areaList";
import {getUserInfo} from "@/api/getUserInfo";

export default {
  name: 'User',
  components: {Header},
  data() {
    return {
      isShowStudy: false,
      columns: ['小学', '初中', '高中', '大专', '学士(大学本科)', '硕士', '博士'],
      isShow: false,
      isOpen: false,
      areaList: areaLists,
      radio: '',
      currentDate: new Date(),
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2030, 12, 31),
      userInfo: {
        sex: '',
        nio: '',
        company: '',
        name: '',
        idCard: '',
        educationDegree: '',
        joinPartyTime: '',
        state: '',
        workPlace: '北京市海淀区'
      }
    }
  },
  async created() {
    let resp = await getUserInfo()
    console.log('用户信息resp-->', resp)
    let user = resp.data.communist
    this.userInfo.name = user.name
    this.userInfo.state = user.state
    this.userInfo.nio =  user.no
  },
  methods: {
    onFailed(error) {
      if (error.errors[0]) {
        this.$msg.fail({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    confirmStudy(val) {
      console.log(val)
      this.userInfo.educationDegree = val
      this.isShowStudy = false
    },
    showStudy() {
      this.isShowStudy = true
    },
    async subUpdateUserInfo() {
      console.log('提交表单')
      this.$toast.loading({
        message: '提交数据中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const resp = await updateUserInfo(this.userInfo)
        console.log(resp)
        if (resp) {
          this.$toast.success('修改成功')
          console.log('提交完毕')
          this.$router.back()
        } else {
          this.$toast.fail({
            message: '数据提交失败, 请重新提交',
            forbidClick: true,
            duration: 2000
          })
        }
      } catch {
        this.$toast.fail('提交失败, 请重新提交')
      }
    },
    openPopup() {
      this.isOpen = true
    },
    showTime() {
      console.log('触发了点击事件')
      this.isShow = true
    },
    confirmPicker(val) {
      console.log('触发确认按钮')
      const year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      const timeValue = `${year}-${month}-${day}`
      console.log(timeValue)
      this.userInfo.joinPartyTime = timeValue
      this.isShow = false
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else {
        return `${value}日`
      }
    },
    showArea() {
      console.log('触发点击事件')
      this.showA = true
    },
    onCancel() {
      console.log('触发取消事件')
      this.isOpen = false
    },
    onConfirm(val) {
      console.log('触发确认事件')
      const province = val[0].name
      const city = val[1].name
      const area = val[2].name
      const areaData = province + '-' + city + '-' + area
      console.log(areaData)
      this.userInfo.workPlace = areaData
      this.isOpen = false
    }
  }
}
</script>

<style scoped>

</style>
