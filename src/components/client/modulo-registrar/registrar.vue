<template>
    <v-container fluid>
        <v-row style="align-items: center">
            <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
                <v-card flat>
                    <v-card-title>
                        <p class="title">Regístrate</p>
                        <br />
                        <p class="subtitle">
                            Ingresa los siguientes datos para crear tu perfil
                        </p>
                    </v-card-title>
                    <v-card-text>
                            <v-text-field density="compact"  variant="outlined" label="Nombre" v-model="data.Name" class="form-input"
                                :error-messages="v$.data.Name.$errors.map((e) => e.$message)
                                    " @input="v$.data.Name.$touch" @blur="v$.data.Name.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Apellidos" v-model="data.Lastname" class="form-input"
                                :error-messages="v$.data.Lastname.$errors.map((e) => e.$message)
                                    " @input="v$.data.Lastname.$touch" @blur="v$.data.Lastname.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Correo Electrónico" type="email" class="form-input"
                                v-model="data.Email" :error-messages="v$.data.Email.$errors.map((e) => e.$message)"
                                @input="v$.data.Email.$touch" @blur="v$.data.Email.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Teléfono" type="number" class="form-input"
                                v-model="data.Cellphone" :error-messages="v$.data.Cellphone.$errors.map((e) => e.$message)
                                    " @input="v$.data.Cellphone.$touch" @blur="v$.data.Cellphone.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Contraseña" type="password" class="form-input"
                                v-model="data.Password" :error-messages="v$.data.Password.$errors.map((e) => e.$message)
                                    " @input="v$.data.Password.$touch" @blur="v$.data.Password.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Confirmar Contraseña" type="password" class="form-input"
                                v-model="data.ConfirmPassword" :error-messages="v$.data.ConfirmPassword.$errors.map((e) => e.$message)
                                    " @input="v$.data.ConfirmPassword.$touch" @blur="v$.data.ConfirmPassword.$touch"
                                autocomplete="off"></v-text-field>
                            <v-btn color="primary2" class="btnLogin" :disabled="this.v$.$invalid"
                                @click="onClickNextButton">Continuar</v-btn>
                            <br />
                            <div style="text-align: center">
                                <span class="leyenda">Al registrarme acepto </span>
                                <span class="termino">Términos y Condiciones </span>
                                <span class="leyenda">Y las </span>
                                <span class="termino">Políticas de privacidad </span>
                            </div>
                            <br />
                            <div style="text-align: center">
                                <span class="leyenda">¿Ya tienes una cuenta? </span>
                                <span class="termino" @click="navigateLogin()">Inicia sesión</span>
                            </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import userservice from "@/core/services/userservice";
import antiforgery from "@/core/services/antiforgery";
import utils from "@/core/utils/utils";
import encrypt from "@/core/utils/privatekey";
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    name: "Registro",
    data() {
        return {
            data: {
                Name: '',
                Lastname: '',
                Lastname2: '',
                Email: "",
                Cellphone: "",
                Password: "",
                Terms: true,
                ConfirmPassword: "",
            },
            v$: useVuelidate(),
            isLoading: false,
        };
    },
    components: { ButtonSecondary },
    validations() {
        return {
            data: {
                Name: {
                    required: helpers.withMessage("El nombre es requerido", required),
                    maxLength: helpers.withMessage(
                        "El nombre debe tener máximo 50 caracteres",
                        maxLength(50)
                    ),
                },
                Lastname: {
                    required: helpers.withMessage("El apellido es requerido", required),
                },
                Email: {
                    required: helpers.withMessage("El correo es requerido", required),
                    email: helpers.withMessage("El correo no es válido", email),
                },
                Cellphone: {
                    required: helpers.withMessage("El Teléfono es requerido", required),
                    maxLength: helpers.withMessage(
                        "El Teléfono debe tener 10 dígitos",
                        maxLength(10)
                    ),
                    minLength: helpers.withMessage(
                        "El Teléfono debe tener 10 dígitos",
                        minLength(10)
                    ),
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
                ConfirmPassword: {
                    required: helpers.withMessage("La contraseña es requerida", required),
                    maxLength: helpers.withMessage(
                        "La contraseña debe tener máximo 12 caracteres",
                        maxLength(12)
                    ),
                    regex: helpers.withMessage(
                        "Las contraseñas no coinciden",
                        helpers.withMessage("Las contraseñas no coinciden", (value) => {
                            return value === this.data.Password;
                        })
                    ),
                    minLength: helpers.withMessage(
                        "La contraseña debe tener mínimo 8 caracteres",
                        minLength(8)
                    ),
                },
            },
        };
    },
    methods: {
        Loading(value) {
            this.$store.state.isLoading = value;
        },
        async onClickNextButton() {
            
            if (this.v$.$invalid) {
                dialogError({
                    title: "Error",
                    text: "Favor de llenar los campos requeridos",
                });
                return;
            }
            var lastname = "";
            if (this.data.Lastname.length >= 2){
                lastname = this.data.Lastname.split(" ")[0];
                this.data.Lastname2  = this.data.Lastname.split(" ")[1];
                this.data.Lastname = lastname;
            }
            this.Loading(true);
            const dataregister = utils.cloneObject(this.data);
            dataregister.Password = encrypt.encryptstring(this.data.Password, encrypt.publickey);
      
            const result = await userservice.signup(dataregister);
            if (result.success) {
                this.$store.state.Cellphone = this.data.Cellphone;
                this.$store.state.NameRegister = this.data.Name;
                this.$router.push({ name: "validation" });
            } else {
                this.$store.state.messageErrors = result.message;
                this.state.isError = true;
            }
            this.Loading(false);
        },
        navigateLogin() {
            this.$router.push({ name: "login" });
        },
    },
    computed: {
    state() {
      return this.$store.state;
    },
  },
    async mounted() {
        const aft = await antiforgery.get();
        this.state.requesttoken = aft;
    },
};
</script>
<style scoped>
.btnLogin {
    text-transform: none;
    display: flex;
    width: 393px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
.form-input {
    max-width: 394px;
    height: 75px;
    flex-shrink: 0;
}
@media screen and (max-width: 767px) {
    
}
</style>
