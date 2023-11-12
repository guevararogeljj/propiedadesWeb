<template>
    <v-btn 
      type="button" 
      @click="onClickButtonInternal"
      :disabled="IsDisabled"
  
    >
    <v-icon medium>{{Icon}}</v-icon>
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
      Icon: { type: String, required: false },
      IsDisabled: { type: Boolean, default: false },

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
  $main: #0092bc;
  
  .btn-secondary {
    background-color: #ffffff;
    border-color: $main;
  }
  
  .btn-secondary:hover {
    border-color: $main;
    background: rgba(0, 146, 188, 0.1);
  }
  
  .btn.btn-secondary {
    color: #0092bc;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
  }
  </style>