<template>
  <div id="file">
    <md-dialog id="dialog" :md-active="true">
      <md-card v-if="this.fileVersions[latestVersion - currentVersion.version]">
      <md-card-header>
        <div class="md-title">{{ fileVersions[latestVersion - currentVersion.version].name  }}</div>
      </md-card-header>
      <md-card-content>
        <md-list>
          <md-list-item>
            <span class="md-list-item-text">Title</span>
            <span class="md-list-item-text">
                {{ fileVersions[latestVersion - currentVersion.version].title }}</span>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text">Author</span>
            <span class="md-list-item-text">
                {{ fileVersions[latestVersion - currentVersion.version].author }}</span>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text">Tags</span>
            <span class="md-list-item-text">
                {{ fileVersions[latestVersion - currentVersion.version].tags.join(',') }}</span>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text">Date</span>
            <span class="md-list-item-text">{{
              new Date(fileVersions[latestVersion - currentVersion.version]
                .created_date).toDateString() }}
                <md-tooltip md-direction="bottom">
                    {{ new Date(fileVersions[latestVersion - currentVersion.version]
                    .created_date).toDateString() }}
                      {{ new Date(fileVersions[latestVersion - currentVersion.version]
                    .created_date).toLocaleTimeString() }}</md-tooltip>
            </span>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text">Version</span>
            <span class="md-list-item-text">
                {{ fileVersions[latestVersion - currentVersion.version].version }}</span>
          </md-list-item>
        </md-list>
      </md-card-content>
    </md-card>
      <md-dialog-actions style="justify-content: center">
        <md-button class="md-primary" id="leftButton"
          @click="viewEarlierVersion(currentVersion.version)"
          :disabled="currentVersion.version === 1">&lt;</md-button>
        <md-button class="md-primary" id="closeButton"
          @click="viewFileClose()">Close</md-button>
        <md-button class="md-primary" id="rightButton"
          @click="viewLaterVersion(currentVersion.version)"
          :disabled="currentVersion.version === latestVersion">&gt;</md-button>
      </md-dialog-actions>
    </md-dialog>
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
        handleErrors(this.$store, error);
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
          handleErrors(this.$store, error);
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
          handleErrors(this.$store, error);
        });
    },
  },
};
</script>

<style scoped>
#dialog {
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>
