<template>
    <div id="signup">
        <h1>Sign up</h1>
        <form @submit.prevent="signup">
            <label for="email">Email:</label>
            <input v-model="email" class="form-item input" type="email" name="email" id="email-input">
            <label for="email">Password:</label>
            <input v-model="password" class="form-item input" type="password" name="password" id="password-input">
            <p id="feedback" v-if="feedback">{{feedback}}</p>
            <input class="form-item" type="submit" id="submit" value="Signup">
        </form>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'signup',
    data(){
        return{
            email:null,
            password:null,
            feedback:null
        }
    },
    methods:{
        signup(){
           firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(() => {
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