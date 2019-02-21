<template>
  <div id="files">
    <div class="file" v-for="file in filteredResults" :key="file._id">
      <md-card md-with-hover class="md-size-75">
          <md-card-header>
            <div class="md-title">{{ file.name }}</div>
          </md-card-header>
          <md-card-content>
            <md-list>
              <md-list-item>
                <span class="md-list-item-text">Title</span>
                <span class="md-list-item-text">{{ file.title }}</span>
              </md-list-item>
              <md-list-item>
                <span class="md-list-item-text">Author</span>
                <span class="md-list-item-text">{{ file.author }}</span>
              </md-list-item>
              <md-list-item>
                <span class="md-list-item-text">Tags</span>
                <span class="md-list-item-text">{{ file.tags.join(',') }}</span>
              </md-list-item>
              <md-list-item>
                <span class="md-list-item-text">Date</span>
                <span class="md-list-item-text">{{ new Date(file.created_date).toDateString() }}
                {{ new Date(file.created_date).toLocaleTimeString() }}</span>
              </md-list-item>
              <md-list-item>
                <span class="md-list-item-text">Version</span>
                <span class="md-list-item-text">{{ file.version }}</span>
              </md-list-item>
            </md-list>
          </md-card-content>
          <md-card-actions class="buttons">
            <md-button :id="file._id + '-view'" class="md-raised"
                @click="viewAllVersions(file._id)">View All Versions</md-button>
            <md-button :id="file._id + '-edit'" class="md-raised"
              :disabled="file.locked"
                @click="editFile(file._id)" :title="file.locked ?
                'This file is currently being edited by another user' : ''">Edit File</md-button>

            <md-button :id="file._id + '-delete'" class="md-raised"
              :disabled="file.locked"
                @click="deleteFile(file._id)"  :title="file.locked ?
                'This file is currently being edited by another user' : ''">Delete File</md-button>
          </md-card-actions>
        </md-card>
    </div>
    <md-button class="md-fab md-fab-top-right" @click="newFile()">
      <md-icon>+</md-icon>
    </md-button>
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
            if (k !== '_id') {
              let value = flattenedFile[k];
              if (k === 'created_date') {
                value = `${new Date(value).toDateString()} ${new Date(value).toLocaleTimeString()}`;
              }
              if (value.toString().search(searchTerm) > -1) {
                fileContains = true;
              }
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

<style scoped>
button:disabled,
button[disabled]{
  pointer-events: auto;
}
</style>
