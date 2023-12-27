<template>
    <v-container>
        <v-row justify="center" v-if="isLogin">
            <v-col cols="12" sm="8" md="6">
                <h1 class="text-center">
                    Mi perfil
                </h1>
                <v-img class="terminado" src="@/assets/account_circle.png" />
                <br />
                <v-card class="card" flat>
                    <div class="salto"></div>
                    <v-card-title>
                        <div class="text-center subtitle">
                            Datos personales
                        </div>
                    </v-card-title>
                    <v-card-item>
                        <br />
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="contactFom" density="compact" variant="outlined" type="text"
                                    label="Nombre" v-model="data.names"
                                    :error-messages="v$.data.names.$errors.map(e => e.$message)"
                                    @input="v$.data.names.$touch" @blur="v$.data.names.$touch"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="contactFom" density="compact" variant="outlined" type="text"
                                    label="Apellidos" v-model="data.lastname"
                                    :error-messages="v$.data.lastname.$errors.map(e => e.$message)"
                                    @input="v$.data.lastname.$touch" @blur="v$.data.lastname.$touch"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="contactFom" density="compact" variant="outlined" type="text"
                                    label="Correo electrónico" v-model="data.email"
                                    :error-messages="v$.data.email.$errors.map(e => e.$message)"
                                    @input="v$.data.email.$touch" @blur="v$.data.email.$touch"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="contactFom" density="compact" variant="outlined" type="number"
                                    label="Teléfono" v-model="data.cellphone"
                                    :error-messages="v$.data.cellphone.$errors.map(e => e.$message)"
                                    @input="v$.data.cellphone.$touch" @blur="v$.data.cellphone.$touch"></v-text-field>
                            </v-col>
                        </v-row>

                    </v-card-item>
                    <v-card-actions>
                        <!-- <v-btn class="btnEditar" @click="onClickUserdataButton()">Editar Datos</v-btn> -->
                    </v-card-actions>
                </v-card>
                <br />
                <v-card class="cardSecundary" flat>
                    <v-card-title>
                        <div class="salto"></div>
                        <div class="text-center subtitle">
                            Datos Adicionales
                        </div>
                        <div class="salto"></div>
                        <div class="text-center subtitle2">
                            Agrega datos de contacto alternos
                        </div>
                    </v-card-title>
                    <v-card-item>
                        <br />
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="contactFom" density="compact" variant="outlined" type="text"
                                    label="Agregar correo electrónico alterno" v-model="data.emailSecondary"
                                    :error-messages="v$.data.emailSecondary.$errors.map(e => e.$message)"
                                    @input="v$.data.emailSecondary.$touch" @blur="v$.data.emailSecondary.$touch"></v-text-field>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                    <v-text-field class="contactFom" density="compact" variant="outlined" type="number"
                                    label="Agregar número teléfonico alterno" v-model="data.cellphoneSecondary"
                                    :error-messages="v$.data.cellphoneSecondary.$errors.map(e => e.$message)"
                                    @input="v$.data.cellphoneSecondary.$touch" @blur="v$.data.cellphoneSecondary.$touch"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="12" sm="8" md="6">
                                <v-btn class="btnSave" :disabled ="this.v$.$invalid" @click="UpdateDataUser">Guardar Cambios</v-btn>
                            </v-col>
                            <v-col cols="12" sm="8" md="6">
                                <v-btn class="btnCancelar" @click="onClickBack()">Cancelar</v-btn>
                            </v-col>
                        </v-row>
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
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
export default {
    setup() {
        return { v$: useVuelidate() }
    },
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
                v$: useVuelidate(),
                emailSecondary: "",
                cellphoneSecondary: "",
            },
        };
    },
    validations() {
        return {
            data: {
                names: {
                    required: helpers.withMessage("El nombre es requerido", required)
                },
                lastname: { required: helpers.withMessage("El apellido es requerido", required) },
                email: { required: helpers.withMessage("El correo es requerido", required), email: helpers.withMessage("El correo no es válido", email) },
                cellphone: {
                    required: helpers.withMessage("El Teléfono es requerido", required),
                    maxLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", maxLength(10)),
                    minLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", minLength(10))
                },
                emailSecondary: { 
                    required: helpers.withMessage("El correo es requerido", required),
                    email: helpers.withMessage("El correo no es válido", email) },
                cellphoneSecondary: {
                    required: helpers.withMessage("El Teléfono es requerido", required),
                    maxLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", maxLength(10)),
                    minLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", minLength(10))
                },
            },
        };
    },
    methods: {
        onClickCellphoneButton() {
            this.$router.push({ name: "cellphonechange" });
        },
        onClickEmailButton() {
            this.$router.push({ name: "emailchange" });
        },
        onClickPasswordButton() {
            this.$router.push({ name: "passwordchange" });
        },
        goToHome() {
            this.$router.go(-1);
        },
        onClickBack() {
            this.$router.go(-1);
        },
        async onClickLogout() {
            this.isLoading = true;
            await profile.signout({ email: this.state.email });
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
        async UpdateDataUser(){
            if (this.v$.$invalid) {
                dialogError({
                    title: "Error",
                    text: "Favor de llenar los campos requeridos",
                });
                return;
            }
            this.isLoading = true;
            var lastname = "";
            if (this.data.lastname.length >= 2){
                lastname = this.data.lastname.split(" ")[0];
                this.data.lastname2  = this.data.lastname.split(" ")[1];
                this.data.lastname = lastname;
            }
            const result = await profile.updateDatauser(this.data);
            if (result.success) {
                dialogSuccess({ title: '¡Listo!', text: result.message });
                this.isLoading = false;
                await this.onClickLogout();
            } else {
                dialogError({ title: '¡Error!', text: result.message });
                this.isLoading = false;
            }
        }

    },
    computed: {
        state() {
            return this.$store.state;
        },
        isLogin() {
            return this.state.isLogin;
        },
    },
    async mounted() {
       
        this.state.isLoading = true;
        const userinfo = await profile.profile({ cellphone: this.state.cellphone });
        this.data = userinfo.result;
        this.data.lastname = this.data.lastname + " " + this.data.lastname2;
        this.state.isLoading = false;
    },
};
</script>
  
<style scoped lang="scss">
.btnCancelar {
    text-transform: none;
    display: flex;
    width: 212px;
    height: 55px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--secundarios-400, #E0E2E4);
    color: var(--secundarios-500, #959DA4);

    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.btnSave {
    text-transform: none;
    display: flex;
    width: 212px;
    height: 55px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: var(--primary-500, #379BEC);
    border-radius: 12px;
    background: var(--primary-300, #E3F1FC);
    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.salto {
    width: 100%;
    height: 20px;
    flex-shrink: 0;
}

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

.subtitle2 {
    height: auto;
    min-width: 394px;
    color: var(--secundarios-600, #000);
    text-align: center;

    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.contactFom {
    width: 362px;
    margin: auto;
    min-width: 320px;
}

@media only screen and (max-width: 767px) {
    .contactFom {
        width: 288px;
        margin: auto;
        min-width: 288px;
    }

    .btnCustom {
        text-transform: none;
        width: 288px;
        margin-left: -10;
        margin-right: -10;
        padding: 10px;
        min-width: 288px;
    }
}
</style>