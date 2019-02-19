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
        <button id="editButton" @click="editFile(file._id)">Edit</button>
        <button id="deleteButton" @click="deleteFile(file._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListOfFiles',
  data() {
    return {
      files: [],
    };
  },
  computed: {
    filteredResults() {
      const flattenFunction = (o => [].concat(...Object.keys(o).map(
        k => (typeof o[k] === 'object' ? flattenFunction(o[k]) : ({ [k]: o[k] })),
      )));
      // eslint-disable-next-line
      const searchTerm = this.$store.state.searchTerm;
      let results = [];
      if (searchTerm) {
        this.files.forEach((file) => {
          const flattenedFile = Object.assign({}, ...flattenFunction(file));
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
        .delete(`http://localhost:8081/api/v1/files/${fileId}`)
        .then(() => {
          window.location.reload();
        });
    },
    editFile(fileId) {
      this.$store.commit('setFileIdToDisplay', fileId);
      this.$store.commit('setEditFileDisplayMode', true);
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
