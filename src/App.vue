<template>
  <div>
    <router-view />
    <footer>footer</footer>
  </div>
</template>

<script>
//
</script>
<style>
.content {
  background-color: #eaecee;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.my-card {
  background-image: url("@/assets/nodata.png");
  background-size: cover; /* This will make sure the image covers the entire card */
  background-position: center; /* This will center the image in the card */
}
</style>
