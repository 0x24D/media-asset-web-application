<template>
  <div id="files">
    <div class="file" v-for="file in files" :key="file._id">
      <div>
        <h3 class="headline mb-0">{{ file.name }}</h3>
          <div>
            <table>
              <tr>
                <td>
                  Title:
                </td>
                <td>
                  {{ file.data[file.data.length - 1].title }}
                </td>
              </tr>
              <tr>
                <td>
                  Author:
                </td>
                <td>
                  {{ file.data[file.data.length - 1].author }}
                </td>
              </tr>
              <tr>
                <td>
                  Tags:
                </td>
                <td>
                  <div v-for="tag in file.data[file.data.length -1].tags" :key="tag">
                    {{ tag }}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Created date:
                </td>
                <td>
                  {{ file.data[file.data.length - 1].created_date }}
                </td>
              </tr>
              <tr>
                <td>
                  Version:
                </td>
                <td>
                  {{ file.data[file.data.length - 1].version }}
                </td>
              </tr>
            </table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListOfFiles',
  data() {
    return {
      files: null,
    };
  },
  mounted() {
    this.$axios
      .get('http://localhost:8081/v1/files')
      .then((response) => {
        this.files = response.data;
      });
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
