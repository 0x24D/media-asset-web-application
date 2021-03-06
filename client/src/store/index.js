import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errorMessage: '',
    fileId: '',
    infoMessage: '',
    searchTerm: '',
    showEditFileModal: false,
    showFileModal: false,
    showNewFileModal: false,
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    setEditFileDisplayMode(s, boolean) {
      Vue.set(s, 'showEditFileModal', boolean);
    },
    setErrorMessage(s, text) {
      Vue.set(s, 'errorMessage', text);
    },
    setFileDisplayMode(s, boolean) {
      Vue.set(s, 'showFileModal', boolean);
    },
    setFileIdToDisplay(s, fileId) {
      Vue.set(s, 'fileId', fileId);
    },
    setFileSearchTerm(s, text) {
      Vue.set(s, 'searchTerm', text);
    },
    setInfoMessage(s, text) {
      Vue.set(s, 'infoMessage', text);
    },
    setNewFileDisplayMode(s, boolean) {
      Vue.set(s, 'showNewFileModal', boolean);
    },
  },
});
