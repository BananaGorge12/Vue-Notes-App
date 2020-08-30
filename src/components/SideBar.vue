<template>
    <div class="sidebar">
        <router-link :to="{name:'Home'}" class="sidebar-item" :class="{'sidebar-slide-open' : showSidebar,'sidebar-slide-close' : !showSidebar }">
            <i class="fas fa-lightbulb fa-lg"></i>
            <h3>Notes</h3>
        </router-link>
        <div class="sidebar-item" :class="{'sidebar-slide-open' : showSidebar,'sidebar-slide-close' : !showSidebar }">
            <i class="fas fa-bell fa-lg"></i>
            <h3>Reminders</h3>
        </div>
        <router-link :to="{name:'Archive'}" class="sidebar-item" :class="{'sidebar-slide-open' : showSidebar,'sidebar-slide-close' : !showSidebar }">
            <i class="fas fa-archive fa-lg"></i>
            <h3>Archive</h3>
        </router-link>
        <router-link :to="{name:'Bin'}" class="sidebar-item" :class="{'sidebar-slide-open' : showSidebar,'sidebar-slide-close' : !showSidebar }">
            <i class="fas fa-trash fa-lg"></i>
            <h3>Bin</h3>
        </router-link>
    </div>
</template>
<script>
export default {
    name:'sidebar',
    props:['showSidebar'],
    data(){
        return{
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
        sidebarAction(){
            alert('works')
        }
    }
}
</script>
<style scoped>
    .sidebar{
        width: fit-content;
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
    .router-link-exact-active{
        background:#feefc3;
    }
    .router-link-exact-active:hover{
        background-color:#feefc3;
    }
    .router-link-active:hover{
        text-decoration: none;
        background-color: none;
    }
    .sidebar-slide-open{
        animation: open 0.3s both linear;
    }
    .sidebar-slide-close{
        animation: close 0.3s both linear;
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
            width: 35px;
            border-radius: 50%;
        }
        100%{
            width: 200px;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }
    }
    @keyframes close{
        0%{
            width: 200px;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }
        100%{
            width: 35px;
            border-radius: 50%;
        }
    }
</style>