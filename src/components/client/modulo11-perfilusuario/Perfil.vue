<template>
    <v-container>
        <v-row justify="center" v-if="isLogin">
            <v-col cols="12" sm="8" md="6">
                <h1 class="text-center">
                    Mi perfil
                </h1>
                <v-img class="terminado" src="@/assets/terminado.svg" />
                <br />
                <v-card class="card">
                    <v-card-title>
                        <h3 class="text-center subtitle">
                            Datos personales
                        </h3>
                    </v-card-title>
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Nombre
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ this.data.names }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Apellidos
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ this.data.lastname }} {{ this.data.lastname2 }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Número telefónico
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ this.state.cellphone }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                correo electrónico
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ this.data.email }}
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn class="btnEditar" @click="onClickNextButton">Editar Datos</v-btn>
                    </v-card-actions>
                </v-card>
                <br />
                <v-card class="cardSecundary">
                    <v-card-title>
                        <h3 class="text-center subtitle">
                            Seguridad y privacidad
                        </h3>
                    </v-card-title>
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" sm="8" md="6">
                                Contraseña
                            </v-col>
                            <v-col cols="12" sm="8" md="6">
                                Actualizar contraseña
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6">
                                Actividar verificación en 2 pasos
                            </v-col>
                            <v-col cols="12" sm="8" md="6">

                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-actions>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!-- <div>
      <div class="mt-5 container custom-container">
        <div class="row background">
          <div class="col-2"></div>
          <div class="col-8">
            <div class="title d-flex justify-content-center pt-4 frecuente">
              <div class="d-flex align-items-center login-wrapper" v-if="isLogin">
                <div class="numberCircle">{{ letters }}</div>
              </div>
            </div>
          </div>
          <div class="col-2"></div>
        </div>
  
        <div class="main-container">
          <div class="container wrapper-container pt-3 pb-4 mt-3">
            <div class="row mb-2">
              <div class="col-12 title-name justify-content-center">
                {{ username }}
              </div>
              <div class="col-12 subtitle mt-1">
                {{ email }}
              </div>
            </div>
  
            <div>
              <div class="row justify-content-center mt-5">
                <div class="col-12 d-flex justify-content-center w-95">
                  <ButtonSecundaty class="custom-button" Text="DATOS PERSONALES" :OnClickButton="onClickUserdataButton">
                  </ButtonSecundaty>
                </div>
  
                <div class="col-12 d-flex justify-content-center w-95 mt-5">
                  <ButtonSecundaty class="custom-button" Text="MIS FAVORITOS" :OnClickButton="onClickFavoritesButton">
                  </ButtonSecundaty>
                </div>
  
                <div class="col-12 d-flex justify-content-center w-95 mt-5">
                  <ButtonSecundaty class="custom-button custom-button2" Text="VERIFICACIÓN EN 2 PASOS"
                    :OnClickButton="onClickTfaButton">
                  </ButtonSecundaty>
                </div>
                <div class="col-12 w-95 mt-5">
                  <div class="divider"></div>
                </div>
  
                <div class="col-12 d-flex justify-content-center">
                  <div class="col-12 d-flex justify-content-center w-95 mb-5">
                    <ButtonPrimary class="custom-primary-button" Text="CERRAR SESION" :OnClickButton="onClickLogout" />
                  </div>
                </div>
                <div class="col-12 w-95">
                  <div class="divider"></div>
                </div>
  
                <p class="custom-text">
                  <a href="https://www.finastrategy.mx/wp-content/themes/finastrategy/assets/aviso-de-privacidad.pdf"
                    target="_blank" class="custom-text">Política de privacidad </a>•<a
                    href="https://www.finastrategy.mx/wp-content/themes/finastrategy/assets/terminos-condiciones.pdf"
                    target="_blank" class="custom-text">
                    Términos y condiciones</a>
                </p>
              </div>
  
           
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>
  
<script>
import profile from "@/core/services/usersignin";
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecundaty from "@/components/common/ButtonSecondary.vue";

export default {
    name: "perfilComp",
    components: {
        ButtonPrimary,
        ButtonSecundaty,
    },
    data() {
        return {
            data: {
                names: "",
                lastname: "",
                lastname2: "",
                email: "",
                gender: "",
                cellphone: "",
            },
        };
    },
    methods: {
        onClickTfaButton() {
            if (this.state.userdata.requiredcode) {
                this.$router.push({ name: "tfaremover" });
            } else {
                this.$router.push({ name: "tfaregistration" });
            }
        },
        onClickEmailButton() {
            this.$router.push({ name: "emailchange" });
        },
        onClickPasswordButton() {
            this.$router.push({ name: "passwordchange" });
        },
        onClickFavoritesButton() {
            this.$router.push({ name: "favorites" });
        },
        onClickUserdataButton() {
            this.$router.push({ name: "userdata" });
        },
        goToHome() {
            this.$router.push({ name: "home" });
        },
        onClickBack() {
            this.goToHome();
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
    },
    computed: {
        state() {
            return this.$store.state;
        },

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
        username() {
            return `${this.data.names} ${this.data.lastname} ${this.data.lastname2}`;
        },
        email() {
            return this.data.email;
        },
    },
    async mounted() {
        this.state.isLoading = true;

        const userinfo = await profile.profile({ cellphone: this.state.cellphone });
        this.data = userinfo.result;

        this.state.isLoading = false;
    },
};
</script>
  
<style scoped lang="scss" >
.btnEditar {
    margin: auto;
    color: #FFF;
    display: flex;
    width: 336.467px;
    height: 54.83px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--primary-500, #379BEC);
}

.labels {
    text-indent: 4rem;
    flex-shrink: 0;
    color: var(--secundarios-500, #959DA4);
    /* Text/Small/Medium */
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 142.857% */
    letter-spacing: -0.14px;
}

.labels-info {
    text-indent: 4rem;
    color: var(--secundarios-600, #000);
    /* Text/Small/Regular */
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 142.857% */
    letter-spacing: -0.14px;
}

.card {
    margin: auto;
    max-width: 537px;
    min-height: 400px;
    height: auto;
    flex-shrink: 0;
    border-radius: 23px;
    border: 1px solid var(--secundarios-400, #E0E2E4);
    background: var(--secundarios-blanco, #FFF);
}

.cardSecundary {
    margin: auto;
    max-width: 537px;
    flex-shrink: 0;
    border-radius: 23px;
    border: 1px solid var(--secundarios-400, #E0E2E4);
    background: var(--secundarios-blanco, #FFF);
}

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
</style>