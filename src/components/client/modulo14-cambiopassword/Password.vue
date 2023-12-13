<template>
    <v-container fluid>
        <v-row style="align-items: center">
            <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
                <v-card flat>
                    <v-card-title>
                        <p class="title">Actualizar mi contraseña</p>

                        <p class="subtitle">
                            Para actualizar tu contraseña por favor ingresa los siguientes datos:
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field density="compact" variant="outlined" label="Contraseña actual"  :append-icon="value1 ? 'mdi-eye' : 'mdi-eye-off-outline'"
                                @click:append="() => (value1 = !value1)" :type="value1 ? 'password' : 'text'"
                            v-model="data.oldpassword" class="form-input" :error-messages="v$.data.oldpassword.$errors.map((e) => e.$message)
                                " @input="v$.data.oldpassword.$touch" @blur="v$.data.oldpassword.$touch"
                            autocomplete="off"></v-text-field>
                        <v-text-field density="compact" variant="outlined" label="Nueva contraseña"  :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off-outline'"
                                @click:append="() => (value2 = !value2)" :type="value2 ? 'password' : 'text'"
                            v-model="data.newpassword" class="form-input" :error-messages="v$.data.newpassword.$errors.map((e) => e.$message)
                                " @input="v$.data.newpassword.$touch" @blur="v$.data.newpassword.$touch"
                            autocomplete="off"></v-text-field>
                        <v-text-field density="compact" variant="outlined" label="Confirmar contraseña"  :append-icon="value3 ? 'mdi-eye' : 'mdi-eye-off-outline'"
                                @click:append="() => (value3 = !value3)" :type="value3 ? 'password' : 'text'"
                            v-model="data.newpassword2" class="form-input" :error-messages="v$.data.newpassword2.$errors.map((e) => e.$message)
                                " @input="v$.data.newpassword2.$touch" @blur="v$.data.newpassword2.$touch"
                            autocomplete="off"></v-text-field>

                        <v-otp-input ref="phoneCodeOne" min="0" max="9" v-model="phoneCodeOne"  :error-messages="v$.data.phoneCodeOne.$errors.map((e) => e.$message)
                                " @input="v$.data.phoneCodeOne.$touch" @blur="v$.data.phoneCodeOne.$touch"
                            type="number" @keypress="onKeyPress" :loading="loading" :length="4"></v-otp-input>
                        <br />
                        <div style="text-align: center">
                            <span class="leyenda">¿No has recibido el código?</span>
                            <span class="termino">
                                <button-primary flat class="lowercase-text" variant="text" :Text="'Solicitar nuevo código en ' +
                                    (this.countdown == 0 ? '' : this.countdown)
                                    " :disabled="countdown !== 0" :OnClickButton="onClickResendButton" />
                            </span>
                        </div>
                        <v-btn flat class="btnLogin" :IsDisabled="this.v$.$invalid"
                            @click="onClickNextButton">Continuar</v-btn>

                        <br />
                        <div class="information form-input">
                            <span class="information">Usa de 8 a 12 caracteres</span>
                            <div class="saltoInformation"></div>
                            <span class="information">Una mayúscula</span>
                            <div class="saltoInformation"></div>
                            <span class="information">Una minúscula</span>
                            <div class="saltoInformation"></div>
                            <span class="information">Un número</span>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
   
</template>
  
<script>
import userservice from "@/core/services/userservice";
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecundaty from "@/components/common/ButtonSecondary.vue";
import usersignin from "@/core/services/usersignin";
import antiforgery from "@/core/services/antiforgery";
import stringresources from "@/components/client/modulo14-cambiopassword/resources";
import privatekey from "@/core/utils/privatekey";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import router from '@/router';
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    components: {
        ButtonPrimary,
        ButtonSecundaty,
    },
    name: "passwordComp",
    data() {
        return {
            data: {
                oldpassword: "",
                newpassword: "",
                email: "",
            },
            samepassword: false,
            newpassword2: "",
            resources: stringresources,
            showModalError: false,
            showModalSuccess: false,
            showModalErrorService: false,
            errorservicemessage: "",
            v$: useVuelidate(),
            phoneCodeOne: "",
            areacode: "+52",
            phone: "968",
            countdown: 300,
            loading: false,
            value1: String,
            value2: String,
            value3: String,
        };
    },
    validations() {
        return {
            data: {
                oldpassword: {
                    required: helpers.withMessage("La contraseña actual es requerida", required),
                    maxLength: helpers.withMessage(
                        "La contraseña actual debe tener máximo 12 caracteres",
                        maxLength(12)
                    ),
                    minLength: helpers.withMessage(
                        "La contraseña actual debe tener mínimo 8 caracteres",
                        minLength(8)
                    ),
                    regex: helpers.withMessage(
                        "La contraseña actual debe contener al menos una mayúscula, una minúscula y un número",
                        value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
                    ),
                },
                newpassword: {
                    required: helpers.withMessage("La contraseña nueva es requerida", required),
                    maxLength: helpers.withMessage(
                        "La contraseña nueva debe tener máximo 12 caracteres",
                        maxLength(12)
                    ),
                    minLength: helpers.withMessage(
                        "La contraseña nueva debe tener mínimo 8 caracteres",
                        minLength(8)
                    ),
                    regex: helpers.withMessage(
                        "La contraseña nueva debe contener al menos una mayúscula, una minúscula y un número",
                        value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
                    ),
                },
                newpassword2: {
                    required: helpers.withMessage("La confirmar contraseña es requerida", required),
                    maxLength: helpers.withMessage(
                        "La confirmar contraseña debe tener máximo 12 caracteres",
                        maxLength(12)
                    ),
                    regex: helpers.withMessage(
                        "Las contraseñas no coinciden",
                        helpers.withMessage("Las contraseñas no coinciden", (value) => {
                            return value === this.data.newpassword;
                        })
                    ),
                    minLength: helpers.withMessage(
                        "La contraseña debe tener mínimo 8 caracteres",
                        minLength(8)
                    ),
                },
                phoneCodeOne: {
                    required: helpers.withMessage("El código es requerido", required),
                    maxLength: helpers.withMessage(
                        "El código debe tener máximo 4 caracteres",
                        maxLength(4)
                    ),
                    minLength: helpers.withMessage(
                        "El código debe tener mínimo 4 caracteres",
                        minLength(4)
                    ),
                },
            }
        };
    },
    props: {
        EnableNextButton: { type: Boolean, default: true },
    },
    methods: {
        async onClickResendButton() {
            this.Loading(true);
            this.sendCodePhone();
            this.restarTimer();
            this.Loading(false);
        },
        onClickCanceltButton() {
            this.$router.go(-1);
        },
        onCloseModalSuccess() {
            this.showModalSuccess = false;
            this.$router.push({ name: "home" });
        },
        onCloseModalError() {
            this.showModalError = false;
            this.showModalSuccess = false;
            this.showModalErrorService = false;
        },
        isError(value) {
            return (this.$store.state.isError = value);
        },
        Loading(value) {
            this.$store.state.isLoading = value;
        },
        async onClickNextButton() {
            this.Loading(true);
            if (this.validateNewpassword2) {
                this.samepassword = false;

                let data = {
                    oldpassword: privatekey.encryptstring(
                        this.data.oldpassword,
                        privatekey.publickey
                    ),
                    newpassword: privatekey.encryptstring(
                        this.data.newpassword,
                        privatekey.publickey
                    ),
                    cellphone: this.state.userdata.cellphone,
                    code: this.phoneCodeOne,
                };
                const result = await usersignin.changepassword(data);
                if (result.success) {
                    dialogSuccess({
                        title: "¡Éxito!",
                        text: "Se ha cambiado la contraseña correctamente!",
                    });
                    this.store.commit("LOGOUT");
                    this.$router.push({ name: "login" });
                } else {
                    dialogError({
                        title: "Intento fallido",
                        text: "No se logro cambiar tu contraseña, intentalo nuevamente." + result.message,
                    });

                }
            } else {
                this.samepassword = true;
            }
            this.Loading(false);
        },
        onClickCalcelButton() { },
        async sendUserData() { },
        async sendCodePhone() {
            debugger;
            if (this.state.cellphone) {
                const value = { Cellphone: this.state.cellphone };
                await userservice.codephone(value);
            }
        },

        restarTimer() {
            this.countdown = 300;
            this.timer();
        },
        timer() {
            if (this.countdown > 0) {
                setTimeout(() => {
                    this.countdown -= 1;
                    this.timer();
                }, 1000);
            }
        },
        onKeyPress(e) {
            // console.log(e.srcElement.value.length);
            if (e.srcElement.value.length > 0) {
                e.preventDefault();
            }
        },

    },
    computed: {
        validateForm() {
            const valid = [
                this.mincaracteres,
                // this.maxcaracteres,
                this.uppercase,
                this.lowercase,
                this.number,
            ];

            return valid.includes(false);
        },
        validateOldpassword() {
            if (!this.data.oldpassword || !(this.data.oldpassword.length >= 8)) {
                return this.resources().errormessagesoldpassword.oldpassword;
            }

            return this.resources().errormessagesoldpassword.oldpasswordCorrect;
        },
        validateNewpassword() {
            const regexEmail =
                /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)[a-zA-ZñÑ\d]{8,12}$/g;
            const newpasswordvalid = regexEmail.test(this.data.newpassword);
            if (!newpasswordvalid) {
                return this.resources().errormessagesnewpassword.newpassword;
            }

            return this.resources().errormessagesnewpassword.newpasswordCorrect;
        },
        validateNewpassword2() {
            if (this.data.newpassword == this.data.newpassword2) {
                return true;
            }

            return false;
        },
        state() {
            return this.$store.state;
        },
        store() {
            return this.$store;
        },
        mincaracteres() {
            return this.data.newpassword.length <= 12 && this.data.newpassword.length >= 8
        },
        maxcaracteres() {
            return this.data.newpassword.length <= 12 && this.data.newpassword.length >= 8
        },
        uppercase() {
            const regexEmail = /[A-Z]/g;
            const newpasswordvalid = regexEmail.test(this.data.newpassword);
            return newpasswordvalid;
        },
        lowercase() {
            const regexEmail = /[a-z]/g;
            const newpasswordvalid = regexEmail.test(this.data.newpassword);
            return newpasswordvalid;
        },
        number() {
            const regexEmail = /[0-9]/g;
            const newpasswordvalid = regexEmail.test(this.data.newpassword);
            return newpasswordvalid;
        },
    },
    async mounted() {

        this.Loading(true);
        this.sendCodePhone();
        this.timer();
        const aft = await antiforgery.get();
        this.state.requesttoken = aft;
        this.Loading(false);
    },
};
</script>
      
  
<style  lang="scss" scoped>
.lowercase-text {

    text-transform: none;
    color: var(--primary-500, #379BEC);

    /* Text/Extrasmall/Regular */
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.13px;
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

.saltoInformation {
    width: 100%;
    height: 5px;
    flex-shrink: 0;
}

.information {
    align-content: center;
    text-align: left;

    color: var(--primary-500, #379BEC);
    /* Text/Extrasmall/Regular */
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.13px;
}

.btnLogin {
    height: 56px;
    display: flex;
    width: 393px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: var(--primary-500, #379BEC);
    color: var(--secundarios-blanco, #FFF);

    /* Text/Regular/Medium */
    text-transform: none;
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.title {
    width: auto;
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
    height: auto;
}

.subtitle {
    color: var(--secundarios-600, #000);
    text-align: center;
    width: auto;
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
    .title {
        width: auto;
        color: var(--secundarios-600, #000);
        text-align: center;

        /* Heading/Semibold 1 */
        font-family: Barlow;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: 25px;
        /* 100% */
        letter-spacing: -0.5px;
        height: auto;
    }

    .subtitle {
        color: var(--secundarios-600, #000);
        text-align: center;
        width: auto;
        height: 40px;
        /* Text/Regular/Medium */
        font-family: Barlow;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        /* 125% */
        letter-spacing: -0.16px;
        white-space: pre-wrap;
        /* Agregado para hacer un salto de línea automático */
    }

}
</style>