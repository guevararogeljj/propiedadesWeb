<template>
    <v-container>
        <v-row justify="center" v-if="isLogin">
            <v-col cols="12" sm="8" md="6">
                <div class="text-center tituloMiperfil">
                    Mi perfil
                </div>
                <v-img class="terminado" src="@/assets/account_circle.png" />
                <br />
                <v-card class="card" flat>
                    <div class="salto"></div>
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
                    </v-card-actions>
                    <v-btn class="btnEditar" flat @click="onClickUserdataButton()">Editar datos</v-btn>
                    <div class="salto"></div>
                </v-card>
                <br />
                <v-card class="cardSecundary" flat>
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
                                <v-btn variant="text" class="btnUpadatePass" flat @click="onClickPasswordButton()">
                                    Actualizar contraseña
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6">
                                <v-btn variant="text" class="btnUpadatePass" flat @click="onClickdobleFactorButton()">
                                    Activiar verificación en 2 pasos
                                </v-btn>                                
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
            this.$router.push({ name: "Home" });
        },
        onClickBack() {
            this.goToHome();
        },
        onClickdobleFactorButton() {
            this.$router.push({ name: "doblefactor" });
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
.saltoDos {
    padding: 30px;
}
.tituloMiperfil{
    margin: auto;
    color: var(--Secundarios-600, #000);
text-align: center;

/* Heading/Large2 */
font-family: Barlow;
font-size: 40px;
font-style: normal;
font-weight: 500;
line-height: 40px; /* 100% */
letter-spacing: -1.2px;
}
.salto {
    height: 46px;
}

.btnUpadatePass {
    text-transform: none;
}

.btnEditar {
    text-transform: none;
    margin: auto;
    display: flex;
    width: 336.467px;
    height: 56px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Primary-500, #379BEC);
    color: var(--Secundarios-Blanco, #FFF);

    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
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