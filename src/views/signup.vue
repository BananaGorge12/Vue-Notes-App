<template>
    <div id="signup">
        <div class="container">
            <h1>Sign up</h1>
            <form @submit.prevent="signup">
                <label for="email">Email:</label>
                <input v-model="email" class="form-item input" type="email" name="email" id="email-input">
                <label for="password">Password:</label>
                <input v-model="password" class="form-item input" type="password" name="password" id="password-input">
                <label for="name">Name:</label>
                <input v-model="name" class="form-item input" type="text" name="name">
                <p id="feedback" v-if="feedback">{{feedback}}</p>
                <input class="form-item" type="submit" id="submit" value="Signup">
            </form>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name:'signup',
    data(){
        return{
            email:null,
            password:null,
            feedback:null,
            name:null
        }
    },
    methods:{
        signup(){
           firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(cred => {
               db.collection('users').add({
                   uid:cred.user.uid,
                   name:this.name
               })
               this.feedback = null
               this.$router.push({name:'Home'})
           }).catch(err => {
               this.feedback = err.message
           })
        }
    }

}
</script>
<style scoped>
    #signup{
        width: 100%;
        height: 100%;
        margin-top: 60px;
    }
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    label{
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: gray;
    }
    .form-item{
        margin: 7px auto;
    }
    .input{
        border: none;
        outline: none;
        border-bottom:1px solid; 
        height: 40px;
        width: 250px;
    }
    #submit{
        background: #399cf9;
        border: none;
        padding: 10px;
        font-family: Arial, Helvetica, sans-serif;
        cursor: pointer;
    }
    #submit:hover{
        background: #3084d3;
    }
    #feedback{
        color: red;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>