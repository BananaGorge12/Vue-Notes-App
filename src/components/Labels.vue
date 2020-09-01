<template>
  <div class="labels">
    <div class="cover" @click="addlabels" />
    <div class="label-box">
      <h3>Edit labels</h3>
      <!-- make a new label -->
      <div class="input-field">
        <i class="fas fa-times fa-lg" @click="labelname = null"></i>
        <input style="background:none;border:none;border-bottom:solid 1px;border-radius:0; margin:10px auto;width:14vw;"
         placeholder="Create new label" v-model="labelname" type="text" />
        <i class="fas fa-check fa-lg" @click="addlabelToList"></i>
      </div>
      <!-- all labels -->
      <div v-for="(label,index) in allLabels" :key="index" class="input-field">
          <i @click="deleteLabel(index)" class="fas fa-tag fa-lg"></i>
          <input style="background:none;border:none;border-bottom:solid 1px;border-radius:0; margin:10px auto;width:14vw;"
           placeholder="Create new label" :value="label" type="text" :id="`labelNum${index}`" @keyup="updateLabel(index,`labelNum${index}`)">
          <i class="fas fa-pen fa-lg"></i>
      </div>
      <div class="divider"></div>
      <button @click="addlabels">Done</button>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "labels",
  data() {
    return {
      labelname: null,
      allLabels: [],
      userUid: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(() => {
      db.collection("users")
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.userUid = doc.id;
            this.allLabels = doc.data().labels;
          });
        });
    });
  },
  methods: {
    addlabelToList(){
        this.allLabels.push(this.labelname)
        this.labelname = null
    },
    addlabels() {
        //updates db
        db.collection('users').doc(this.userUid).update({
            labels:this.allLabels
        }).then(() => {
            this.labelname = null
            this.$emit('close')
        })
    },
    closeLabelWindow() {
      this.$emit("close");
    },
    updateLabel(index,id){
        this.allLabels[index] = document.getElementById(id).value
    },
    deleteLabel(index){
        this.allLabels.splice(index,1)
    }
  },
};
</script>
<style scoped>
.cover {
  opacity: 0.8;
  position: fixed;
  background: gray;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0px;
  top: 0;
}
.label-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: fit-content;
  max-height: 90vh;
  overflow-y: scroll;
  background: #ffffff;
  opacity: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
}
.input-field {
  align-self: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
.fas{
    margin: 10px;
}
h3 {
  margin-left: 10px;
}
input {
  background: none;
  width: 10vw;
  border-bottom: solid 1px gray;
  border-radius: 0;
}
button {
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
button:hover {
  background: #d6d6d6;
}
</style>