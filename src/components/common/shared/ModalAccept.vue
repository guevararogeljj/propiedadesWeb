<template>
    <div>
        <v-dialog :v-model="ShowDialog" fullscreen hide-overlay>
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
        <v-btn text @click="OpenCloseFun">CANCELAR</v-btn>
        <v-btn color="primary" @click="onClickAcceptButton">ACEPTAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    </div>
  </template>
  
  <script>
  import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
  import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
  export default {
    components: { ButtonSecondary, ButtonPrimary },
    name: "modalAceptComp",
    props: {
        ShowDialog: Boolean,
      OnCloseTittleButton: { type: Function, default: null },
      OnClickAcceptButton: { type: Function, default: null },
      Title: { type: String, default: "" },
    },
    data() {
      return {
        OpenClose: this.Show,
      };
    },
    methods: {
      OpenCloseFun() {
        if (this.OnCloseTittleButton != null) {
          this.OnCloseTittleButton(this.OpenClose);
        }
      },
      onClickAcceptButton() {
        if (this.OnClickAcceptButton != null) {
          this.OnClickAcceptButton();
        }
      },
    },
    watch: {
      Show: function (newVal) {
        this.OpenClose = newVal;
      },
    },
  };
  </script>
  
  <style scoped >
  .btn-close {
    background: 1px;
  }
  .dialog-main {
    background:rgba(0, 147, 188, 0.393);
  }
  .dialog-shadow {
    border: 1px #0092bc solid;
    box-shadow: 10px 10px 30px -7px rgba(0,0,0,0.75);
  }
  </style>