<template>
  <div class="content" >
    <v-app-bar app>
   
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn class="logoClass ms-5" @click="navigateInicio">
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn variant="text" @click="navigateInicio">Inicio</v-btn>
        <v-btn variant="text" @click="navigateCatalogo">Catálogo</v-btn>
        <v-btn variant="text" @click="navigateUs">Nosotros</v-btn>
        <!-- <v-btn variant="text">Hola Armando</v-btn> -->
      </v-toolbar-items>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
          <v-list-item v-for="(item, index) in myItems" :key="item" :to="item.route">
            <v-list-item-title @click="tab = index">{{ item.name }}</v-list-item-title>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      myItems: [
        { name: 'Home', route: '/' },
        { name: 'About', route: '/about' },
        { name: 'Catalogo', route: '/propiedades'}
      ],
    };
  },
  methods: {
    navigateInicio() {
      this.$router.push("/");
    },
    navigateCatalogo() {
      this.$router.push("/propiedades");
    },
    navigateUs() {
      this.$router.push("/us");
    },

  }
};
</script>
<style scoped>
.logoClass {
  background-image: url("https://finastrategy.mx/wp-content/themes/finastrategy/assets/img/logo-finastrategy.png");
  background-size: 100px;
  height: 4em;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  width: 100px;
  /* Additional styles */
  margin: 0;
  padding: 0;

}

@media (max-width: 767px) {
  body {
    /* Adjust styles for smaller screens */
    background-size: contain;
  }
}
</style>
