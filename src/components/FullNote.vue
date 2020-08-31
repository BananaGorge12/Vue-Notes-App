<template>
  <div id="full-note">
    <form @submit.prevent="update" :style="`background:${color};`" class="form">
      <input
        :style="`background:${color};`"
        placeholder="Title"
        v-model="title"
        class="note-input title-input"
        type="text"
      />
      <div
        contenteditable="true"
        placeholder="Take a note.."
        id="content-edit"
        class="note-input"
        @keydown="updateContent"
        :style="`background:${color};`"
      />
      <div class="options-div">
        <div class="options">
          <div @click="binNote" class="icon">
            <i class="fas fa-trash"></i>
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
            <i class="fas fa-file-image"></i>
          </div>
          <div class="icon" @click="archiveNote">
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
        <input style="float:right" class="submit" type="submit" value="Close" />
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
import moment from "moment";
export default {
  name: "fullNote",
  props: ["data"],
  data() {
    return {
      title: this.data.title,
      content: this.data.content,
      color: this.data.color,
    };
  },
  methods: {
    update() {
      this.content = document.getElementById("content-edit").innerText;
      db.collection("notes")
        .doc(this.data.id)
        .update({
          title: this.title,
          content: this.content,
          color: this.color,
          owner: firebase.auth().currentUser.uid,
          big: false,
        })
        .then(() => {
          this.$emit("close");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateContent() {
      this.content = document.getElementById("content-edit").innerText;
    },
    changeColor(color) {
      this.color = color;
    },
    binNote() {
      db.collection("notes")
        .doc(this.data.id)
        .update({
          deletionDate: moment(Date.now()).add("7", "days").valueOf(),
          bin: true,
        })
        .then(() => {
          this.$emit("close");
        });
    },
    archiveNote() {
      db.collection("notes").doc(this.data.id).update({
        archived:!this.data.archived
      }).then(() => {
        this.$emit('close')
      })
    },
    markCheck(color) {
      return color == this.color;
    },
  },
  mounted() {
    document.getElementById("content-edit").innerText = this.content;
  },
};
</script>
<style scoped>
/* note edit */
#full-note {
  z-index: 1000;
}
input {
  border: none;
  outline: none;
}
.title-input {
  outline: none;
  height: 50px;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  padding-left: 20px;
}
.icon {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon:hover {
  background: #f1f3f4;
}
#full-note #cover {
  opacity: 0.8;
  position: fixed;
  background: gray;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0px;
  top: 0;
}
#full-note form {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 600px;
  overflow: hidden;
  border-radius: 10px;
  opacity: 1;
  z-index: 2;
}
#content-edit {
  min-height: 90px;
  max-height: 75vh;
  padding: 20px;
  overflow-x: none;
  overflow-y: scroll;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
}
.submit {
  margin-left: 70px;
  width: 86px;
  height: 36px;
  background: none;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
#submit:hover {
  background: #f1f3f4;
}
.options-div {
  display: flex;
  align-items: center;
}
.options {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
/* scroll bar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
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

.color {
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#white {
  background: #ffffff;
  border: solid 1px #5f6368;
  margin: 1px;
}
#red {
  background: #f28b82;
}
#orange {
  background: #fbbc04;
}
#yellow {
  background: #fff475;
}
#green {
  background: #ccff90;
}
#teal {
  background: #a7ffeb;
}
#blue {
  background: #cbf0f8;
}
#dark-blue {
  background: #aecbfa;
}
#purple {
  background: #d7aefb;
}
#pink {
  background: #fdcfe8;
}
#brown {
  background: #e6c9a8;
}
#grey {
  background: #ebecee;
}
</style>