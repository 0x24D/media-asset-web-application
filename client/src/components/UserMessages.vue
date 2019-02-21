<template>
  <div id="userMessages">
      <md-snackbar md-position="center" :md-active="!!this.$store.state.errorMessage" md-persistent>
        <span>{{ this.$store.state.errorMessage }}</span>
      </md-snackbar>
      <md-snackbar md-position="center" :md-active="!!this.$store.state.infoMessage" md-persistent>
        <span>{{ this.$store.state.infoMessage }}</span>
      </md-snackbar>
  </div>
</template>

<script>
export default {
  name: 'UserMessages',
};
</script>
