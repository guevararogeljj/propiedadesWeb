<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-img class="terminado" src="@/assets/cheer.png" />
          <h1 class="text-center">
            Gracias <span class="color-primary">{{  this.Name }}</span>
          </h1>
          <h3 class="text-center subtitle">
            ¡Tu solicitud se ha procesado exitosamente!
          </h3>
          <span class="subtitle2">
            Te enviamos un correo electrónico para validar tu cuenta. Por favor revisa tu bandeja de entrada o de spam.
          </span>
          <br/>
          <span class="subtitle2">
            Una vez que verifiques tu cuenta te haremos llegar el Acuerdo de Confidencialidad a tu correo.
          </span>
          <br/>

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
    props: {
      EnableNextButton: { type: Boolean, default: true },
  
    },
    methods: {
      async onClickNextButton() {
        if (this.state.checkpoint.back) {
          this.state.NameRegister = null;
          this.$router.push({
            name: this.state.checkpoint.lastPath,
            query: { id: this.state.checkpoint.id },
          });
        } else {
          this.$router.push({ name: "login" });
        }
      },
    },
    computed: {
      state() {
        return this.$store.state;
      },
    },
    async mounted() {
      this.Name =  this.state.username;
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
  