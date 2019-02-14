<template>
  <div id="app">
    <Logout/>
  </div>
</template>

<script>
import Logout from './components/Logout.vue';

export default {
  name: 'app',
  components: {
    Logout,
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
