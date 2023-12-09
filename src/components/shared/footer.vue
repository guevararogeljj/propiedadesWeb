<template>
  <v-footer>
    <v-container>
      <v-row style="align-items: center">
        <v-col cols="12" sm="6" md="3">
          <div class="logoClass"></div>
        </v-col>
        <v-col cols="12" sm="6" md="3" align="center">
          <!-- <v-label> <strong>Legales</strong></v-label> -->
            <p><router-link to="/termsAndConditions" class="fooderMenu">Términos y condiciones</router-link></p>
            <p><router-link to="/privacyPolicy" class="fooderMenu">Aviso de privacidad</router-link></p>
        </v-col>
        <v-col cols="12" sm="6" md="3" align="center">
          <!-- <v-label> <strong>Navegación</strong></v-label> -->
          <p><router-link to="/" class="fooderMenu">Inicio</router-link></p>
          <p><router-link to="/propiedades" class="fooderMenu">Catálogo</router-link></p>
          <p><router-link to="/us" class="fooderMenu">Nosotros</router-link></p>
          <p><router-link to="/frequentQuestions" class="fooderMenu">Preguntas Frecuentes</router-link></p>
          <p variant="text" flat @click="!isLogin ? navigateInicio() : navigateNda()" class="fooderMenu">NDA en línea</p>
        </v-col>
        <v-col cols="12" sm="6" md="3" align="center">
          <!-- <v-label> <strong>Contacto</strong></v-label> -->
          <p class="fooderMenu">Escríbenos</p>
          <p class="fooderMenu">Inmuebles@finastrategy.mx</p>
          <p class="fooderMenu"></p>
          <p class="fooderMenu">Llámanos</p>
          <p class="fooderMenu">55 99 90 88 00</p>
          <p class="fooderMenu">81 21 88 88 00</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
  <v-divider></v-divider>
  <v-row class="center">
    <v-col cols="12">
      &copy; {{ new Date().getFullYear() }} Finastrategy. Todos los derechos
      reservados.
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Footer",
  computed: {
    state() {
      return this.$store.state;
    },
    isLogin() {
      return this.state.isLogin;
    },
  },
  methods: {
    navigateInicio() {
      this.$router.push("/login");
    },
   
    navigateNda() {
      this.$router.push("/nda");
    },
  },
};
</script>
<style scoped>
.fooderMenu{
  color: var(--secundarios-600, #000);

/* Text Wireframes (Ignorar)/Body 1 */
font-family: Barlow;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.14px;
}
.center {
  margin: auto;
  padding: 10px;
}
.logoClass {
  background-image: url("https://finastrategy.mx/wp-content/themes/finastrategy/assets/img/logo-finastrategy.png");
  background-size: 100px;
  height: 4em;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  /* Additional styles */
  margin: 0;
  padding: 0;

}

</style>
