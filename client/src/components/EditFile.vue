<template>
  <div id="editFile">
    <form v-on:submit.prevent>
      TO implement
       <br/>
       <br/>
       <input type="submit" value="Edit" @click="editFileSubmit(file._id, file)">
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditFile',
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
        this.file = response.data;
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
    editFileSubmit(fileId, formData) {
      this.$axios
        .put(`http://localhost:8081/api/v1/files/${fileId}`, {
          // TODO
        })
        .then((response) => {
          window.location.href = `/view/${fileId}`;
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
#tagList ul{
  list-style: none;
}
#tagList li{
  display: inline;
}
</style>
