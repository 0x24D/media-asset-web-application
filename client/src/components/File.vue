<template>
  <div id="file">
    <dialog open>
      <button id="leftButton" @click="viewEarlierVersion(currentVersion.version)"
        :disabled="currentVersion.version === 1">Left</button>
        <div v-if="fileVersions[latestVersion - currentVersion.version]" id="container">
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
                <div id="tagList">
                  <ul>
                    <li v-for="tag in fileVersions[latestVersion - currentVersion.version].tags"
                      :key="tag">
                      {{ tag }}
                    </li>
                  </ul>
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
import handleErrors from '../utils/error';

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
        handleErrors(error);
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
          handleErrors(error);
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
          handleErrors(error);
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
