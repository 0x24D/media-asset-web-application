<template>
  <div id="header">
    <h1> Header placeholder text </h1>
    <div v-if="userAuthenticated()">
      <Logout/>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import isUserAuthenticated from '../utils/auth';
import Login from './Login.vue';
import Logout from './Logout.vue';

export default {
  name: 'Header',
  components: {
    Login,
    Logout,
  },
  methods: {
    userAuthenticated() {
      return isUserAuthenticated();
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
