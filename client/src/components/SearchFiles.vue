<template>
  <div id="search">
    <input id="searchInput" type="search" placeholder="Search file metadata"
      @keyup="onSearchChange()"/>
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
