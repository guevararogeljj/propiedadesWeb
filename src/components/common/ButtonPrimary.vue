<template>
    <v-btn type="button"
    class="btn btn-primary"
    @click="onClickButtonInternal">
    <v-icon class="search-icon"></v-icon>
      <!-- <img v-if="ImageIcon != undefined" :src="ImageIcon" :alt="Text" height="20" class="pb-1" /> --> 
      {{ Text }}
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "buttonComp",
    data() {
      return {};
    },
    props: {
      Text: { type: String, required: true },
      OnClickButton: { type: Function, default: null },
      ImageIcon: { type: String, required: false },
    },
    methods: {
      onClickButtonInternal() {
        if (this.OnClickButton !== null) {
          this.OnClickButton();
        }
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .btn-primary {
    background-color: #0092bc;
    border-color: #0092bc;
  }
  
  .btn.btn-primary {
    color: #ffffff;
    font-family: "Roboto";
    font-style: normal;
    // font-weight: 500;
    // font-size: 1.22rem;
    // line-height: 22px;
  }
  </style>