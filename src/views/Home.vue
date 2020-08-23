<template>
  <div class="home">    
    <div class="container">
      <form class="form" @submit="addNote" :style="'background:'+newNoteColor+';'">
        <input :style="'background:'+newNoteColor+';'" v-model="newNoteTitle" placeholder="Title" class="note-input title-input" type="text">
        <textarea :style="'background:'+newNoteColor+';'" v-model="newNoteContext" placeholder="Take a note.." id="content-input" class="note-input"></textarea>
        <div class="options-div">
          <div class="options">
            <div class="icon">
              <i class="far fa-bell"></i>
            </div>
            <div class="icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="icon">
              <i class="tooltip fas fa-palette">
                <div id="colors" class="tooltiptext ">
                  <div @click="changeColor('#fff')" id="white" class="color"></div>
                  <div @click="changeColor('#F28B82')" id="red" class="color"></div>
                  <div @click="changeColor('#FBBC04')" id="orange" class="color"></div>
                  <div @click="changeColor('#FFF475')" id="yellow" class="color"></div>
                  <div @click="changeColor('#CCFF90')" id="green" class="color"></div>
                  <div @click="changeColor('#A7FFEB')" id="teal" class="color"></div>
                  <div @click="changeColor('#CBF0F8')" id="blue" class="color"></div>
                  <div @click="changeColor('#AECBFA')" id="dark-blue" class="color"></div>
                  <div @click="changeColor('#D7AEFB')" id="purple" class="color"></div>
                  <div @click="changeColor('#FDCFE8')" id="pink" class="color"></div>
                  <div @click="changeColor('#E6C9A8')" id="brown" class="color"></div>
                  <div @click="changeColor('#EBECEE')" id="grey" class="color"></div>
                </div>
              </i>
            </div>
            <div class="icon">
              <i class="fas fa-file-image"></i>
            </div>
            <div class="icon">
              <i class="fas fa-archive"></i>
            </div>
            <div class="icon">
              <i class="fas fa-ellipsis-v"></i>
            </div>
            <div class="icon">
              <i class="fas fa-undo"></i>
            </div>
            <div class="icon">
              <i class="fas fa-redo"></i>
            </div>
          </div>
          <input style="float:right" type="submit" value="Close">
        </div>
      </form>
      <div id="notes">
        <div v-for="note in notes" :key="note.id">
          <div @click="note.big = false" v-if="note.big" id="cover"/>
          <div @click="note.big= true" class="note" :style="'background:'+note.color+';'">
            <h2>{{note.title}}</h2>
            <h3>{{note.content}}</h3>
            <fullNote v-if="note.big" :data="{title:note.title,content:note.content,color:note.color,id:note.id}" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import fullNote from '@/components/FullNote'
  export default {
    name: 'Home',
    data(){
      return{
        notes:[],
        newNoteTitle:null,
        newNoteContext:null,
        newNoteColor:"#fff"
      }
    },
    components:{
      fullNote
    },
    created(){
      //load notes
      db.collection('notes').get().then(snap => {
       snap.forEach(doc => {
         let note = doc.data()
         note.id = doc.id
         note.big = false
         this.notes.push(note)
       })
      })
    },
    methods:{
      addNote(){
        if(this.newNoteTitle){
          db.collection('notes').add({
            title:this.newNoteTitle,
            content:this.newNoteContext,
            color:this.newNoteColor
          }).then(() =>{
            this.newNoteTitle = null
            this.newNoteContext = null
            this.newNoteColor = "#fff"
          })
        }
      },
      changeColor(color){
        this.newNoteColor = color
      }
    }
  }
</script>
<style scoped>
  .home .container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .home .form{  
   margin-top: 60px;
   display: flex;
   flex-direction: column;
   border: 1px solid;
   border-radius: 10px;
   overflow: hidden;
  }
  /* title input */
  .home .title-input{
    height: 44px;
  }
  /* texteara */
  .home #content-input{
    height: 46px;
    resize: none;
  }
  /* both inputs */
  .home .note-input{
    width: 598px;
    border: none;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
  }
  .home .options-div{
    background: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .home .options-div input{
    margin-left: 70px;
    width: 86px;
    height: 36px;
    background: none;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
  }
  .home .options-div input:hover{
    background: #f1f3f4;
  }
  .home .options{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .home .icon{
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .home .icon:hover{
    background: #f1f3f4;
  }
  /* note container */
  .home #notes{
    width: 70%;
    display: flex;
    flex-wrap: wrap;
  }
  /* notes */
  .home .note{
    width: 240px;
    margin: 20px;
    max-height: 378px;
    height: fit-content;
    overflow: hidden;
    hyphens: auto;
    border: 1px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .home .note h2{
    margin: 0;
    margin-top: 10px;
    font-weight: 500;
  }
  .home .note h3{
    padding: 0 20px;
    font-weight: 300;
  }
  .home #cover {
  opacity: 0.8;
  position: fixed;
  background: gray;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0px;
  top: 0;
}
</style>




<!--color tool tips-->
<style>
/* Tooltip container */
.home .tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.home .tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  position: absolute;
  z-index: 1;
  /* my code */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* Show the tooltip text when you mouse over the tooltip container */
.home .tooltip:hover .tooltiptext {
  visibility: visible;
}

.home .color{
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin: 2px;
}
.home #white{
  background: #ffffff;
  border: solid 1px #5f6368;
  margin: 1px;
}
.home #red{
  background:#F28B82 ;
}
.home #orange{
  background: #FBBC04;
}
.home #yellow{
  background: #FFF475;
}
.home #green{
  background: #CCFF90;
}
.home #teal{
  background: #A7FFEB;
}
.home #blue{
  background: #CBF0F8;
}
.home #dark-blue{
  background: #AECBFA;
}
.home #purple{
  background: #D7AEFB;
}
.home #pink{
  background: #FDCFE8;
}
.home #brown{
  background: #E6C9A8;
}
.home #grey{
  background: #EBECEE;
}
</style>