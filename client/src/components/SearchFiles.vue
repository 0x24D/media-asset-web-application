<template>
  <div id="search">
      <md-field>
      <md-input id="searchInput" type="search"
        placeholder="Search file metadata" @keyup="onSearchChange()"/>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'SearchFiles',
  methods: {
    onSearchChange() {
      this.$store.commit('setFileSearchTerm', document.getElementById('searchInput').value);
    },
  },
};
</script>
