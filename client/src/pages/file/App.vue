<template>
  <div id="app">
    <NavigationBar/>
    <File/>
  </div>
</template>

<script>
import NavigationBar from '../../components/NavigationBar.vue';
import File from '../../components/File.vue';

export default {
  name: 'app',
  components: {
    NavigationBar,
    File,
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
