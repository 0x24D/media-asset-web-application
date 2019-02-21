<template>
  <div id="newFile">
    <md-dialog id="dialog" :md-active="true">
      <form novalidate class="md-layout" @submit.prevent>
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">New File</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="name">File name</label>
                  <md-input name="name" id="name" v-model="file.name" required/>
                  <span class="md-error" v-if="!$v.file.name.required">File name is required</span>
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
            @click="newFileSubmit(file._id, file)">Submit</md-button>
            <md-button class="md-primary" id="closeButton" @click="newFileClose()">Close</md-button>
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
  name: 'NewFile',
  mixins: [validationMixin],
  data() {
    return {
      file: {
        name: '',
        title: '',
        author: localStorage.user || '',
        tags: '',
      },
    };
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
    newFileClose() {
      this.$store.commit('setNewFileDisplayMode', false);
    },
    newFileSubmit(fileId, formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/files/', {
            name: formData.name,
            title: formData.title,
            author: formData.author,
            tags: formData.tags.split(','),
          })
          .then(() => {
            this.$store.commit('setNewFileDisplayMode', false);
            this.$store.commit('setInfoMessage', 'File has been added');
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
      name: {
        required,
      },
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
