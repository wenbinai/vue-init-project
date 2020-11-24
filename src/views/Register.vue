<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="register"
              @failed="onFailed"
              ref="register-form"
              :show-error="false"
              :show-error-message="false"
              validate-first
    >
      <van-field
        v-model="name"
        name="name"
        label="姓名"
        placeholder="请输入您的姓名"
        :rules="[{ required: true, message: '请输入姓名' }]">
      </van-field>
      <van-field
        v-model="user.username"
        name="手机号"
        label="手机号"
        placeholder="请输入您的手机号"
        :rules="formRules.username"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入您的密码"
        :rules="formRules.password"
      />
      <van-field
        v-model="user.confirmPassword"
        type="password"
        name="validator"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ validator, message: '两次密码不一致' },
                 { required: true, message: '请输入确认密码' }]"
      />
      <van-field
        v-model="user.nio"
        label="流动党员活动证编号"
        placeholder="请输入流动党员活动证编号"
        :rules="[{ required: true, message: '请输入流动党员活动证编号' }]"
      />
      <van-field name="radio" label="状态" :rules="[{ required: true, message: '请选择流入流出状态' }]">
        <template #input>
          <van-radio-group v-model="user.state" direction="horizontal">
            <van-radio name="流入" @click="liuru">流入</van-radio>
            <van-radio name="流出" @click="liuchu">流出</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field @click="openLiuru" v-if="isliuruP" v-model="user.workPlace" readonly="readonly" label="务工地点"
                 :rules="[{required: true, message: '请选择务工地点'}]"></van-field>
      <van-field @click="openLiuchu" v-if="isliuchuP" v-model="user.workPlace" readonly="readonly" label="务工地点"
                 :rules="[{required: true, message: '请选择务工地点'}]"></van-field>
      <van-field @click="open" v-if="isliuchuP" v-model="user.branchName" readonly="readonly" label="党委党支部"
                 :rules="[{required: true, message: '请选择党委党支部'}]"></van-field>
      <van-popup
        v-model="isliuru"
      >
        <van-picker :columns="liuruArea" title="务工地区" show-toolbar @confirm="onConfirmR"
<<<<<<< HEAD
                    @cancel="onCancelR" style="width: 90%"></van-picker>
=======
                    @cancel="onCancelR" style="width: 80%"></van-picker>
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
      </van-popup>

      <van-popup
        v-model="isliuchu"
<<<<<<< HEAD
      >4
        <van-area :area-list="areaList" title="务工地区"  @confirm="onConfirmC" @cancel="onCancelC"></van-area>
=======
      >
        <van-area :area-list="areaList" title="务工地区" @confirm="onConfirmC" @cancel="onCancelC"></van-area>
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
      </van-popup>

      <van-popup
        v-model="isOpen">
        <van-picker
          title="选择党委党支部"
          show-toolbar
          @confirm="onConfirmD"
          @cancel="onCancelD"
          :columns="columns"
        >
        </van-picker>
      </van-popup>
      <van-field
        v-model="user.code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        name="code"
        :rules="formRules.code"
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
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import myAxios from '@/plugins/axios/myAxios'
import {SEND_CODE} from '@/store/type'
import {getItem} from '@/utils/storage'
import {getAllCommitteeApi} from '@/api/getAllCommittee'
import {areaLists} from "@/utils/areaList";
import {getAllBranchsApi} from "@/api/getAllBranch";


export default {
  name: 'Register',
  data() {
    return {
      liuruArea: '',
      isOpen: false,
      isliuruP: false,
      isliuchuP: false,
      columns: [
        {
          id: 1,
          text: "东城街街道党工委",
          children: [
            {
              id: 1,
              text: "城东社区党总支"
            },
            {
              id: 2,
              text: "凤和社区党支部"
            },
            {
              id: 3,
              text: "小北庄社区党支部"
            },
            {
              id: 4,
              text: "张家坡村党支部"
            },
            {
              id: 5,
              text: "店上村党支部"
            },
            {
              id: 6,
              text: "南李村党支部"
            },
            {
              id: 7,
              text: "沟北村党支部"
            },
            {
              id: 8,
              text: "秦庄村党支部"
            },
            {
              id: 9,
              text: "东山村党支部"
            },
            {
              id: 10,
              text: "果则沟村党支部"
            },
            {
              id: 11,
              text: "育红社区党支部"
            },
            {
              id: 12,
              text: "丹峰社区党支部"
            },
            {
              id: 13,
              text: "凤阳社区党支部"
            },
            {
              id: 14,
              text: "平阳社区党支部"
            },
            {
              id: 15,
              text: "晋阳社区党支部"
            },
            {
              id: 16,
              text: "怡阳社区党支部"
            },
            {
              id: 17,
              text: "丹华社区党支部"
            },
            {
              id: 18,
              text: "迎宾社区党支部"
            },
            {
              id: 19,
              text: "中心校党支部"
            },
            {
              id: 20,
              text: "九龙公司党支部"
            },
            {
              id: 21,
              text: "化工公司党支部"
            },
            {
              id: 22,
              text: "机关党支部"
            },
            {
              id: 23,
              text: "老干党支部"
            },
            {
              id: 24,
              text: "青年人才党支部"
            },
            {
              id: 674,
              text: "test"
            },
            {
              id: 676,
              text: "test100"
            }
          ]
        },
        {
          id: 2,
          text: "南城街街道党工委",
          children: [
            {
              id: 25,
              text: "城南社区党总支"
            },
            {
              id: 26,
              text: "桥北社区党支部"
            },
            {
              id: 27,
              text: "圪塔社区党支部"
            },
            {
              id: 28,
              text: "龙渠社区党总支"
            },
            {
              id: 29,
              text: "上韩村党支部"
            },
            {
              id: 30,
              text: "下韩村党支部"
            },
            {
              id: 31,
              text: "庞村村党总支"
            },
            {
              id: 32,
              text: "西南庄村党支部"
            },
            {
              id: 33,
              text: "张庄村党支部"
            },
            {
              id: 34,
              text: "南赵庄社区党总支"
            },
            {
              id: 35,
              text: "唐庄村党支部"
            },
            {
              id: 36,
              text: "上玉井村党支部"
            },
            {
              id: 37,
              text: "朴村村党支部"
            },
            {
              id: 38,
              text: "梨园村党支部"
            },
            {
              id: 39,
              text: "瓦窑头村党支部"
            },
            {
              id: 40,
              text: "上庄村党支部"
            },
            {
              id: 41,
              text: "谷口村党支部"
            },
            {
              id: 42,
              text: "北陈村党支部"
            },
            {
              id: 43,
              text: "南陈村党支部"
            },
            {
              id: 44,
              text: "南许庄村党支部"
            },
            {
              id: 45,
              text: "徐庄村党支部"
            },
            {
              id: 46,
              text: "崔庄村党支部"
            },
            {
              id: 47,
              text: "康乐社区党支部"
            },
            {
              id: 48,
              text: "康华社区党支部"
            },
            {
              id: 49,
              text: "康丰社区党支部"
            },
            {
              id: 50,
              text: "新荣社区党支部"
            },
            {
              id: 51,
              text: "新兴社区党支部"
            },
            {
              id: 52,
              text: "龙欣社区党支部"
            },
            {
              id: 53,
              text: "龙盛社区党支部"
            },
            {
              id: 54,
              text: "南城中心校党支部"
            },
            {
              id: 55,
              text: "长平中学党支部"
            },
            {
              id: 56,
              text: "城南中学党支部"
            },
            {
              id: 57,
              text: "正易农牧科技发展有限公司党支部"
            },
            {
              id: 58,
              text: "泫氏集团党支部"
            },
            {
              id: 59,
              text: "公路工程服务中心党支部"
            },
            {
              id: 60,
              text: "治安协防党支部"
            },
            {
              id: 61,
              text: "老干部党支部"
            },
            {
              id: 62,
              text: "土地巡逻党支部"
            },
            {
              id: 63,
              text: "腾达房地产开发有限公司党支部"
            },
            {
              id: 64,
              text: "机关党支部"
            }
          ]
        },],
      isliuru: false,
      isliuchu: false,
      areaList: areaLists,
      name: '',
      user: {
        workPlace: '',
        branchId: 0,
        state: '',
        nio: '',
        username: '',
        password: '',
        confirmPassword: '',
        code: '',
        branchName: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入手机号'},
          {pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误'}
        ],
        code: [
          {required: true, message: '请输入验证码'},
          {pattern: /^\d{6}$/, message: '验证码格式错误'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  async created() {
    let resp = await getAllBranchsApi()
    console.log('所有resp-->', resp)
    this.columns = resp.data
  },
  methods: {
    // onChange(picker, values) {
    //   picker.setColumnValues(1, cities[values[0]])
    // },
    onConfirmD(e, index) {
<<<<<<< HEAD
      // console.log('党委党工部值-->', e)
      // console.log('索引-->', index)
=======
      console.log('党委党工部值-->', e)
      console.log('索引-->', index)
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
      this.isOpen = false
      this.user.branchId = index[1]
      this.user.branchName = e[0] + '-' + e[1]
    },
    onCancelD() {
      this.isOpen = false
    },
    open() {
      this.isOpen = true
    },
    onConfirmR(e) {
      console.log(e)
      console.log('触发确认流入地点')
      this.isliuru = false
      // const province = e[0].name
      // const city = e[1].name
      // const area = e[2].name
      const areaData = '山西省高平市' + e
      this.user.workPlace = areaData
    },
    onConfirmC(e) {
      console.log(e)
      console.log('触发确认流出地点')
      this.isliuchu = false
      const province = e[0].name
      const city = e[1].name
      const area = e[2].name
      const areaData = province + '-' + city + '-' + area
      this.user.workPlace = areaData
    },
    onCancelR() {
      console.log('触发取消流入地点')
      this.isliuru = false
    },
    onCancelC() {
      console.log('触发取消流出地点')
      this.isliuchu = false
    },
    liuru() {
      console.log('触发流入事件')
      // this.isliuru = true
      this.isliuruP = true
      this.isliuchuP = false
      this.user.workPlace = ''
    },
    liuchu() {
      console.log('触发流出事件')
      // this.isliuchu = true
      this.isliuchuP = true
      this.isliuruP = false
      this.user.workPlace = ''
    },
    async openLiuru() {
      // this.isliuchu = false
      this.isliuru = true
      const resp = await getAllCommitteeApi()
      console.log('所有党委-->', resp)
      const tmpAddress = resp.data.committees.map(item => {
        return {
          address: item.address
        }
      })
      console.log('tmpAddress-->', tmpAddress)
      const address = []

      tmpAddress.forEach(item => {
        address.push(item.address)
      })
      console.log('address-->', address)
      this.liuruArea = address
    },
    openLiuchu() {
      // this.isliuru = false
      this.isliuchu = true
    },
    validator() {
      console.log(this.user.password)
      console.log(this.user.confirmPassword)
      return this.user.password === this.user.confirmPassword
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$msg.fail({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms() {
      if (this.user.username) {
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
          message: '请输入手机号',
          forbidClick: true,
          duration: 1000,
          position: 'top'
        })
      }
    },
    async register() {
      this.$toast.loading({
        message: '注册中...',
        forbidClick: true,
        duration: 0
      })
      console.log('触发注册按钮')
      const secret = getItem('secret')
      console.log('secret-->', secret)
      const code = this.user.code
      // const tel = this.user.username
      const branchId = this.user.branchId
      const resp = await myAxios({
        method: 'POST',
        url: `communist/register/${secret}/${code}/${branchId}`,
        data: {
          user: {
            username: this.user.username,
            password: this.user.password
          },
          tel: this.user.username,
          state: this.user.state,
          address: this.user.workPlace,
          no: this.user.nio,
          name: this.name
        },
      })
      if (resp.data.result === '账号已存在') {
        await this.$toast.fail({
          message: '手机号已注册, 将跳转到登录页',
          forbidClick: true,
          duration: 5000,
          position: 'top'
        })
        this.$router.push('/login')
      } else {
        if (resp.data.result === '注册成功') {
          console.log('resp-->' + JSON.stringify(resp))
          await this.$router.push('/login')
          this.$toast.success({
            message: '注册成功,请登录',
            forbidClick: true,
            duration: 2000
          })
        } else {
          this.$toast.success({
            message: '注册失败,请重新登录',
            forbidClick: true,
            duration: 5000,
            position: 'top'
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
