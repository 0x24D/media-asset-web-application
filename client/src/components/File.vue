<template>
  <div id="file">
    TO implement
    <div id="buttons">
      <button @click="editFile(file._id)">Edit</button>
      <button @click="deleteFile(file._id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'File',
  data() {
    return {
      file: {},
    };
  },
  created() {
    const currentUrl = window.location.pathname.split('/');
    const fileId = currentUrl[2];
    this.$axios
      .get(`http://localhost:8081/api/v1/files/${fileId}`)
      .then((response) => {
        this.post = response.data;
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
    deleteFile(fileId) {
      this.$axios
        .delete(`http://localhost:8081/api/v1/files/${fileId}`)
        .then(() => {
          this.file = [];
          window.location.href = '/all';
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
    editFile(fileId) {
      window.location.href = `/edit/${fileId}`;
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
