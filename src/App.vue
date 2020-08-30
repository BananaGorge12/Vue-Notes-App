<template>
  <div id="app">
    <navbar class="navbar"/>
    <router-view class="site"/>
  </div>
</template>
<script>
import navbar from './components/Navbar'
export default {
  data(){
    return{
      
    }
  },
  components:{
    navbar
  }
}
</script>
<style>
  body{
    padding: 0;
    margin: 0;
  }
  p{
    font-family: Arial, Helvetica, sans-serif;
  }
  h1{
    font-family: Arial, Helvetica, sans-serif;
  }
  h2{
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
