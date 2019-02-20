<template>
  <div id="editFile">
    <dialog open>
      <form @submit.prevent>
        <label for="name">File name: </label>
        <input type="text" id="name" v-model="file.name" disabled><br/>
        <label for="title">Title: </label>
        <input type="text" id="title" v-model="file.title" required><br/>
        <label for="author">Author: </label>
        <input type="text" id="author" v-model="file.author" required><br/>
        <label for="tags">Tags: </label>
        <input type="text" id="tags" v-model="file.tags"
          title="Comma-separated list of tags" pattern="(\w+)(,\s*\w+)*"><br/>
        <br/>

        <input type="submit" value="Submit" @click="editFileSubmit(file._id, file)">
        <input type="submit" value="Close" @click="editFileClose()">
      </form>
    </dialog>
  </div>
</template>

<script>
export default {
  name: 'EditFile',
  props: {
    fileId: String,
  },
  data() {
    return {
      file: {},
    };
  },
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/files/${this.fileId}`)
      .then((response) => {
        this.file = response.data;
        this.file.author = localStorage.user;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  methods: {
    checkFormValidity() {
      return document.getElementById('tags').checkValidity()
      && document.getElementById('author').checkValidity()
      && document.getElementById('tags').checkValidity();
    },
    editFileClose() {
      this.$store.commit('setEditFileDisplayMode', false);
    },
    editFileSubmit(fileId, formData) {
      if (this.checkFormValidity()) {
        this.$axios
          .put(`http://localhost:8081/api/v1/files/${fileId}`, {
            title: formData.title,
            author: formData.author,
            tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(','),
          })
          .then(() => {
            this.$store.commit('setEditFileDisplayMode', false);
            window.location.reload();
          })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
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
#tagList ul{
  list-style: none;
}
#tagList li{
  display: inline;
}
</style>
