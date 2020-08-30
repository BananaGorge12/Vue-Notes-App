<template>
  <div class="navbar">
    <nav>
      <div class="nav-sec">
        <div class="icon-back" @click="toggleSideBar">
          <i class="fas fa-bars fa-lg nav-item"></i>
        </div>
        <img class="nav-item" src="@/assets/images/keep-logo-small.png">
        <router-link :to="{name:'Home'}">Keep</router-link>
        <div class="nav-item search-bar">
          <i class="fas fa-search search-bar-item"></i>
          <input type="text" placeholder="Search" class="search-bar-item">
        </div>
      </div>
      <div class="nav-sec nav-sec-two">
        <h3 v-if="user && userInfo">{{userInfo.name}}</h3>
        <button id="logout" class="log-links" @click="logout" v-if="user">Logout</button>
        <router-link class="log-links" v-if="!user" :to="{name:'Login'}">Login</router-link>
        <router-link class="log-links" v-if="!user" :to="{name:'Signup'}" id="signup">Signup</router-link>
      </div>
    </nav>
    <sidebar :showSidebar="showSidebar"/>
  </div>
</template>

<script>
import firebase from 'firebase'
import sidebar from './SideBar'
import db from '@/firebase/init'
export default {
  name: 'Navbar',
  data(){
    return{
      user:null,
      userInfo:null,
      showSidebar:false,
    }
  },
  components:{
    sidebar
  },
  methods:{
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({name:'Signup'})
      })
    },
    toggleSideBar(){
      this.showSidebar = !this.showSidebar
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user
        db.collection('users').where('uid','==',firebase.auth().currentUser.uid).get().then(snap => {
          snap.forEach(doc => {
            this.userInfo = doc.data()
          })
        })
      }
      else{
        this.user = null
      }
    })
  }
}
</script>
<style>
  .navbar nav{
    background: white;
    width: 100%;
    height: 64px;
    border-bottom:solid 1px gray;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .navbar a{
    color: black;
    text-decoration: none;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .navbar button{
    cursor: pointer;
  }
  .navbar .log-links{
    background: #eaeaea;
    padding: 10px 20px;
  }
  .navbar .log-links:hover{
    text-decoration: none;
    background: #d6d6d6;
  }
  .navbar h3{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
  }
  .navbar #logout{
    margin-right: 30px;
    border: none;
    font-size: 17px;
    outline: none;
  }
  .navbar #signup{
    margin-right: 30px;
  }
  .navbar a:hover{
    text-decoration: underline;
  }
  .navbar .nav-item{
    margin: 10px;
  }
  .nav-sec{
    padding: auto 100px;
    display: flex;
    align-items: center;
  }
  .navbar .fas{
    cursor: pointer;
  }
  .navbar input{
    border: none;
    background: #f1f3f4;
    border-radius:10px ;
    outline: none;
    width: 40vh;
  }
  .navbar .search-bar{
    max-width: 615px;
    border-radius:10px ;
    background: #f1f3f4;
    height: 46px;
    display: flex;
    align-items: center;
    margin-left: 30px;
  }
  .navbar .search-bar-item{
    padding: 7px;
  }
  .nav-sec-two{
    width: 268px;
    display: flex;
    justify-content: space-between;
  }
  .navbar .icon-sec{
    display: flex;
    justify-content: space-between;
  }
  .navbar .first-icon-sec{
    width: 148px;
  }
  .navbar .second-icon-sec{
    width: 124px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .navbar .second-icon-sec-item{
    margin: 10px;
  }
  .navbar .icon-back{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .navbar .icon-back:hover{
    background: #f1f3f4;
  }
  #profile{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: url("https://lh3.googleusercontent.com/ogw/ADGmqu8A4ibLZClmT2TXyp4bLF6lNOcOmcP3N08faoT5=s32-c-mo");
  }
  /* resposive */
    @media screen and (max-width: 800px){
      .navbar input{
        display: none;
      }
      .search-bar-item{
        display: none;
      }
    }
</style>
