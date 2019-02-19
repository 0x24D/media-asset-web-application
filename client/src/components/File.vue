<template>
  <div id="file">
    <dialog open>
      <button id="leftButton" @click="viewEarlierVersion(currentVersion.version)"
        :disabled="currentVersion.version === 1">Left</button>
        <div id="container">
          <table>
            <tr>
              <td>
                Name:
              </td>
              <td>
                {{ fileVersions[latestVersion - currentVersion.version].name  }}
              </td>
            </tr>
            <tr>
              <td>
                Title:
              </td>
              <td>
                {{ fileVersions[latestVersion - currentVersion.version].title }}
              </td>
            </tr>
            <tr>
              <td>
                Author:
              </td>
              <td>
                {{ fileVersions[latestVersion - currentVersion.version].author }}
              </td>
            </tr>
            <tr>
              <td>
                Tags:
              </td>
              <td>
                <div v-for="tag in fileVersions[latestVersion - currentVersion.version].tags"
                  :key="tag">
                  {{ tag }}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                Created date:
              </td>
              <td>
                {{ fileVersions[latestVersion - currentVersion.version].created_date }}
              </td>
            </tr>
            <tr>
              <td>
                Version:
              </td>
              <td>
                {{ fileVersions[latestVersion - currentVersion.version].version }}
              </td>
            </tr>
          </table>
        </div>
        <button id="rightButton" @click="viewLaterVersion(currentVersion.version)"
          :disabled="currentVersion.version === latestVersion">Right</button>
        <button id="closeButton" @click="viewFileClose()">Close</button>
    </dialog>
  </div>
</template>

<script>
export default {
  name: 'File',
  props: {
    fileId: String,
  },
  data() {
    return {
      latestVersion: '',
      currentVersion: {},
      fileVersions: [],
    };
  },
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/files/${this.fileId}`)
      .then((response) => {
        this.currentVersion = response.data;
        this.latestVersion = this.currentVersion.version;
        this.fileVersions.push(this.currentVersion);
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
    viewFileClose() {
      this.$store.commit('setFileDisplayMode', false);
    },
    viewEarlierVersion(currentVersion) {
      this.$axios
        .get(`http://localhost:8081/api/v1/files/${this.fileId}/${currentVersion - 1}`)
        .then((response) => {
          this.currentVersion = response.data;
          if (!this.fileVersions.some(e => e.version === this.currentVersion.version)) {
            this.fileVersions.push(this.currentVersion);
          }
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
    viewLaterVersion(currentVersion) {
      this.$axios
        .get(`http://localhost:8081/api/v1/files/${this.fileId}/${currentVersion + 1}`)
        .then((response) => {
          this.currentVersion = response.data;
          if (!this.fileVersions.some(e => e.version === this.currentVersion.version)) {
            this.fileVersions.push(this.currentVersion);
          }
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
