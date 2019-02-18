import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showFileModal: false,
    showEditFileModal: false,
    fileId: '',
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    setFileDisplayMode(s, boolean) {
      Vue.set(s, 'showFileModal', boolean);
    },
    setEditFileDisplayMode(s, boolean) {
      Vue.set(s, 'showEditFileModal', boolean);
    },
    setFileIdToDisplay(s, fileId) {
      Vue.set(s, 'fileId', fileId);
    },
  },
});
