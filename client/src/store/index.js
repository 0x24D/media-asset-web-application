import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileId: '',
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
    setFileDisplayMode(s, boolean) {
      Vue.set(s, 'showFileModal', boolean);
    },
    setFileIdToDisplay(s, fileId) {
      Vue.set(s, 'fileId', fileId);
    },
    setNewFileDisplayMode(s, boolean) {
      Vue.set(s, 'showNewFileModal', boolean);
    },
  },
});
