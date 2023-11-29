<template>
  <div class="content">
    <!-- <v-app-bar class="justify-center" app>
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
        <button-secondary  Text="Registrarme" class="btnColor"/>
      </v-toolbar-items>
    </v-app-bar> -->
    <v-app-bar app :elevation="0">
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn class="logoClass ms-5" @click="navigateInicio">
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down" style="margin-right: 100px;">

        <v-btn variant="text" class="lowercase-text btnColor" @click="navigateInicio">Inicio</v-btn>
        <v-btn variant="text" class="lowercase-text" @click="navigateCatalogo">Catálogo</v-btn>
        <v-btn variant="text" class="lowercase-text" @click="navigateUs">Nosotros</v-btn>
        <v-btn variant="flat" class="lowercase-text btnColor" @click="navigateRegister">Registrarme</v-btn>
        <v-btn color="primary3" class="lowercase-text" variant="flat" text >Iniciar</v-btn>
      </div>


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
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
export default {
  name: "AppBar",
  components: {
    ButtonPrimary,
    ButtonSecondary,
  },
  data() {
    return {
      drawer: false,
      myItems: [
        { name: 'Home', route: '/' },
        { name: 'About', route: '/about' },
        { name: 'Catalogo', route: '/propiedades' }
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
    navigateRegister() {
      this.$router.push("/register");
    },

  }
};
</script>
<style scoped>
.lowercase-text {
  font-family: Barlow;
  text-transform: capitalize;
  margin-right: 10px;
}

.logoClass {
  background-image: url("https://finastrategy.mx/wp-content/themes/finastrategy/assets/img/logo-finastrategy.png");
  background-size: 189px;
  height: 4em;
  background-repeat: no-repeat;
  background-position: center;
  height: 200px;
  width: 300px;
  /* Additional styles */
  margin: 0;
  padding: 0;

}

.btnColor {
  background-color: #f9b325;
  color: #fff;
  border-radius: 0px;
  width: 106px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-300, #E3F1FC);

  color: var(--primary-500, #379BEC);
  /* Text/Regular/Medium */

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
  grid-gap: 10px;
}

@media (max-width: 767px) {
  body {
    /* Adjust styles for smaller screens */
    background-size: contain;
  }
}
</style>
