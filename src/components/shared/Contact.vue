<template>
  <div class="content" style="border-radius: 26px; background: var(--Secundarios-300, #F5F6F6);">
    <v-skeleton-loader v-if="this.isLoading" class="mx-auto" type="image, table"></v-skeleton-loader>
    <v-form v-else :class="IsInversion ? 'banner' : ''">
      <v-row>
        <v-col cols="12">
          <!-- <div :class="{  'center w-auto  header': isLogin }">{{ Titulo }}</div> -->
          <div :class="IsInversion ? 'center w-auto  header' : 'center w-auto headerTwo'">{{ Titulo }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="center w-auto subtitle">{{ Subtitulo }}</div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field class="contactFom" density="compact" variant="outlined" type="text" label="Nombre completo"
            bg-color="white" v-model="data.fullname" :error-messages="v$.data.fullname.$errors.map(e => e.$message)"
            @input="v$.data.fullname.$touch" @blur="v$.data.fullname.$touch"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field class="contactFom" density="compact" variant="outlined" label="Teléfono" type="text"
            bg-color="white" v-model="data.cellphone" :error-messages="v$.data.cellphone.$errors.map(e => e.$message)"
            @input="v$.data.cellphone.$touch" @blur="v$.data.cellphone.$touch"></v-text-field> </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field class="contactFom" density="compact" variant="outlined" type="email" label="Correo electrónico"
            bg-color="white" v-model="data.email" :error-messages="v$.data.email.$errors.map(e => e.$message)"
            @input="v$.data.email.$touch" @blur="v$.data.email.$touch"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea class="contactFom" density="compact" variant="outlined" label="Mensaje" type="text" bg-color="white"
            v-model="data.message" :error-messages="v$.data.message.$errors.map(e => e.$message)"
            @input="v$.data.message.$touch" @blur="v$.data.message.$touch"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-center mx-auto">
            <v-btn :disabled="this.v$.$invalid" class="btnCustom center" @click="onClickButtonSend">Contactar</v-btn>
            <br />
            <span>Al enviar mensaje acepto los </span>
            <span><router-link to="/termsAndConditions" class="h7"> Términos y condiciones</router-link></span>
            <span> y el </span>
            <span><router-link to="/privacyPolicy" class="h7"> Aviso privacidad</router-link></span>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import utils from "@/core/utils/utils";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
import contservice from "@/core/services/contservice";
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  components: { ButtonSecondary },
  name: "contactComp",
  data() {
    return {
      data: {
        fullname: "",
        email: "",
        cellphone: "",
        message: "",
        terms: false,
      },
      v$: useVuelidate(),
      isLoading: false,
      regexPattern: /^[a-zA-Z\s]+$/,
      regexNum : /^(0|[1-9][0-9]*)$/
    };
  },
  validations() {
    return {
      data: {
        fullname: {
          required: helpers.withMessage("El nombre es requerido", required)
        },
        email: { required: helpers.withMessage("El correo es requerido", required), email: helpers.withMessage("El correo no es válido", email) },
        cellphone: {
          required: helpers.withMessage("El Teléfono es requerido", required),
          maxLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", maxLength(10)),
          
          regex: helpers.withMessage("Se requiere solo números", value => {
            return this.regexNum.test(value)
          }),
          minLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", minLength(10)),
        },
        message: {
          required: helpers.withMessage("El Mensaje es requerido", required),
          maxLength: helpers.withMessage("El Mensaje debe tener máximo 500 caracteres", maxLength(500)),

          regex: helpers.withMessage("El Mensaje no debe contener caracteres especiales", value => {
            return this.regexPattern.test(value)
          }),
          minLength: helpers.withMessage("El Mensaje debe tener mínimo 10 caracteres", minLength(10)),

        },
        terms: { required: helpers.withMessage("Debe aceptar los términos y condiciones", required) },
      },
    };
  },
  props: {
    OnClickSendData: { type: Function, default: null },
    DataPrivacityUrl: {
      type: String,
      default:
        "https://www.finastrategy.mx/wp-content/themes/finastrategy/assets/aviso-de-privacidad.pdf",
    },
    Titulo: {
      type: String,
      default: "Contáctanos"
    },
    Subtitulo: {
      type: String,
      default: "Déjanos un mensaje y uno de nuestros agentes se pondrá en contacto contigo en muy poco tiempo."
    },
    IsInversion: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    async onClickButtonSend() {
      if (this.v$.$invalid) {
        dialogError({
          title: "Error",
          text: "Favor de llenar los campos requeridos",
        });
        return;
      }
      this.isLoading = this.Loading(true);
      const result = await contservice.send(this.data);

      if (result.success != true) {
        dialogError({
          title: "Error",
          text: result.message,
        });
        return;
      }
      else {
        dialogSuccess({
          title: "",
          text: "El mensaje se envió correctamente " + result.message,
        });
      }
      this.isLoading = this.Loading(false);
      this.v$.data.$reset();
      // utils.setAllPropsObject(this.data);
    },
    Loading(value) {
      return (this.$store.state.isLoading = value);
    },
  },
  computed: {
    sendActive() {
      let active = false;
      if (!this.data.fullname) {
        active = true;
      }
      if (!this.data.email) {
        active = true;
      }
      if (!this.data.cellphone) {
        active = true;
      }
      if (!this.data.message) {
        active = true;
      }
      if (!this.data.terms) {
        active = true;
      }

      return active;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style scoped>
.banner {
  position: relative;

  text-align: center;
  z-index: 9999;

  border-radius: 24px;
  border: 3px solid var(--Primary-500, #379BEC);
  background: var(--Secundarios-Blanco, #FFF);
}

.subtitle {
  width: 414px;
  color: var(--Secundarios-600, #000);

  /* Text/Large/Medium */
  font-family: Barlow;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.18px;
}

.header {
  width: 500px;
  height: 75px;
  flex-shrink: 0;
  border-radius: 18px 18px 0px 0px;
  background: var(--Primary-500, #379BEC);

  color: var(--Secundarios-Blanco, #FFF);

  /* Heading/Medium 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
  float: center;
  align-items: center;

  align-items: center;
}

.headerTwo {
  width: 296px;
  height: 46px;
  flex-shrink: 0;
  color: var(--Secundarios-600, #000);
  text-align: center;

  /* Heading/Large1 */
  font-family: Barlow;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 52.83px;
  /* 110.063% */
  letter-spacing: -1.44px;
}

.center {
  margin: auto;
  padding: 10px;
  text-align: center;
}

.contactFom {
  max-width: 394px;
  margin: auto;
  min-width: 20px;


}

.btnCustom {
  height: 56px;
  text-transform: none;
  display: flex;
  width: 440px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: var(--Primary-500, #379BEC);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}


@media only screen and (max-width: 767px) {
  .contactFom {
    width: 288px;
    margin: auto;
    min-width: 288px;
  }

  .btnCustom {
    height: 56px;
    text-transform: none;
    display: flex;
    width: 440px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--Primary-500, #379BEC);

    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
  }
}
</style>
