import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      istoken: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    path: '/userSpace',
    component: () => import('@/views/UserSpace'),
    meta: {
      istoken: true
    }
  },
  {
    path: '/updateUserInfo',
    component: () => import('@/views/UpdateUserInfo')
  },
  {
    path: '/test',
    component: () => import('@/views/Test')
  },
  {
    path: '/notice',
    component: () => import('@/views/Notice')
  },
  {
    path: '/userInfo',
    component: () => import('@/views/UserInfo'),
    meta: {
      istoken: true
    }
  },
  {
    path: '/forgetPassword',
    component: () => import('@/views/ForgetPassword')
  },
  {
    path: '/updatePhone',
    component: () => import('@/views/UpdatePhone')
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.meta.istoken === true) {
    setTimeout(() => {
      router.push('/login')
    }, 3000)
    Vue.prototype.$msg.fail('你还没有登录 请先登录!')
    return
  }
  document.title = '高平市流动党员管理平台'
  next()
})

export default router
