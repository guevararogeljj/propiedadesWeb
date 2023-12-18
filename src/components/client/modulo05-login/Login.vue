<template>
    <v-container fluid>
        <v-row class="form">
            <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
                <v-card flat>
                    <v-card-title>
                        <p class="title">Inicia sesión</p>
                        <br />
                    </v-card-title>
                    <v-card-text>
                        <v-text-field density="compact" variant="outlined" class="form-input"
                            label="Ingresa con correo electrónico o número telefónico" v-model="data.Email" 
                            :error-messages="v$.data.Email.$errors.map((e) => e.$message)
                                " @input="v$.data.Email.$touch" @blur="v$.data.Email.$touch"
                            autocomplete="off"></v-text-field>
                        <v-text-field density="compact" variant="outlined" label="Contraseña" class="form-input"
                            v-model="data.Password" :append-icon="value ? 'mdi-eye' : 'mdi-eye-off-outline'"
                            @click:append="() => (value = !value)" :type="value ? 'password' : 'text'" :error-messages="v$.data.Password.$errors.map((e) => e.$message)
                                " @input="v$.data.Password.$touch" @blur="v$.data.Password.$touch"
                            autocomplete="off"></v-text-field>

                        <v-btn color="primary2" class="btnLogin" :IsDisabled="this.v$.$invalid"
                            @click="onClickNextButton">Ingresar</v-btn>
                        <br />
                        <div style="text-align: center">
                            <span class="leyenda">¿Aún no tienes cuenta? </span>
                            <span class="termino" @click="natigateRegister()">Regístrate aquí </span>
                            <br />
                            <span class="leyenda" @click="navigateForgotPassword()">Olvidé mi contraseña </span>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import usersignin from "@/core/services/usersignin";
import privatekey from "@/core/utils/privatekey";
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ButtonSecondary,
        ButtonPrimary,
    },
    validations() {
        return {
            data: {
                Email: {
                    required: helpers.withMessage("El correo y/o número telefónico es requerido", required),
                },
                Password: {
                    required: helpers.withMessage("La contraseña es requerida", required),
                    maxLength: helpers.withMessage(
                        "La contraseña debe tener máximo 12 caracteres",
                        maxLength(12)
                    ),
                    minLength: helpers.withMessage(
                        "La contraseña debe tener mínimo 8 caracteres",
                        minLength(8)
                    ),
                    regex: helpers.withMessage(
                        "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
                        value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
                    ),
                },

            },
        };
    },
    name: "loginComp",
    data() {
        return {
            data: {
                Email: "",
                Password: "",
            },
            goback: false,
            correoValido: false,
            value: String,
        };
    },
    props: {
        EnableNextButton: { type: Boolean, default: true },
    },
    methods: {
        isError(value) {
            return (this.$store.state.isError = value);
        },
        natigateRegister() {
            this.$router.push({ name: "register" });
        },
        navigateForgotPassword() {
            this.$router.push({ name: "forgotpassword" });
        },
        async onClickNextButton() {
            this.state.isLoading = true;
            // const regex = /^\w+([.\-_]{0,3}?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
            // const regex = /^\d{10}$/;
            // const isCorreoValido = regex.test(this.data.Email);

            // if (!isCorreoValido) {
            //     this.correoValido = true;
            //     this.state.isLoading = false;
            //     return;
            // }

            // this.correoValido = false;

            const credentials = {
                cellphone: "" + this.data.Email,
                password: privatekey.encryptstring(
                    this.data.Password,
                    privatekey.publickey
                ),
            };
            
            const result = await usersignin.signin(credentials);
            const data = result.result;
            //console.log(data);
            if (result.success) {
                if (data.requiredcode) {
                    this.state.dataTemp = data;
                    this.$router.push({ name: "AutenticadorLogin" });
                } else {
                    this.state.isLoading = false;
                    this.state.userdata = data;
                    this.state.username = data.name;
                    this.state.email = data.email;
                    this.state.cellphone = data.cellphone;
                    this.state.token = data.token;
                    this.state.isLogin = true;
                    this.$store.commit('TOKENIDEM')
                    if (this.goback) {
                        this.$router.back();
                    } else {
                        dialogSuccess({
                            title: "¡Bienvenido!",
                            text: "Se ha iniciado sesión correctamente",
                        });
                        this.$router.push({ name: "Home" });
                    }
                }
            } else {
                dialogError({
                    title: "¡Error!",
                    text: "No se ha podido iniciar sesión " + result.message,
                });
                this.state.isLoading = false;
                this.state.isError = true;
            }
        },
        onClickRigisterButton() {
            this.$router.push({ name: "registration" });
        },
    },
    computed: {
        state() {
            return this.$store.state;
        },
    },
    mounted() {
        if (this.$route.params.goback) {
            this.goback = this.$route.params.goback;
        }
    },
};
</script>
      
  
<style  lang="scss" scoped>
.btnLogin {
    display: flex;
    width: 393px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.form-input {
    max-width: 394px;
    height: 75px;
    flex-shrink: 0;
}

.title {
    color: var(--secundarios-600, #000);
    text-align: center;
    /* Heading/Large2 */
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    /* 100% */
    letter-spacing: -1.2px;
}

.leyenda {
    color: var(--secundarios-600, #000);
    text-align: center;
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.13px;
}

.termino {
    color: var(--primary-500, #379bec);
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.13px;
}


.form {
    width: auto;
    margin: auto;

}

@media screen and (max-width: 767px) {
    .title {
        color: var(--secundarios-600, #000);
        text-align: center;

        /* Heading/Semibold 1 */
        font-family: Barlow;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: 26px;
        /* 104% */
        letter-spacing: -0.5px;
    }

    .btnLogin {
        display: flex;
        width: 320px;
        padding: 18px 16px;
        justify-content: center;
        align-items: center;
        gap: 10px;

    }
}
</style>