<template>
  <div id="files">
    <div class="buttons">
      <button id="newButton" @click="newFile()">New</button>
    </div>
    <div class="file" v-for="file in filteredResults" :key="file._id">
      <div @click="viewAllVersions(file._id)">
        <h3>{{ file.name }}</h3>
          <div>
            <table>
              <tr>
                <td>
                  Title:
                </td>
                <td>
                  {{ file.title }}
                </td>
              </tr>
              <tr>
                <td>
                  Author:
                </td>
                <td>
                  {{ file.author }}
                </td>
              </tr>
              <tr>
                <td>
                  Tags:
                </td>
                <td>
                  <div id="tagList">
                    <ul>
                      <li v-for="tag in file.tags" :key="tag">
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
                  {{ file.created_date }}
                </td>
              </tr>
              <tr>
                <td>
                  Version:
                </td>
                <td>
                  {{ file.version }}
                </td>
              </tr>
            </table>
          </div>
      </div>
      <div class="buttons">
        <button :id="file._id + '-edit'" class="editButton"
          :disabled="file.locked"
            @click="editFile(file._id)">Edit</button>
        <button :id="file._id + '-delete'" class="deleteButton"
          :disabled="file.locked"
            @click="deleteFile(file._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import handleErrors from '../utils/error';

export default {
  name: 'ListOfFiles',
  data() {
    return {
      files: [],
    };
  },
  computed: {
    filteredResults() {
      const flattenObject = (o => [].concat(...Object.keys(o).map(
        k => (typeof o[k] === 'object' ? flattenObject(o[k]) : ({ [k]: o[k] })),
      )));
      // eslint-disable-next-line
      const searchTerm = this.$store.state.searchTerm;
      let results = [];
      if (searchTerm) {
        this.files.forEach((file) => {
          const flattenedFile = Object.assign({}, ...flattenObject(file));
          let fileContains = false;
          Object.keys(flattenedFile).forEach((k) => {
            if (flattenedFile[k].toString().search(searchTerm) > -1) {
              fileContains = true;
            }
          });
          if (fileContains) {
            results.push(file);
          }
        });
      } else {
        results = this.files;
      }
      return results;
    },
  },
  methods: {
    deleteFile(fileId) {
      this.$axios
        .get(`http://localhost:8081/api/v1/files/${fileId}`)
        .then((response) => {
          if (response.data.locked) {
            this.$store.commit('setInfoMessage', 'This file is currently being edited by another user');
          } else {
            this.$axios
              .post(`http://localhost:8081/api/v1/files/lock/${fileId}`, {
                locked: true,
              })
              .then(() => {
                this.$axios
                  .delete(`http://localhost:8081/api/v1/files/${fileId}`)
                  .then(() => {
                    this.$store.commit('setInfoMessage', 'File has been deleted');
                    window.location.reload();
                  })
                  .catch((error) => {
                    handleErrors(this.$store, error);
                  });
              })
              .catch((error) => {
                handleErrors(this.$store, error);
              });
          }
        })
        .catch((error) => {
          handleErrors(this.$store, error);
        });
    },
    editFile(fileId) {
      this.$axios
        .get(`http://localhost:8081/api/v1/files/${fileId}`)
        .then((response) => {
          if (response.data.locked) {
            this.$store.commit('setInfoMessage', 'This file is currently being edited by another user');
          } else {
            this.$axios
              .post(`http://localhost:8081/api/v1/files/lock/${fileId}`, {
                locked: true,
              })
              .then(() => {
                this.$store.commit('setFileIdToDisplay', fileId);
                this.$store.commit('setEditFileDisplayMode', true);
              })
              .catch((error) => {
                handleErrors(this.$store, error);
              });
          }
        })
        .catch((error) => {
          handleErrors(this.$store, error);
        });
    },
    newFile() {
      this.$store.commit('setNewFileDisplayMode', true);
    },
    viewAllVersions(fileId) {
      this.$store.commit('setFileIdToDisplay', fileId);
      this.$store.commit('setFileDisplayMode', true);
    },
  },
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/files')
      .then((response) => {
        this.files = response.data;
      })
      .catch((error) => {
        handleErrors(this.$store, error);
      });
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
