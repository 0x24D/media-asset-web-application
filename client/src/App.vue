<template>
  <div id="app">
    <Header/>

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
      <Login/>
    </div>
    <UserMessages/>
  </div>
</template>

<script>
import isUserAuthenticated from './utils/auth';
import EditFile from './components/EditFile.vue';
import File from './components/File.vue';
import NewFile from './components/NewFile.vue';
import Header from './components/Header.vue';
import ListOfFiles from './components/ListOfFiles.vue';
import Login from './components/Login.vue';
import SearchFiles from './components/SearchFiles.vue';
import UserMessages from './components/UserMessages.vue';

export default {
  name: 'app',
  components: {
    EditFile,
    File,
    Header,
    ListOfFiles,
    Login,
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
