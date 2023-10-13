<template>
  <v-footer>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Legales</strong></v-label>
          <p>
            <a
              class="footer-link mb-2"
              href="https://www.finastrategy.mx/wp-content/themes/finastrategy/assets/terminos-condiciones.pdf"
              target="_blank"
              >Términos y condiciones</a
            >
          </p>
          <p>
            <a
              href="https://www.finastrategy.mx/wp-content/themes/finastrategy/assets/aviso-de-privacidad.pdf"
              class="footer-link mb-2"
              target="_blank"
              >Aviso de privacidad</a
            >
          </p>
          <!-- Contenido de la primera columna -->
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Nuestra empresa</strong></v-label>
          <p>Propiedades</p>
          <p>Contacto</p>
          <p>Preguntas frecuentes</p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Atención a clientes</strong></v-label>
          <p>Inmuebles@finastrategy.mx</p>
          <p>Teléfonos :</p>
          <p>55 9990 8800</p>
          <p>81 2188 8800</p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-label> <strong>Redes sociales</strong></v-label>
          <p>
            <v-btn icon variant
            href="https://www.facebook.com/finastrategy/"
            target="_blank">
              <span>
                <v-icon medium>mdi-facebook</v-icon>
              </span>
            </v-btn>
            <social />
          </p>
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
import social from "@/components/shared/SocialNetwoks.vue";
export default {
};
</script>
<style scoped>
.center {
  margin: auto;
  padding: 10px;
}
</style>
