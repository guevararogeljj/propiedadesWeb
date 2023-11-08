<template>
  <v-app>

    <div class="content">
      <router-view />

    </div>
    <footerComponent />
  </v-app>
</template>

<script>
import footerComponent from './components/shared/footer.vue';
export default {
  name: 'App',
  components: {
    footerComponent
  }

};
//
</script>
<style>
.content {
  background-color: #eaecee;
}

.my-card {
  background-image: url("@/assets/nodata.png");
  background-size: cover;
  /* This will make sure the image covers the entire card */
  background-position: center;
  /* This will center the image in the card */
}

.WordSection1 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}</style>
