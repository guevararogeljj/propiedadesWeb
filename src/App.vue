<template>
  <v-app>
    <div class="content">
      <router-view v-if="show" />
    </div>
    <footerComponent v-if="show" />
  </v-app>
</template>

<script>
import footerComponent from './components/shared/footer.vue';
export default {
  name: 'App',
  data() {
    return {
      show: true,
      id: import.meta.env.VITE_APP_G_ANALYTICS
    }
  },
  components: {
    footerComponent
  },
  created() {
    if (window.top === window.self) {
      this.setupGoogleTagManager(this.id);
      return;
    } else {
      this.show = false;
      return;
    }
  },
  methods: {
    setupGoogleTagManager(id) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      document.head.appendChild(script);
    }
  }
};
//
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
}
</style>
