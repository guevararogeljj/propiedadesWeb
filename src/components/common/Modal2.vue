<template>
<v-dialog v-model="OpenClose" :scrim="false"
      transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        {{ Title }}
        <v-btn icon @click="OpenCloseFun">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
   
      </v-card-actions>
    </v-card>
  </v-dialog>
  </template>
  
  <script>
  import  ButtonSecondary  from "@/components/common/ButtonSecondary.vue";
  export default {
    components:{ButtonSecondary},
    name: "AlertDefault",
    props: {
      visible: Boolean,
      variant: String,
      OnCloseTittleButton: { type: Function, default: null },
      Title: {type:String, default: ''},
    },
    data() {
      return {
        OpenClose: this.visible,
      };
    },
    methods: {
      OpenCloseFun() {
        if (this.OnCloseTittleButton != null) {
          this.OnCloseTittleButton(this.OpenClose);
        }
      },
    },
    watch: {
      visible: function (newVal) {
        this.OpenClose = newVal;
      },
    },
  };
  </script>
  
  <style scoped>
  </style>