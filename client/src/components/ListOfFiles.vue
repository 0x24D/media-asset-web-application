<template>
  <div id="files">
    <div class="file" v-for="file in files" :key="file._id">
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
                  <div v-for="tag in file.tags" :key="tag">
                    {{ tag }}
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
      <div id="buttons">
        <button id="editButton" @click="editFile(file._id)">Edit</button>
        <button id="deleteButton" @click="deleteFile(file._id)">Delete</button>
      </div>
    </div>
  </div>
  <!-- <File/> -->
</template>

<script>
import File from './File.vue';
export default {
  name: 'ListOfFiles',
  data() {
    return {
      files: [],
    };
  },
  components: {
    File,
  },
  methods: {
    deleteFile(fileId) {
      console.log('TODO: implement deleteFile in ListOfFiles');
    },
    editFile(fileId) {
      this.$store.commit('app/setFileIdToDisplay', fileId);
      this.$store.commit('app/setEditFileDisplayMode', true);
    },
    viewAllVersions(fileId) {
      this.$store.commit('app/setFileIdToDisplay', fileId);
      this.$store.commit('app/setFileDisplayMode', true);
    },
  },
  mounted() {
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
</style>
