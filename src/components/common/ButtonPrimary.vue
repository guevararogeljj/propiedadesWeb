<template>
    <v-btn 
    elevation="1"
    x-small
    color="primary3"
    @click="onClickButtonInternal">
      <!-- <img v-if="ImageIcon != undefined" :src="ImageIcon" :alt="Text" height="20" class="pb-1" /> --> 
      <v-icon medium>{{Icon}}</v-icon>
      {{ Text }}
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "buttonComp",
    data() {
      return {
        
      };
    },
    props: {
      Text: { type: String, required: true },
      OnClickButton: { type: Function, default: null },
     Icon: { type: String, default: null },
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
  </style>