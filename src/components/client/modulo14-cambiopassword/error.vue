<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-img class="terminado" src="@/assets/sentiment_dissatisfied.svg" />
          <h1 class="text-center">
            Lo sentimos, la operación solicitada no ha podido efectuarse
          </h1>
          <h3 class="text-center subtitle">
            Lamentamos las molestias, por favor intenta nuevamente o actualiza tu navegador.
          </h3>
          <br />
          <v-btn class="btn" flat  @click="onClickNextButton">Ir a inicio</v-btn>
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
        Name: 'user name'
      };
    },
  
    methods: {
      async onClickNextButton() {
  
        this.$router.push({ name: "Home" });
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
  .btn {
    height: 56px;
    margin: auto;
    border-radius: 12px;
    background: var(--Primary-500, #379BEC);
    text-transform: none;
    display: flex;
    width: 394px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--Secundarios-Blanco, #FFF);
  
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: -0.16px;
  }
  
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
    