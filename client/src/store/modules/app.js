import Vue from 'vue';

const state = {
  showFileModal: false,
  showEditFileModal: false,
  fileId: '',
};

// getters
const getters = {
};

// actions
const actions = {
};

// mutations
const mutations = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
