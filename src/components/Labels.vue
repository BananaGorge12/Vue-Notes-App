<template>
    <div class="labels">
        <div class="label-box">
            <h3>Edit labels</h3>
            <div class="input-field">
                <i class="fas fa-times fa-lg"></i>
                <input placeholder="Create new label" type="text">
                <i class="fas fa-check fa-lg"></i>
            </div>
            <div class="divider"></div>
            <button @click="closeLabelWindow">Done</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'labels',
    data(){
        return{

        }
    },
    methods:{
        closeLabelWindow(){
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
    .labels{
        opacity: 0.8;
        position: fixed;
        background: gray;
        width: 100%;
        height: 100%;
        z-index: 1;
        left: 0px;
        top: 0;
    }
    .label-box{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 300px;
        height: 200px;
        background: #ffffff;
        opacity: 1;
        display: flex;
        flex-direction: column;
    }
    .input-field{
        align-self: center;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }
    h3{
        margin-left: 10px;
    }
    input{
        background: none;
        width: 10vw;
        border-bottom: solid 1px gray;
        border-radius:0 ;
    }
    button{
        position: relative;
        align-self: flex-end;
        margin-right: 20px;
        width: 86px;
        height: 36px;
        top: -10px;
        background: none;
        border: none;
        outline: none;
    }
    button:hover{
        background: #d6d6d6;
    }
</style>