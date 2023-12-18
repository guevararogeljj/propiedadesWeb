<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <div class="title">
                    Inicia sesión
                </div>
                <div class="textoUno">
                    Para continuar por favor ingresa el
código del Autenticador 
                </div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-otp-input max-width="454px" max-height="74px" border-color="primary" class="codePhone" ref="phoneCodeOne"
                    v-model="phoneCodeOne" :style="{
                        'padding-left': '0',
                        'padding-right': '0'
                    }" :error-messages="v$.phoneCodeOne.$errors.map((e) => e.$message)" @input="v$.phoneCodeOne.$touch"
                    @blur="v$.phoneCodeOne.$touch" type="number" :length="6">
                </v-otp-input>
                <v-btn flat class="siguiente" @click="onClickNext()">
                    Ingresar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import usersignin from "@/core/services/usersignin" 
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            phoneCodeOne: "",
            loading: false
        };
    },
    validations() {
        return {
            phoneCodeOne: {
                required: helpers.withMessage("El código es requerido", required),
                maxLength: helpers.withMessage("El código debe tener máximo 6 caracteres", maxLength(6)),
                minLength: helpers.withMessage("El código debe tener mínimo 6 caracteres", minLength(6))
            }
        };
    },
    methods: {
        async onClickNext() {
           
      this.state.isLoading = true;

      const result = await usersignin.validateuptfaapp({
        cellphone: this.state.dataTemp.cellphone,
        code: "" + this.phoneCodeOne,
      });

      
      if (result.success) {
        this.state.userdata = this.state.dataTemp;
          this.state.username = this.state.dataTemp.name;
          this.state.email = this.state.dataTemp.email;
          this.state.cellphone = this.state.dataTemp.cellphone;
          this.state.token = this.state.dataTemp.token;
          this.state.isLogin = true;

        this.$router.push({ name: "Home" });

      } else {
        alert("Favor de validar los campos")
      }
      this.state.isLoading = false;
    }
    },
    computed:{
        state() {
            return this.$store.state;
        }
    }
}
</script>
<style scoped lang="scss">
.title {
    color: var(--Secundarios-600, #000);
    text-align: center;
    /* Heading/Large2 */
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    /* 100% */
    letter-spacing: -1.2px;
    margin: 41px auto;
    width: 379px;
    height: 40px;
}

.textoUno {
    width: 900px;
    color: var(--Secundarios-600, #000);
    text-align: center;
    /* Text/Large/Medium */
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.18px;
}

.codePhone {
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-color: #379bec;
    padding-left: inherit !important;
    width: 596px;
    height: 104px;
}

.siguiente {
    display: flex;
    width: 394px;
    height: 56px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: auto;
    border-radius: 12px;
    background: var(--Primary-500, #379BEC);
    color: var(--Secundarios-Blanco, #FFF);
}

@media screen and (max-width: 1919px) {
    .siguiente {
        display: flex;
        width: 394px;
        height: 56px;
        padding: 18px 16px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: auto 110px;
        border-radius: 12px;
        background: var(--Primary-500, #379BEC);
        color: var(--Secundarios-Blanco, #FFF);
    }

    .textoUno {
    width: 606px;
    color: var(--Secundarios-600, #000);
    text-align: center;
    /* Text/Large/Medium */
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.18px;
}
}
</style>