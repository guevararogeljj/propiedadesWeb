<template>
    <v-container fluid>
        <v-row class="form" v-if="this.steps <= 1">
            <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
                <v-card flat >
                    <v-card-title>
                        <p class="title">Restablecer mi contraseña</p>
                        <p class="subtitle">Verifica tu número telefónico</p>
                        <p class="subtitle2">
                            Por favor ingresa el código de 4 digitos que enviamos por SMS a tu
                            celular. {{ areacode }} ***** {{ phone.slice(-4) }}
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-otp-input ref="phoneCodeOne" id="1" name="one" min="0" max="9" v-model="phoneCodeOne"
                                type="number" @keypress="onKeyPress" :loading="loading" :length="4"></v-otp-input>
                            <v-btn color="primary2" block @click="onClickNextButton"
                                :disabled="this.phoneCodeOne.length < 4 || loading">Continuar</v-btn>
                            <br />
                            <div style="text-align: center">
                                <span class="leyenda">¿No has recibido el código?</span>
                                <span class="termino">
                                    <button-primary class="lowercase-text" variant="text" :Text="'Solicitar nuevo código en ' +
                                        (this.countdown == 0 ? '' : this.countdown)
                                        " :disabled="countdown !== 0" :OnClickButton="onClickResendButton" />
                                </span>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="form" v-else>
            <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
                <v-card flat>
                    <v-card-title>
                        <p class="title">Restablecer mi contraseña</p>
                        <br />
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field density="compact" variant="outlined" label="Contraseña" class="form-input"
                                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off-outline'"
                                @click:append="() => (value = !value)" :type="value ? 'password' : 'text'"
                                v-model="data.Password" :error-messages="v$.data.Password.$errors.map((e) => e.$message)
                                    " @input="v$.data.Password.$touch" @blur="v$.data.Password.$touch"
                                autocomplete="off"></v-text-field>
                            <v-text-field density="compact" variant="outlined" label="Confirmar Contraseña"
                                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off-outline'"
                                @click:append="() => (value = !value)" :type="value ? 'password' : 'text'"
                                class="form-input" v-model="data.ConfirmPassword" :error-messages="v$.data.ConfirmPassword.$errors.map((e) => e.$message)
                                    " @input="v$.data.ConfirmPassword.$touch" @blur="v$.data.ConfirmPassword.$touch"
                                autocomplete="off"></v-text-field>

                            <v-btn color="primary2" class="btnLogin" @click="changePassword()">Continuar</v-btn>
                            <br />
                            <v-btn variant="flat" @click="cancel()">Cancelar</v-btn>
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

                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
import userservice from "@/core/services/userservice";
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import antiforgery from "@/core/services/antiforgery";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
import encrypt from "@/core/utils/privatekey";
import usersignin from "@/core/services/usersignin";
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
    components: {
        // ButtonSecondary,
        ButtonPrimary,
    },
    name: "regristroComp",
    data() {
        return {
            steps: 1,
            loading: false,
            phoneCodeOne: "",
            data: {
                code: this.getcode(),
                email: this.store().email,
            },
            areacode: "+52",
            phone: "968",
            countdown: 300,
            data: {
                Password: "",
                ConfirmPassword: "",
            },
            v$: useVuelidate(),
            value: String,
        };
    },
    validations() {
        return {
            data: {
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
    props: {
        EnableNextButton: { type: Boolean, default: true },
    },
    methods: {
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
            if (e.srcElement.value.length > 0) {
                e.preventDefault();
            }
        },
        async onClickNextButton() {
            this.Loading(true);
            const value = { code: this.getcode(), cellphone: this.store().Cellphone };
            this.steps = 2;
            //const result = await userservice.validatecodephone(value);
            // if (result.success == true) {
            //     dialogSuccess({
            //         title: "Éxito",
            //         text: "Código validado correctamente",
            //     });
            //     this.steps = 2;
            // } else {
            //     dialogError({
            //         title: "Error",
            //         text: result.message,
            //     });
            //     this.cleanCode();
            // }
            this.Loading(false);
        },
        async onClickResendButton() {
            this.Loading(true);
            this.sendCodePhone();
            this.restarTimer();
            this.Loading(false);
        },
        store() {
            return this.$store.state;
        },
        onClickCalcelButton() { },
        async sendCodePhone() {
            if (this.store().Cellphone) {
                const value = { Cellphone: this.store().Cellphone };
                await userservice.codephone(value);
            }
        },
        getcode() {
            return `${this.phoneCodeOne}`;
        },
        Loading(value) {
            this.$store.state.isLoading = value;
        },
        cleanCode() {
            this.phoneCodeOne = "";
        },
        async changePassword() {
            this.Loading(true);
            let data = {
                newpassword: encrypt.encryptstring(
                    this.data.Password,
                    encrypt.publickey
                ),
                cellphone: this.store().Cellphone,
                code: this.phoneCodeOne,
            };
            const result = await usersignin.passwordrecovery(data);
            if (result.success) {
                dialogSuccess({
                    title: "Éxito",
                    text: "Contraseña cambiada correctamente",
                });
                // this.store.commit("LOGOUT");
                this.$router.push({ name: "recoverpasswordsuccess" });
            } else {
                
                dialogError({
                    title: "Error",
                    text: result.message,
                });
   
            }
            this.Loading(false);
        }
    },

    computed: {

        state() {
            return this.$store.state;
        },
    },
    async mounted() {
        const aft = await antiforgery.get();
        this.state.requesttoken = aft;
        if (this.$route.query.cellphone != "" && this.$route.query.cellphone) {
            this.email = this.$route.params.cellphone;
            this.phone = this.$route.query.cellphone;
            this.store().Cellphone = this.$route.query.cellphone;
            this.sendCodePhone();
        }
        this.timer();
    },
};
</script>

<style scoped>
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

.lowercase-text {
    font-family: Barlow;
    text-transform: capitalize;
    margin-right: 10px;
}

.title {
    justify-content: center;
    color: var(--secundarios-600, #000);
    text-align: center;
    /* Heading/Large2 */
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    width: auto;
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

.formcapital {
    text-transform: capitalize;
}

.subtitle2 {
    color: var(--secundarios-600, #000);
    text-align: center;

    /* Text/Small/Regular */
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 142.857% */
    letter-spacing: -0.14px;
}
</style>
