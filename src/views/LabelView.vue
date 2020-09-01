<template>
    <div class="label-view">
        <h1>{{this.$route.params.name}}</h1>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'labelView',
    data(){
        return{

        }
    },
    created(){
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                this.$router.push({name:'Signup'})
            }
        })
    }
}
</script>
<style scoped>

</style>