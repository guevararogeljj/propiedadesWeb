<template>
  <v-app>

    <div class="content">
      <router-view v-if="show" />
    </div>
    <footerComponent v-if="show"/>
  </v-app>
</template>

<script>
import footerComponent from './components/shared/footer.vue';
export default {
  name: 'App',
  data(){
    return {
      show: true
    }
  },  
  components: {
    footerComponent
  },
  created() {
    if (window.top === window.self) {
      return;
    } else {
      this.show = false;
      return;
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
}</style>
