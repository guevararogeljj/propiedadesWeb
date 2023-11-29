<template>
  <v-footer>
    <v-container>
      <v-row style="align-items: center;">
        <v-col cols="12" sm="6" md="3">
          <div class="logoClass ms-5"></div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Legales</strong></v-label>
            <p><router-link to="/termsAndConditions" class="footer-link mb-2">Términos y condiciones</router-link></p>
            <p><router-link to="/privacyPolicy" class="footer-link mb-2">Aviso de privacidad</router-link></p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Navegación</strong></v-label>
          <p><router-link to="/" class="footer-link mb-2">Inicio</router-link></p>
          <p><router-link to="/propiedades" class="footer-link mb-2">Catálogo</router-link></p>
          <p><router-link to="/us" class="footer-link mb-2">Nosotros</router-link></p>
          <p><router-link to="/frequentQuestions" class="footer-link mb-2">Preguntas Frecuentes</router-link></p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Contacto</strong></v-label>
          <p>Escríbenos</p>
          <p>Inmuebles@finastrategy.mx</p>
          <p></p>
          <p>Llámanos</p>
          <p>55 99 90 88 00</p>
          <p>81 21 88 88 00</p>
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

};
</script>
<style scoped>
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
