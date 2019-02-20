<template>
  <div id="newFile">
    <dialog open>
      <form @submit.prevent>
        <label for="name">File name: </label>
        <input type="text" id="name" v-model="file.name" required><br/>
        <label for="title">Title: </label>
        <input type="text" id="title" v-model="file.title" required><br/>
        <label for="author">Author: </label>
        <input type="text" id="author" v-model="file.author" required><br/>
        <label for="tags">Tags: </label>
        <input type="text" id="tags" v-model="file.tags"
          title="Comma-separated list of tags" pattern="(\w+)(,\s*\w+)*"><br/>
        <br/>

        <input type="submit" value="Submit" @click="newFileSubmit(file._id, file)">
        <input type="submit" value="Close" @click="newFileClose()">
      </form>
    </dialog>
  </div>
</template>

<script>
import handleErrors from '../utils/error';

export default {
  name: 'NewFile',
  data() {
    return {
      file: {
        name: '',
        title: '',
        author: localStorage.user || '',
        tags: '',
      },
    };
  },
  methods: {
    checkFormValidity() {
      return document.getElementById('name').checkValidity()
      && document.getElementById('tags').checkValidity()
      && document.getElementById('author').checkValidity()
      && document.getElementById('tags').checkValidity();
    },
    newFileClose() {
      this.$store.commit('setNewFileDisplayMode', false);
    },
    newFileSubmit(fileId, formData) {
      if (this.checkFormValidity()) {
        this.$axios
          .post('http://localhost:8081/api/v1/files/', {
            name: formData.name,
            title: formData.title,
            author: formData.author,
            tags: formData.tags.split(','),
          })
          .then(() => {
            this.$store.commit('setNewFileDisplayMode', false);
            this.$store.commit('setInfoMessage', 'File has been added');
            window.location.reload();
          })
          .catch((error) => {
            handleErrors(error);
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
