<template>
  <div class="content">
    <v-app-bar app :elevation="0" style="width: 95%">
      <v-toolbar-title>
        <v-btn class="logoClass ms-5" @click="navigateInicio"> </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="!drawer" color="primary3" @click="drawer = true"
        class="d-flex d-md-none"></v-app-bar-nav-icon>
      <v-btn v-else icon class="d-flex d-md-none" @click="closeMenu()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="hidden-sm-and-down">
        <v-btn variant="text" class="lowercase-text inicio" @click="navigateInicio">Inicio</v-btn>
        <v-btn variant="text" class="lowercase-text" @click="navigateCatalogo">Catálogo</v-btn>
        <v-btn variant="text" class="lowercase-text" @click="navigateUs">Nosotros</v-btn>
        <v-btn variant="flat" class="lowercase-text btnColor" @click="navigateRegister">Registrarme</v-btn>
        <v-btn color="primary3" class="lowercase-text" variant="flat" @click="navigateLogin"
          v-if="!isLogin">Iniciar</v-btn>
        <v-menu v-else>
          <template v-slot:activator="{ props }">
            <v-btn class="loginName lowercase-text" variant="text" v-bind="props">
              {{ this.state.username }}
              <v-icon size="32" color="primary3">mdi-account-circle-outline</v-icon>
              <v-icon color="primary3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item v-for="item in rutasLogin" :append-icon="item.icon" :key="item" :to="item.name != 'Cerrar sesión' ? item.route : null">
              <v-list-item-title>
                <span v-if="item.name != 'Cerrar sesión'">{{item.name}}</span>
              <!-- {{item.name}} -->
              <span v-if="item.name == 'Cerrar sesión'" @click="onClickLogout"  variant="flat">Cerrar sesión</span>
            </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary color="primary3" permanent style="width: 100%">
      <div class="center">
        <p class="titulo">Bienvenido</p>
        <p class="subtitle">
          Ingresa y accede a miles de oportunidades de inversión para crecer tu
          patrimonio
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <v-btn variant="flat" class="lowercase-text btnRegister" @click="navigateLogin">Ingresar</v-btn>
      <v-list nav dense>
        <v-list-item v-for="item in rutas" :key="item" :to="item.route" @click="closeMenu()">
          <v-list-item-title @click="tab = index">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-menu v-if="isLogin">
        <template v-slot:activator="{ props }">
          <v-btn  class="loginNameMobile lowercase-text" variant="text" v-bind="props">
            {{ this.state.username }}
            <v-icon size="32" color="primary3">mdi-account-circle-outline</v-icon>
            <v-icon color="primary3">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense>
          <v-list-item v-for="item in rutasLogin" :append-icon="item.icon" :key="item" :to="item.route">
            <v-list-item-title @click="tab = index">{{
              item.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-navigation-drawer>
  </div>
</template>
<script>
import ButtonBack from "@/components/common/ButtonBack.vue";
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import profile from "@/core/services/usersignin";
export default {
  name: "AppBar",
  components: {
    ButtonPrimary,
    ButtonSecondary,
    ButtonBack,
  },
  data() {
    return {
      drawer: false,
      rutas: [
        { name: "Home", route: "/" },
        { name: "Catalogo", route: "/propiedades" },
        { name: "Nosotros", route: "/us" },
        { name: "Registro", route: "/register" },
      ],
      rutasLogin: [
        { name: "Mi perfil", route: "/profile", icon: "mdi-account-circle-outline" },
        { name: "Favoritos", route: "/favorites", icon: "mdi-heart-outline" },
        { name: "NDA en línea", route: "/nda", icon: "mdi-medal-outline" },
        { name: "Verificación en 2 pasos", route: "/doblefactor", icon: "mdi-application-settings-outline" },
        { name: "Cerrar sesión", route: "/logout", icon: "mdi-exit-to-app" },

      ],
      Name: {
        type: String,
        default: "user name",
      },
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
    closeMenu() {
      this.drawer = !this.drawer;
    },
    navigateLogin() {
      this.$router.push("/login");
    },
    goToHome() {
      this.$router.push({ name: "Home" });
    },
    async onClickLogout() {
      this.isLoading = true;
      await profile.signout({ cellphone: this.state.cellphone });
      this.state.isLogin = false;
      this.state.dataTemp = {};
      this.state.email = "";
      this.state.cellphone = "";
      this.state.username = "";
      this.state.userdata = {};
      this.state.token = "";
      this.goToHome();
      this.isLoading = false;
    },
    onClickFavoritesButton() {
      this.$router.push({ name: "favorites" });
    },
  },
  computed: {
    isLogin() {
      return this.state.isLogin;
    },
    letters() {
      let letters = "";
      if (this.state.username !== "" && this.state.username !== undefined) {
        letters = Array.from(this.state.username)[0];
      } else {
        letters = Array.from(this.state.email)[0];
      }

      return letters;
    },
    state() {
      return this.$store.state;
    },
  },
  mounted() {
    let data = this.$store.state.username;
    this.Name = this.state.username;
  },
  // mounted:{
  //   // this.state.NameRegister
  // }
};
</script>
<style scoped>
.loginNameMobile{
  color: white;
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}
.loginName {
  color: black;
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.inicio {
  color: var(--primary-500, #379bec);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

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
  color: #fff;
  border-radius: 0px;
  width: 106px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-300, #e3f1fc);

  color: var(--primary-500, #379bec);
  /* Text/Regular/Medium */

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
  grid-gap: 10px;
}

.titulo {
  position: absolute;
  left: 121px;
  top: 34px;
  color: var(--secundarios-blanco, #fff);
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
}

.subtitle {
  width: 295px;
  position: absolute;
  left: 30px;
  top: 75px;
  color: var(--secundarios-blanco, #fff);
  text-align: center;

  /* Text/Small/Medium */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 142.857% */
  letter-spacing: -0.14px;
}

.btnRegister {
  display: flex;
  width: 299px;
  height: 50px;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: absolute;
  left: 30px;
  top: 130px;
  border-radius: 14px;
  background: var(--secundarios-blanco, #fff);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

@media (max-width: 767px) {
  body {
    /* Adjust styles for smaller screens */
    background-size: contain;
  }

  .logoClass {
    background-image: url("https://finastrategy.mx/wp-content/themes/finastrategy/assets/img/logo-finastrategy.png");
    background-size: 100px;
    height: 4em;
    background-repeat: no-repeat;
    background-position: center;
    height: 150px;
    width: 100px;
    /* Additional styles */
    margin: 0;
    padding: 0;
  }
}

/* Styles for desktop */
@media (min-width: 1024px) {
  /* Add your desktop styles here */
}

/* Styles for iPad */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Add your iPad styles here */
}
</style>
