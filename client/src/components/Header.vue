<template>
  <div id="header">
    <md-toolbar class="md-primary">
      <h3 class="md-title">TMS Asset Management System</h3>
      <div v-if="userAuthenticated()">
        <Logout/>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import isUserAuthenticated from '../utils/auth';
import Logout from './Logout.vue';

export default {
  name: 'Header',
  components: {
    Logout,
  },
  methods: {
    userAuthenticated() {
      return isUserAuthenticated();
    },
  },
};
</script>
