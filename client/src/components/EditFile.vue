<template>
  <div id="editFile">
    <md-dialog id="dialog" :md-active="true">
      <form novalidate class="md-layout" @submit.prevent>
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">Edit File</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="name">File name</label>
                  <md-input name="name" id="name" v-model="file.name" disabled/>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('title')">
                  <label for="title">Title</label>
                  <md-input name="title" id="title" v-model="file.title" required/>
                  <span class="md-error" v-if="!$v.file.title.required">Title is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('author')">
                  <label for="author">Author</label>
                  <md-input name="author" id="author" v-model="file.author" required/>
                  <span class="md-error" v-if="!$v.file.author.required">Author is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('tags')">
                  <label for="tags">Tags</label>
                  <md-input name="tags" id="tags" v-model="file.tags"
                  title="Comma-separated list of tags"/>
                  <span class="md-error" v-if="!$v.file.tags.commaSeparated">
                    Tags must be comma-separated</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
          <md-dialog-actions>
            <md-button class="md-primary" id="submitButton"
              @click="editFileSubmit(file._id, file)">Submit</md-button>
            <md-button class="md-primary" id="closeButton"
              @click="editFileClose(file._id)">Close</md-button>
          </md-dialog-actions>
        </md-card>
      </form>
    </md-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import handleErrors from '../utils/error';

const commaSeparated = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true;
  }
  return /^\w+(,\w+)*$/.test(value);
};

export default {
  name: 'EditFile',
  mixins: [validationMixin],
  props: {
    fileId: String,
  },
  data() {
    return {
      file: {},
    };
  },
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/files/${this.fileId}`)
      .then((response) => {
        this.file = response.data;
        this.file.author = localStorage.user;
      })
      .catch((error) => {
        handleErrors(this.$store, error);
      });
  },
  methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.file[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    editFileClose(fileId) {
      this.$axios
        .post(`http://localhost:8081/api/v1/files/lock/${fileId}`, {
          locked: false,
        })
        .then(() => {
          this.$store.commit('setEditFileDisplayMode', false);
        })
        .catch((error) => {
          handleErrors(this.$store, error);
        });
    },
    editFileSubmit(fileId, formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .put(`http://localhost:8081/api/v1/files/${fileId}`, {
            title: formData.title,
            author: formData.author,
            tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(','),
          })
          .then(() => {
            this.$store.commit('setEditFileDisplayMode', false);
            this.$store.commit('setInfoMessage', 'File has been updated');
            window.location.reload();
          })
          .catch((error) => {
            handleErrors(this.$store, error);
          });
      }
    },
  },
  validations: {
    file: {
      title: {
        required,
      },
      author: {
        required,
      },
      tags: {
        commaSeparated,
      },
    },
  },
};
</script>
