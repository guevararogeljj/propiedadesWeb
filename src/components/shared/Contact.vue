<template>
  <div class="content">
    <v-skeleton-loader v-if="this.isLoading" class="mx-auto" type="image, table"></v-skeleton-loader>
    <v-form v-else>
    <v-row justify="center" >
      <h1 class="center">{{ Titulo }}</h1>
    </v-row>
    <v-row justify="center">
      <v-col
      >
        <v-text-field class="contactFom" density="compact" variant="solo" type="text" label="Nombre completo" v-model="data.fullname"
          :error-messages="v$.data.fullname.$errors.map(e => e.$message)" @input="v$.data.fullname.$touch"
          @blur="v$.data.fullname.$touch"></v-text-field>

      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-text-field class="contactFom" density="compact" variant="solo" label="Teléfono" type="number" v-model="data.cellphone"
          :error-messages="v$.data.cellphone.$errors.map(e => e.$message)" @input="v$.data.cellphone.$touch"
          @blur="v$.data.cellphone.$touch"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-text-field class="contactFom" density="compact" variant="solo" type="email" label="correo electrónico" v-model="data.email"
          :error-messages="v$.data.email.$errors.map(e => e.$message)" @input="v$.data.email.$touch"
          @blur="v$.data.email.$touch"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-text-field class="contactFom" density="compact" variant="solo" label="Mensaje" type="text" v-model="data.message"
          :error-messages="v$.data.message.$errors.map(e => e.$message)" @input="v$.data.message.$touch"
          @blur="v$.data.message.$touch"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="row mt-3 pb-3">
          <div>
            <button-secondary :IsDisabled="this.v$.$invalid" Text="ENVIAR MENSAJE" Icon="mdi-send" color="primary" @click="onClickButtonSend" />
          </div>
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
    };
  },
  validations() {
    return {
      data: {
        fullname: { required: helpers.withMessage("El nombre es requerido", required) },
        email: { required: helpers.withMessage("El correo es requerido", required), email: helpers.withMessage("El correo no es válido", email) },
        cellphone: {
          required: helpers.withMessage("El Teléfono es requerido", required),
          maxLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", maxLength(10)),
          minLength: helpers.withMessage("El Teléfono debe tener 10 dígitos", minLength(10))
        },
        message: {
          required: helpers.withMessage("El Mensaje es requerido", required),
          maxLength: helpers.withMessage("El Mensaje debe tener máximo 500 caracteres", maxLength(500)),
          minLength: helpers.withMessage("El Mensaje debe tener mínimo 10 caracteres", minLength(10))
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
      default: "Contáctenos"
    }
  },
  methods: {
    async onClickButtonSend() {
      debugger
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
      utils.setAllPropsObject(this.data);
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
  },
};
</script>

<style scoped lang="scss">
.center {
  margin: auto;
  padding: 10px;
}
.contactFom {
  width: 394px;
  margin: auto;
}
</style>
