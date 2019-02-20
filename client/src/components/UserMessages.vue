<template>
  <div id="userMessages">
    <div id="errorMessage" v-if="this.$store.state.errorMessage">
      {{ this.$store.state.errorMessage }}
    </div>
    <div id="infoMessage" v-if="this.$store.state.infoMessage">
      {{ this.$store.state.infoMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMessages',
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
