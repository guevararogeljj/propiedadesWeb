<template>
  <v-footer>
    <!-- <v-container style="background: var(--Secundarios-300, #F5F6F6);"> -->
      <v-row style="align-items: center; background: var(--Secundarios-300, #F5F6F6);">
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
          <!-- <v-btn variant="text" flat @click="!isLogin ? navigateInicio() : navigateNda()" class="fooderMenu">NDA en línea</v-btn> -->
         
        </v-col>
        <v-col cols="12" sm="6" md="3" align="center">
          <p v-if="!isLogin"><router-link to="/login" class="fooderMenu">NDA en línea</router-link></p>
          <p v-else><router-link to="/nda" class="fooderMenu">NDA en línea</router-link></p>
          <!-- <v-label> <strong>Contacto</strong></v-label> -->
          <p class="fooderMenu">Escríbenos</p>
          <!-- <p class="fooderMenu">Inmuebles@finastrategy.mx</p> -->
          <a v-bind:href="'mailto:' + data.email">{{ data.email }}</a>

          <p class="fooderMenu"></p>

          <!-- <p class="fooderMenu">Llámanos</p>
          <p class="fooderMenu">55 99 90 88 00</p>
          <p class="fooderMenu">81 21 88 88 00</p> -->
        </v-col>
        <v-divider></v-divider>
        <div class="center">        {{ new Date().getFullYear() }} Finastrategy. Todos los derechos
      reservados.</div>

      </v-row>
    <!-- </v-container> -->
  </v-footer>

  <!-- <v-row class="center">
    <v-col cols="12">
      &copy; {{ new Date().getFullYear() }} Finastrategy. Todos los derechos
      reservados.
    </v-col>
  </v-row> -->
</template>
<script>
export default {
  name: "Footer",
  data() {
        return {
            data: {
                email: "Inmuebles@finastrategy.mx",
            },
        };
    },
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
      window.scrollTo(0, 0);
      this.$router.push("/login");
    },
   
    navigateNda() {
      window.scrollTo(0, 0);
      this.$router.push("/nda");
    },
  },
};
</script>
<style scoped>

.fooderMenu{
  text-transform: none;
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
