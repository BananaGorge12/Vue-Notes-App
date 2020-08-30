<template>
  <div class="home">
    <div class="container">
      <newNote />
      <p id="uploadStatus" v-if="uploadStatus">{{uploadStatus}}</p>
      <div id="notes">
        <fullNote @close="showFullNote = false" :data="currentNoteData"  v-if="showFullNote" />
        <div v-if="showFullNote" @click="showFullNote = false" id="cover"/>
        <div class="noteCover" v-for="note in notes" :key="note.id">
          <div v-if="!note.bin" @click="currentNoteDataUpdater(note)" class="note" :style="'background:'+note.color+';'">
            <h2>{{note.title}}</h2>
            <h3>{{note.content}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import fullNote from "@/components/FullNote";
import newNote from "@/components/NewNote";
export default {
  name: "Home",
  data() {
    return {
      notes: [],
      uploadStatus: null,
      showFullNote:false,
      currentNoteData:null
    };
  },
  components: {
    fullNote,
    newNote,
  },
  created() {
    //logins user
    firebase.auth().onAuthStateChanged(() => {
      //route guard
      let user = firebase.auth().currentUser;
      if (!user) {
        this.$router.push({ name: "Login" });
      } else {
        //gets notes/updates
        let ref = db
          .collection("notes")
          .where("owner", "==", firebase.auth().currentUser.uid);
        ref.onSnapshot((snap) => {
          snap.docChanges().forEach(change => {
            let note = change.doc.data()
            if(change.type == 'added'){
              let newNote = note
              newNote.id = change.doc.id
              newNote.big = false
              newNote.index = this.notes.length
              this.notes.push(newNote)
            }
            else if(change.type == 'modified'){
              let unEditedNote = this.notes.filter(item => {
                return item.id == change.doc.id
              })
              let updatedNote = note
              updatedNote.id = unEditedNote[0].id
              updatedNote.index = unEditedNote[0].index
              this.notes[unEditedNote[0].index] = updatedNote
            }else if(change.type == 'removed'){
              this.notes = this.notes.filter(item => {
                return item.id != change.doc.id
              })
            }
          })
        })
      }
    });
  },
  methods: {
    uploadPic(e) {
      this.uploadStatus = "Uploading...";
      //get file
      var file = e.target.files[0];
      //get ref
      var storage = firebase.storage();
      var storageRef = firebase.storage().ref("photos/" + file.name);
      //upload
      storageRef.put(file).then(() => {
        this.uploadStatus = "Uploaded!";
        setTimeout(function () {
          this.uploadStatus = null;
        }, 5000);
        var gsReference = storage.refFromURL("gs://bucket/photos/" + file.name);
        console.log(gsReference.getDownloadURL());
      });
    },
    currentNoteDataUpdater(note){
      this.currentNoteData = {
        title:note.title,
        content:note.content,
        color:note.color,
        id:note.id
      }
      this.showFullNote = true
    }
  },
};
</script>
<style scoped>
.home .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* note container */
.home #notes {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
}
h3 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 20px;
}
/* notes */
.home .note {
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
.home .note h2 {
  margin: 0;
  margin-top: 10px;
  font-weight: 500;
}
.home .note h3 {
  padding: 0 20px;
  font-weight: 300;
}
.noteCover{
  height: fit-content;
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
uploadStatus {
  color: grey;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}
</style>