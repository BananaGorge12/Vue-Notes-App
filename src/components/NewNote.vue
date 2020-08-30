<template>
  <div id="new-note">
    <form class="form" @submit.prevent="addNote" :style="'background:'+newNoteColor+';'">
      <input
        v-if="showFullInput"
        :style="'background:'+newNoteColor+';'"
        v-model="newNoteTitle"
        placeholder="Title"
        class="note-input title-input"
        type="text"
      />
      <textarea
        @click="showFullInput = true"
        :style="'background:'+newNoteColor+';'"
        v-model="newNoteContext"
        placeholder="Take a note.."
        id="content-input"
        class="note-input"
      ></textarea>
      <div v-if="showFullInput" :style="'background:'+newNoteColor+';'" class="options-div">
        <div class="options">
          <div class="icon">
            <i class="far fa-bell"></i>
          </div>
          <div class="icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="icon">
            <i class="tooltip fas fa-palette">
              <div id="colors" class="tooltiptext">
                <div @click="changeColor('#ffffff')" id="white" class="color">
                  <i style="color: black;" v-if="markCheck('#ffffff')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#F28B82')" id="red" class="color">
                  <i style="color: black;" v-if="markCheck('#F28B82')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#FBBC04')" id="orange" class="color">
                  <i style="color: black;" v-if="markCheck('#FBBC04')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#FFF475')" id="yellow" class="color">
                  <i style="color: black;" v-if="markCheck('#FFF475')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#CCFF90')" id="green" class="color">
                  <i style="color: black;" v-if="markCheck('#CCFF90')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#A7FFEB')" id="teal" class="color">
                  <i style="color: black;" v-if="markCheck('#A7FFEB')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#CBF0F8')" id="blue" class="color">
                  <i style="color: black;" v-if="markCheck('#CBF0F8')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#AECBFA')" id="dark-blue" class="color">
                  <i style="color: black;" v-if="markCheck('#AECBFA')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#D7AEFB')" id="purple" class="color">
                  <i style="color: black;" v-if="markCheck('#D7AEFB')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#FDCFE8')" id="pink" class="color">
                  <i style="color: black;" v-if="markCheck('#FDCFE8')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#E6C9A8')" id="brown" class="color">
                  <i style="color: black;" v-if="markCheck('#E6C9A8')" class="fas fa-check"></i>
                </div>
                <div @click="changeColor('#EBECEE')" id="grey" class="color">
                  <i style="color: black;" v-if="markCheck('#EBECEE')" class="fas fa-check"></i>
                </div>
              </div>
            </i>
          </div>
          <div class="icon">
            <!-- <input @change="uploadPic" type="file"> -->
            <i class="fas fa-image"></i>
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
        <input style="float:right" id="submit" type="submit" value="Close" />
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "newNote",
  data() {
    return {
      newNoteTitle: null,
      newNoteContext: null,
      newNoteColor: "#ffffff",
      showFullInput: false,
    };
  },
  methods: {
    addNote() {
      if (this.newNoteTitle) {
        db.collection("notes")
          .add({
            title: this.newNoteTitle,
            content: this.newNoteContext,
            color: this.newNoteColor,
            owner: firebase.auth().currentUser.uid,
          })
          .then(() => {
            this.newNoteTitle = null;
            this.newNoteContext = null;
            this.newNoteColor = "#ffffff";
            //location.reload();
          });
      }
    },
    changeColor(color) {
      this.newNoteColor = color;
    },
    markCheck(color) {
      return color == this.newNoteColor;
    },
  },
};
</script>
<style scoped>
.form {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid;
}
/* title input */
.title-input {
  height: 44px;
}
/* texteara */
#content-input {
  height: 46px;
  resize: none;
}
#content-input::-webkit-input-placeholder {
  line-height: 46px;
  vertical-align: middle;
}
#content-input::-moz-placeholder {
  line-height: 46px;
  vertical-align: middle;
}
#content-input:-ms-input-placeholder {
  line-height: 46px;
  vertical-align: middle;
}
/* both inputs */
.note-input {
  width: 598px;
  border: none;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
}
.options-div {
  background: #ffffff;
  display: flex;
  justify-content: space-between;
}
.options-div input {
  margin-left: 70px;
  width: 86px;
  height: 36px;
  background: none;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.options-div input:hover {
  background: #f1f3f4;
}
.options {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.icon {
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon:hover {
  background: #f1f3f4;
}
#submit{
  outline: none;
}
/* tooltip */
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
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
  background: grey;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.color{
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#white{
  background: #ffffff;
  border: solid 1px #5f6368;
  margin: 1px;
}
#red{
  background:#F28B82 ;
}
#orange{
  background: #FBBC04;
}
#yellow{
  background: #FFF475;
}
#green{
  background: #CCFF90;
}
#teal{
  background: #A7FFEB;
}
#blue{
  background: #CBF0F8;
}
#dark-blue{
  background: #AECBFA;
}
#purple{
  background: #D7AEFB;
}
#pink{
  background: #FDCFE8;
}
#brown{
  background: #E6C9A8;
}
#grey{
  background: #EBECEE;
}
</style>