<template>
  <v-footer>
    <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-label>
          <strong>Legales</strong></v-label>
        <p>
          Términos y condiciones
        </p>
        <p>
          Política de privacidad
        </p>
        <!-- Contenido de la primera columna -->
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-label>
          <strong>Nuestra empresa</strong></v-label>
        <p>
          Propiedades
        </p>
        <p>
          ¿Por qué Finastrategy? 
        </p>
        <p>
          Contacto
        </p>
        <p>
          Preguntas frecuentes
        </p>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-label>
          <strong>Atención a clientes</strong></v-label>
        <p>
          Inmuebles@finastrategy.mx
        </p>
        <p>
          Teléfonos :
        </p>
        <p>
          55 9990 8800
        </p>
        <p>
          81 2188 8800
        </p>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-label>
          <strong>Redes sociales</strong></v-label>
          <v-icon v-for="(icon, index) in socialIcons" :key="index" size="24">{{ icon }}</v-icon>
      </v-col>
    </v-row>
  </v-container>
  </v-footer>
  <v-divider></v-divider>
      <v-row class="center">
        <v-col cols="12" >
          &copy; {{ new Date().getFullYear() }} Finastrategy. Todos los derechos reservados.
        </v-col>
      </v-row>
</template>
<script>
export default {
  data() {
    return {
      quickLinks: ["Inicio", "Servicios", "Productos", "Contacto"],
      socialIcons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>
<style scoped>
.center {
  margin: auto;
  padding: 10px;
}
</style>