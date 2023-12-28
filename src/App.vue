<template>
  <v-app>

    <div class="content">
      <router-view v-if="show" />
    </div>
    <footerComponent v-if="show"/>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import footerComponent from './components/shared/footer.vue';
const show = true;
const analitics = import.meta.env.VITE_APP_G_ANALYTICS;
onMounted(() => {
  if (window.top === window.self) {
    // Call the function with the provided ID
      setupGoogleTagManager(analitics);
      return;
    } else {
      show.value = false;
      return;
    }
});

const setupGoogleTagManager = (id) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);
};

</script>
<style>
.content {
  background-color: none;
  align-items: center justify;
  width: 100%;
  font-family: Barlow;
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
