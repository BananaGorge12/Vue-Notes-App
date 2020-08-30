<template>
    <div class="sidebar" @sidebar="sidebar">
        <div :class="`sidebar-item ${animation}`">
            <i class="fas fa-lightbulb fa-lg"></i>
            <h3>Notes</h3>
        </div>
        <div :class="`sidebar-item ${animation}`">
            <i class="fas fa-bell fa-lg"></i>
            <h3>Reminders</h3>
        </div>
        <div :class="`sidebar-item ${animation}`">
            <i class="fas fa-edit fa-lg"></i>
            <h3>Edit labels</h3>
        </div>
        <div :class="`sidebar-item ${animation}`">
            <i class="fas fa-archive fa-lg"></i>
            <h3>Archive</h3>
        </div>
        <div :class="`sidebar-item ${animation}`">
            <i class="fas fa-trash fa-lg"></i>
            <h3>Bin</h3>
        </div>
    </div>
</template>
<script>
export default {
    name:'sidebar',
    props:['button'],
    data(){
        return{
            clicked:this.button,
            animation:null
        }
    },
    created(){
        console.log(this.clicked)
        if(this.clicked){
            this.animation = 'sidebar-slide-open'
        }
    },
    methods:{
        sidebar(){
            alert()
        }
    }
}
</script>
<style scoped>
    .sidebar{
        width: 300px;
        margin: 0;
        float: left;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }
    .sidebar-item{
        display: flex;
        align-items: center;
        padding-left: 20px;
        cursor: pointer;
        overflow: hidden;
        border-radius:50% ;
        width: 35px;
    }
    .sidebar-slide-open{
        animation: open 1s both linear;
    }
    .sidebar-item:hover{
        background: #d6d6d6;
    }
    .sidebar-item h3{
        margin-left: 20px;
    }
    /* animation */
    @keyframes open{
        0%{
            width: 40px;
            border-radius: 50%;
        }
        1%{
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
        }
        100%{
            width: 400px;
        }
    }
</style>