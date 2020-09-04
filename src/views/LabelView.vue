<template>
  <div class="label-view">
    <h2>{{this.$route.params.name}}</h2>
    <div class="notes">
      <fullNote @close="showFullNote = false" :data="currentNoteData" v-if="showFullNote" />
      <div v-if="showFullNote" @click="showFullNote = false" id="cover" />
      <div class="noteCover" v-for="note in notes" :key="note.id">
        <div
          v-if="!note.bin && !note.archived"
          @click="currentNoteDataUpdater(note)"
          class="note"
          :style="'background:'+note.color+';'"
        >
          <h2>{{note.title}}</h2>
          <h3>{{note.content}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
import fullNote from "@/components/FullNote";
export default {
  name: "labelView",
  data() {
    return {
      notes: [],
      showFullNote: false,
      currentNoteData: null,
    };
  },
  components: {
    fullNote,
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
          snap.docChanges().forEach((change) => {
            let note = change.doc.data();
            //console.log(note);
            if (change.type == "added" && this.checkNoteForLabel(note)) {
              let newNote = note;
              newNote.id = change.doc.id;
              newNote.big = false;
              newNote.index = this.notes.length;
              this.notes.push(newNote);
            } else if (change.type == "modified") {
              let unEditedNote = this.notes.filter((item) => {
                return item.id == change.doc.id;
              });
              if (this.checkNoteForLabel(unEditedNote)) {
                let updatedNote = note;
                this.notes[unEditedNote[0].index] = updatedNote;
              } else {
                this.notes = this.notes.filter((item) => {
                  return item.id != change.doc.id;
                });
              }
            } else if (change.type == "removed") {
              this.notes = this.notes.filter((item) => {
                return item.id != change.doc.id;
              });
            }
          });
        });
      }
    });
  },
  methods: {
    checkNoteForLabel(note) {
      let output = false;
      if (note.labels){
        note.labels.forEach((label) => {
          if (label == this.$route.params.name) {
            output = true;
          }
        });
      }
      return output;
    },
    currentNoteDataUpdater(note) {
      this.currentNoteData = {
        title: note.title,
        content: note.content,
        color: note.color,
        id: note.id,
        labels: note.labels,
      };
      this.showFullNote = true;
    },
  },
};
</script>
<style scoped>
  h2{
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>