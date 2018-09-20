import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateUser from '@/components/CreateUser'
import Way from "@/components/Way"
import Phone from "@/components/Phone"
import Wechat from "@/components/Wechat"
import Sale from "@/components/Sale"
import Setting from "@/components/Setting"
import AllUser from "@/components/AllUser"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home/:id',
      name: '首页',
      component: Home 
    },
    {
      path:"/createuser",
      name:'新增客户',
      component:CreateUser,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },   
     {
      path:"/setting",
      name:'功能设置',
      component:Setting,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path:"/alluser",
      name:'所有用户',
      component:AllUser,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path:"/way",
      name:"渠道统计分析",
      component:Way,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path:"/wechat",
      name:"微信联系统计",
      component:Wechat,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path:"/sale",
      name:"销售计划分析",
      component:Sale,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path:"/phone",
      name:"电话联系统计",
      component:Phone,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
  ]
})
