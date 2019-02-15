<template>
  <div id="app">
    <div v-if="userAuthenticated()">
      <Logout/>
    </div>
    <div v-else>
      <Login/>
    </div>
    <img alt="Vue logo" src="../../assets/logo.png">
    <h3> This is the homepage </h3>
  </div>
</template>

<script>
import Login from '../../components/Login.vue';
import Logout from '../../components/Logout.vue';

export default {
  name: 'app',
  components: {
    Login,
    Logout,
  },
  methods: {
    userAuthenticated() {
      return localStorage.token;
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
