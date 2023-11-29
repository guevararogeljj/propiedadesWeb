<template>
    <v-container fluid>
        <v-row style="align-items: center">
            <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
                <v-card>
                    <v-card-title>
                        <p class="title">Inicia sesión</p>
                        <br />
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field density="compact" variant="outlined"
                                label="Ingresa con correo electrónico o número telefónico" v-model="data.email"
                                :error-messages="v$.data.email.$errors.map((e) => e.$message)
                                    " @input="v$.data.email.$touch" @blur="v$.data.email.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Password" v-model="data.Password"
                                :error-messages="v$.data.Password.$errors.map((e) => e.$message)
                                    " @input="v$.data.Password.$touch" @blur="v$.data.Password.$touch"
                                autocomplete="off"></v-text-field>

                            <v-btn color="primary2" dark block :IsDisabled="this.v$.$invalid"
                                @click="onClickNextButton">Ingresar</v-btn>
                            <br />
                            <div style="text-align: center">
                                <span class="leyenda">¿Aún no tienes cuenta? </span>
                                <span class="termino">Regístrate aquí </span>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import usersignin from "@/components/services/usersignin";
import privatekey from "@/core/utils/privatekey";
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
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
                    required: helpers.withMessage("El correo es requerido", required),
                    email: helpers.withMessage("El correo no es válido", email),
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
                email: "",
                password: "",
            },
            goback: false,
            correoValido: false,
        };
    },
    props: {
        EnableNextButton: { type: Boolean, default: true },
    },
    methods: {
        isError(value) {
            return (this.$store.state.isError = value);
        },
        async onClickNextButton() {
            this.state.isLoading = true;
            // const regex = /^\w+([.\-_]{0,3}?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
            const regex = /^\d{10}$/;
            const isCorreoValido = regex.test(this.data.email);

            if (!isCorreoValido) {
                this.correoValido = true;
                this.state.isLoading = false;
                return;
            }

            this.correoValido = false;

            const credentials = {
                cellphone: "" + this.data.email,
                password: privatekey.encryptstring(
                    this.data.password,
                    privatekey.publickey
                ),
            };
            const result = await usersignin.signin(credentials);
            const data = result.result;
            //console.log(data);
            if (result.success) {
                if (data.requiredcode) {
                    this.state.dataTemp = data;
                    this.$router.push({ name: "tfacode" });
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
                        this.$router.push({ name: "home" });
                    }
                }
            } else {
                this.$store.state.messageErrors = result.message;
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

.subtitle {
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

.center {
    margin: auto;
    padding: 10px;
}

.form {
    width: 394px;
    margin: auto;
    min-width: 320px;
}

.formcapital {
    text-transform: capitalize;
}
</style>