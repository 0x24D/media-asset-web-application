<template>
<div id="navBar">
  <a href="/index">Home</a>
  <a href="/new">Add New File</a>
  <a href="/all">View All Files</a>
</div>
</template>

<script>
export default {
  name: 'NavigationBar',
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
#navBar ul{
  list-style: none;
}
#navBar li{
  display: inline;
}

/* Add a black background color to the top navigation */
#navBar {
  background-color: #35495e;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
#navBar a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
#navBar a:hover {
  background-color: #41b883;
  color: black;
}
</style>
