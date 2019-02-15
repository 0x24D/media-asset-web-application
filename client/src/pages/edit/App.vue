<template>
  <div id="app">
    <NavigationBar/>
    <EditFile/>
  </div>
</template>

<script>
import EditFile from '../../components/EditFile.vue';
import NavigationBar from '../../components/NavigationBar.vue';

export default {
  name: 'app',
  components: {
    EditFile,
    NavigationBar,
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
