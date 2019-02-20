<template>
  <div id="logoutButton">
    <button @click="logoutClicked()">Logout</button>
  </div>
</template>

<script>
import handleErrors from '../utils/error';

export default {
  name: 'Logout',
  methods: {
    logoutClicked() {
      this.$axios
        .post('http://localhost:8081/api/v1/authentication/logout')
        .then(() => {
          delete localStorage.token;
          delete localStorage.user;
          this.$store.commit('setInfoMessage', 'You have been logged out successfully');
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
