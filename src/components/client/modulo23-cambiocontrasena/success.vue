<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-img class="terminado" src="@/assets/terminado.svg" />
          <h1 class="text-center">
            Tú contraseña ha sido restaurada con éxito
          </h1>
          <h3 class="text-center subtitle">
            Para acceder a todos tus beneficios por favor inicia sesión nuevamente.
          </h3>
          <br/>
          <v-btn color="primary2" dark block   @click="onClickNextButton">Ingresar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
  
  export default {
    components: {
      // ButtonSecondary,
      ButtonPrimary,
    },
    name: "regristroFinalizadoComp",
    data() {
      return {
        Name : 'user name'
      };
    },

    methods: {
      async onClickNextButton() {
        this.$router.push({ name: "login" });
      },
    },
    computed: {
      state() {
        return this.$store.state;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .terminado {
    width: 118.113px;
    height: 120px;
    flex-shrink: 0;
    margin: auto;
    padding: 10px;
  }
  .color-primary {
    color: #379bec !important;
  }
  
  .title {
    color: var(--secundarios-600, #000);
    text-align: center;
    /* Heading/Medium 1 */
    font-family: Barlow;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
  }
  
  .subtitle {
    color: var(--secundarios-600, #000);
    text-align: center;
    /* Heading/Medium 1 */
    font-family: Barlow;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
  }
  
  .center {
    margin: auto;
    padding: 10px;
  }
  
  .subtitle2 {
    color: var(--secundarios-600, #000);
    text-align: center;
    /* Heading/Medium 1 */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  </style>
  