<template>
  <div class="navbar">
    <nav>
      <div class="nav-sec">
        <div class="icon-back">
          <i class="fas fa-bars fa-lg nav-item"></i>
        </div>
        <img class="nav-item" src="@/assets/images/keep-logo-small.png">
        <a href="">Keep</a>
        <div id="search-bar" class="nav-item">
          <i class="fas fa-search search-bar-item"></i>
          <input type="text" placeholder="Search" class="search-bar-item">
        </div>
      </div>
      <div class="nav-sec nav-sec-two">
        <h3 v-if="user">{{user.email}}</h3>
        <button @click="logout" v-if="user">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  data(){
    return{
      user:null
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({name:'Signup'})
      })
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user
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
    justify-content:space-between
  }
  .navbar a{
    color: black;
    text-decoration: none;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
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
  }
  .navbar #search-bar{
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
</style>
