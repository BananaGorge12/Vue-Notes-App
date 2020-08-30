<template>
  <div class="bin">
    <div class="container">
        <h2>Notes in the Recycle Bin are deleted after 7 days.</h2>
        <h3 id="deleteAllNotes" @click="deleteAllNotes">Delete all notes</h3>
        <div class="notes">
          <div class="noteCover" v-for="note in notes" :key="note.id">
            <div @mouseover="note.hover = true" @mouseleave="note.hover = false" class="note" :style="'background:'+note.color+';'">
              <div class="icon-container">
                  <i v-if="note.hover" @click="deleteNote(note.id)" class="fas fa-trash fa-lg"></i>
                  <i v-if="note.hover" @click="restore(note.id)" class="fas fa-trash-restore fa-lg"></i>
              </div>
              <h2>{{note.title}}</h2>
              <h3>{{note.content}}</h3>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: "bin",
  data() {
    return {
        notes:[],
    };
  },
  created(){
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
          .where("owner", "==", firebase.auth().currentUser.uid).where("bin",'==',true)
        ref.onSnapshot((snap) => {
          snap.docChanges().forEach(change => {
            let note = change.doc.data()
            if(change.type == 'added'){
                let newNote = note
                newNote.id = change.doc.id
                newNote.big = false
                newNote.index = this.notes.length
                newNote.hover = false
                if(newNote.deletionDate <= Date.now()){
                    this.deleteNote(newNote.id)
                }else{
                    this.notes.push(newNote)
                }
            }
            //on removed
            else if(change.type == 'removed'){
              this.notes = this.notes.filter(item => {
                return item.id != change.doc.id
              })
            }
            else if(change.type == 'modified'){
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
    deleteNote(id) {
      db.collection("notes")
        .doc(id)
        .delete()
        .then(() => {
          //put function after delete if you ever need to. from past ilay ;)
        });
    },
    deleteAllNotes(){
        db.collection('notes').where("owner", "==", firebase.auth().currentUser.uid).where("bin",'==',true).get().then(snap => {
            snap.forEach(note => {
                db.collection('notes').doc(note.id).delete()
            })
        })
    },
    restore(id){
      db.collection('notes').doc(id).update({
        bin:false
      })
    }
  }
};
</script>
<style scoped>
    i{
        margin: 10px;
        cursor: pointer;
    }
    .noteCover{
      height: fit-content;
    }
    #deleteAllNotes{
        font-weight: 500;
        color: rgb(29, 98, 161);
        cursor: pointer;
    }
    #deleteAllNotes:hover{
        text-decoration: underline;
    }
    .icon-container{
      display: flex;
    }
</style>