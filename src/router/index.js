import Vue from 'vue'
import VueRouter from 'vue-router'
// in
//import firebase from 'firebase'
//pages
import Home from '../views/Home.vue'
import Signup from '@/views/signup'
import Login from '@/views/Login'
import Bin from '@/views/bin'
import Archive from '@/views/Archive'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta:{
    //   requireAuth:true
    // }
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to,form,next)=>{
//   //check auth sate
//   let user = firebase.auth().currentUser
//   //checks if page need auth
//   if(to.matched.some(rec => rec.meta.requireAuth)){
//     if(user){
//       next()
//     }
//     else{
//       next({name:'Login'})
//     }
//   }
//   else{
//     next()
//   }
// })

export default router