<template>
  <div id="editFile">
    <dialog open>
      <form @submit.prevent>
        <label for="name">File name: </label>
        <input type="text" id="name" v-model="file.name"><br/>
        <label for="title">Title: </label>
        <input type="text" id="title" v-model="file.title"><br/>
        <label for="author">Author: </label>
        <input type="text" id="author" v-model="file.author"><br/>
        <label for="tags">Tags: </label>
        <input type="text" id="tags" v-model="file.tags"><br/>
        <br/>

        <input type="submit" value="Submit" @click="newFileSubmit(file._id, file)">
        <input type="submit" value="Close" @click="newFileClose()">
      </form>
    </dialog>
  </div>
</template>

<script>
export default {
  name: 'NewFile',
  data() {
    return {
      file: {
        name: '',
        title: '',
        author: '',
        tags: '',
      },
    };
  },
  methods: {
    newFileClose() {
      this.$store.commit('setNewFileDisplayMode', false);
    },
    newFileSubmit(fileId, formData) {
      const tags = formData.tags.split(',');
      console.log(tags);
      this.$axios
        .post('http://localhost:8081/api/v1/files/', {
          name: formData.name,
          title: formData.title,
          author: formData.author,
          tags: tags,
        })
        .then(() => {
          this.$store.commit('setNewFileDisplayMode', false);
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
