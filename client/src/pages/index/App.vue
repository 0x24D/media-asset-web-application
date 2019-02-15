<template>
  <div id="app">
    <div v-if="userAuthenticated()">
      <Logout/>
    </div>
    <div v-else>
      <Login/>
    </div>
    <NavigationBar/>
    <img alt="Vue logo" src="../../assets/logo.png">
    <h3> This is the homepage </h3>
  </div>
</template>

<script>
import isUserAuthenticated from '../../utils/auth';
import Login from '../../components/Login.vue';
import Logout from '../../components/Logout.vue';
import NavigationBar from '../../components/NavigationBar.vue';

export default {
  name: 'app',
  components: {
    Login,
    Logout,
    NavigationBar,
  },
  methods: {
    userAuthenticated() {
      return isUserAuthenticated();
    },
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
