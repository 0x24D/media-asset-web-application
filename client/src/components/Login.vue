<template>
  <div id="login">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Username</label>
                <md-input name="username" id="username" v-model="username" required/>
                <span class="md-error" v-if="!$v.username.required">Please enter your username</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="password" required/>
                <span class="md-error" v-if="!$v.password.required">Please enter your password</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" @click="loginSubmit(username, password)">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import handleErrors from '../utils/error';

export default {
  name: 'Login',
  mixins: [validationMixin],
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    loginSubmit(username, password) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
            console.log(error);
            handleErrors(this.$store, error);
          });
        }
    },
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    }
  }
};
</script>
