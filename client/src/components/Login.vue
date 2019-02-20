<template>
  <div id="loginForm">
    <form v-on:submit.prevent>
      <label for="username">Username:</label><br/>
      <input type="text" id="username" name="username" v-model="username"><br/>
      <label for="password">Password:</label><br/>
      <input type="password" id="password" name="password" v-model="password"/>
      <br/>
      <br/>
      <input type="submit" value="Login" @click="loginSubmit(username, password)">
    </form>
  </div>
</template>

<script>
import handleErrors from '../utils/error';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    loginSubmit(username, password) {
      this.$axios
        .post('http://localhost:8081/api/v1/authentication/login', {
          username, password,
        })
        .then((response) => {
          localStorage.token = response.data.token;
          localStorage.user = this.username;
          this.$store.commit('setInfoMessage', 'You have been logged in successfully');
          window.location.reload();
        })
        .catch((error) => {
          handleErrors(this.$store, error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
