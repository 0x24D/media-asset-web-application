<template>
  <div id="app">
    <Header/>
    <UserMessages/>
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="userAuthenticated()">
      <SearchFiles/>
      <ListOfFiles/>
      <div v-if="this.$store.state.showEditFileModal">
        <EditFile :file-id="this.$store.state.fileId"/>
      </div>
      <div v-if="this.$store.state.showFileModal">
        <File :file-id="this.$store.state.fileId"/>
      </div>
      <div v-if="this.$store.state.showNewFileModal">
        <NewFile/>
      </div>
    </div>
    <div v-else>
      <h3> Please login above </h3>
    </div>
  </div>
</template>

<script>
import isUserAuthenticated from './utils/auth';
import EditFile from './components/EditFile.vue';
import File from './components/File.vue';
import NewFile from './components/NewFile.vue';
import Header from './components/Header.vue';
import ListOfFiles from './components/ListOfFiles.vue';
import SearchFiles from './components/SearchFiles.vue';
import UserMessages from './components/UserMessages.vue';

export default {
  name: 'app',
  components: {
    EditFile,
    File,
    Header,
    ListOfFiles,
    NewFile,
    SearchFiles,
    UserMessages,
  },
  methods: {
    userAuthenticated() {
      return isUserAuthenticated();
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
