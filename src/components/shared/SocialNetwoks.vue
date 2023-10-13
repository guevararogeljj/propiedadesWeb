<template>
    <div class="wrapper ps-1 pe-1">
      <a :href="facebookurl">
        <img
          class="socialnetwork_logo m-1"
          :src="require('@/assets/facebook_logo.svg')"
        />
      </a>
      <a :href="twitterurl">
        <img
          class="socialnetwork_logo m-1"
          :src="require('@/assets/twitter_logo.svg')"
        />
      </a>
      <a :href="instagramurl">
        <img
          class="socialnetwork_logo m-1"
          :src="require('@/assets/instagram_logo.svg')"
        />
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: "socialNetworksComp",
    data() {
      return {
        facebookurl: "https://www.facebook.com",
        instagramurl: "https://www.instagram.com/finastrategy/",
        twitterurl: "https://twitter.com",
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  .wrapper {
    background: #ffffff;
    border-radius: 5px;
    display: table;
  }
  .socialnetwork_logo {
    height: 40px;
  }
  </style>