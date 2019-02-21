<template>
  <div id="logoutButton">
    <md-button class="md-accent" @click="logoutClicked()">Logout</md-button>
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
