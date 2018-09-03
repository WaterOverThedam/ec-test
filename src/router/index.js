import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateUser from '@/components/CreateUser'
import Way from "@/components/Way"
import Phone from "@/components/Phone"
import Wechat from "@/components/Wechat"
import Sale from "@/components/Sale"

Vue.use(Router)

export default new Router({
  routes: [
    // model="history", 
    {
      path: '/',
      name: '首页',
      component: HelloWorld 
    },
    {
      path:"/createuser",
      name:'新增客户',
      component:CreateUser
    },
    {
      path:"/way",
      name:"渠道统计分析",
      component:Way
    },
    {
      path:"/wechat",
      name:"微信联系统计",
      component:Wechat
    },
    {
      path:"/sale",
      name:"销售计划分析",
      component:Sale
    },
    {
      path:"/phone",
      name:"电话联系统计",
      component:Phone
    },
  ]
})
