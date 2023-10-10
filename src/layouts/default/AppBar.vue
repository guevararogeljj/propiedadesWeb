<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      @click="drawer = true"
      class="d-flex d-sm-none"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>
      <div class="logoClass ms-5"></div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn variant="text">Inicio</v-btn>
      <v-btn variant="text">Catálogo</v-btn>
      <v-btn variant="text">Nosotros</v-btn>
      <v-btn variant="text">Hola Armando</v-btn>
    </v-toolbar-items>
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" class="btn-username">
          <v-icon icon="mdi-account-circle" size="30"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <br />
        <v-list-item>
          <v-list-item-subtitle>
            <v-icon icon="mdi-server"></v-icon>Ambiente:
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon icon="mdi-note-multiple"></v-icon> Versión
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon icon="mdi-alert-circle"></v-icon> Teléfono de soporte
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item @click="securityStore.logout()">
          <v-list-item-title>Salir</v-list-item-title>
          <v-list-item-subtitle> Cerrar sesión </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item v-for="(item, index) in items" :key="item">
          <v-list-item-title @click="tab = index">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      items: ["Inicio", "Catálogo", "Nosotros"],
    };
  },
};
</script>
<style scoped>
.logoClass {
  background-image: url("https://finastrategy.mx/wp-content/themes/finastrategy/assets/img/logo-finastrategy.png");
  background-size: 150px;
  height: 4em;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  /* Additional styles */
  margin: 0;
  padding: 0;

}
@media (max-width: 600px) {
  body {
    /* Adjust styles for smaller screens */
    background-size: contain;
  }
}
</style>
