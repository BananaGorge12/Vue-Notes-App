import Vue from 'vue'
import VueRouter from 'vue-router'
//pages
import Home from '../views/Home.vue'
import Signup from '@/views/signup'
import Login from '@/views/Login'
import Bin from '@/views/bin'
import Archive from '@/views/Archive'
import LabelView from '@/views/LabelView'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/signup',
    name:'Signup',
    component:Signup
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/bin',
    name:'Bin',
    component:Bin
  },
  {
    path:'/archive',
    name:'Archive',
    component:Archive
  },
  {
    path:'/label/:name',
    name:'LabelView',
    component:LabelView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router