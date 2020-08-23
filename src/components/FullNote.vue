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
          <div class="icon">
            <i class="far fa-bell"></i>
          </div>
          <div class="icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="icon">
            <i class="tooltip fas fa-palette">
              <div id="colors" class="tooltiptext">
                <div @click="changeColor('#ffffff')" id="white" class="color"></div>
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
        <input style="float:right" id="submit" type="submit" value="Close" />
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
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
          color:this.color
        })
        .then(() => {
          location.reload();
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
  max-height: 850px;
  overflow: hidden;
  border-radius: 10px;
  opacity: 1;
  z-index: 2;
}
#content-edit {
  min-height: 90px;
  max-height: 700px;
  overflow: scroll;
  overflow-x: none;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
}
#submit {
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
</style>