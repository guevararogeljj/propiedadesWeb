<template>
  <v-container fluid>
    <v-row style="align-items: center">
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
        <v-card flat>
          <v-card-title>
            <p class="title">Captura de datos</p>
            <p class="subtitle">
              Por favor ingresa tus datos
            </p>
          </v-card-title>
          <v-card-text>
            <v-text-field density="compact" variant="outlined" label="correo electrónico" v-model="data.email"
              class="form-input" :error-messages="v$.data.email.$errors.map((e) => e.$message)
                " @input="v$.data.email.$touch" @blur="v$.data.email.$touch" autocomplete="off"></v-text-field>

            <select name="Occupation" placeholder="Ocupación" class="dropdown" :error-messages="v$.data.ocuppation.$errors.map((e) => e.$message)
              " @input="v$.data.ocuppation.$touch" @blur="v$.data.ocuppation.$touch" autocomplete="off"
              v-model="data.ocuppation">
              <option value=0 selected disabled>Ocupación</option>
              <option v-for="o of occupationList" :key="o.id" :value="o.id"> {{ o.description }}</option>
            </select>
            <div class="salto"></div>
            <v-text-field density="compact" variant="outlined" label="RFC" v-model="data.rfc" class="form-input"
              :error-messages="v$.data.rfc.$errors.map((e) => e.$message)
                " @input="v$.data.rfc.$touch" @blur="v$.data.rfc.$touch" autocomplete="off"></v-text-field>

            <v-text-field density="compact" variant="outlined" label="Ciudad de origen" v-model="data.hometown"
              class="form-input" :error-messages="v$.data.hometown.$errors.map((e) => e.$message)
                " @input="v$.data.hometown.$touch" @blur="v$.data.hometown.$touch" autocomplete="off"></v-text-field>

            <div class="salto"></div>
            <select name="maritalstatus" placeholder="Estado Civil" class="dropdown" :error-messages="v$.data.ocuppation.$errors.map((e) => e.$message)
              " @input="v$.data.ocuppation.$touch" @blur="v$.data.ocuppation.$touch" autocomplete="off"
              v-model="data.maritalstatus">
              <option value=0 selected disabled>Estado Civil</option>
              <option v-for="m of maritalStatusList" :key="m.id" :value="m.id"> {{ m.description }}</option>
            </select>
          </v-card-text>
          <v-card-actions>
            <v-btn class="btnEditar" @click="onClickNextButton()">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import catservice from "@/core/services/catservice";
import antiforgery from "@/core/services/antiforgery";
import usersignin from "@/core/services/usersignin";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
import customselect from "@/components/common/CustomSelect.vue";
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
    ButtonPrimary,
    customselect
  },
  validations() {
    return {
      data: {
        email: {
          required: helpers.withMessage("El correo es requerido", required),
          email: helpers.withMessage("El correo no es válido", email),
        },
        ocuppation: {
          required: helpers.withMessage("La ocupación es requerida", required),
        },
        rfc: {
          required: helpers.withMessage("El RFC es requerido", required),
          minLength: helpers.withMessage(
            "El RFC debe tener 12 o 13 caracteres",
            minLength(12)
          ),
          maxLength: helpers.withMessage(
            "El RFC debe tener 12 o 13 caracteres",
            maxLength(13)
          ),
        },
        hometown: {
          required: helpers.withMessage(
            "La ciudad de origen es requerida",
            required
          ),
        },
        maritalstatus: {
          required: helpers.withMessage(
            "El estado civil es requerido",
            required
          ),
        },
      }
    }
  },
  name: "datosFiscales",
  data() {
    return {
      data: {
        email: "",
        ocuppation: 0,
        Address: "",
        rfc: "",
        hometown: "",
        maritalstatus: 0,
        TypeFileDoc: null,
        RfcDoc: '',
        Cellphone: '',
        RfcType: true
      },
      terms: false,
      personType: false, //false: Persona Moral, true: persona fisica
      constanciaBtnDisabled: true,
      constanciaSucess: false,
      occupationList: [],
      maritalStatusList: [],
      v$: useVuelidate(),
    };
  },
  props: {
    EnableNextButton: { type: Boolean, default: true },
  },
  methods: {
    Loading(value) {
      this.$store.state.isLoading = value;
    },
    async onClickNextButton() {
      this.Loading(true);
      this.postContractData();

      this.Loading(false);
    },
    onClickCalcelButton() { },
    async sendUserData() { },
    onChangeConstanciaFile(e) {
      this.data.RfcDoc = e.file;
      this.data.TypeFileDoc = e.filetype;
      this.constanciaSucess = true;
    },
    changePersonType() {
      this.data.RfcType = !this.data.RfcType;
      this.constanciaBtnDisabled = !this.data.RfcType;
      this.constanciaSucess = false;
      this.data.RfcDoc = '';
      this.data.TypeFileDoc = '';
    },

    getOccupation() {
      this.occupationList.push({ id: 1, description: 'DESEMPLEADO' });
      this.occupationList.push({ id: 2, description: 'Profesor' });
      this.occupationList.push({ id: 3, description: 'Comerciante' });
      this.occupationList.push({ id: 4, description: 'Minero' });
      this.occupationList.push({ id: 5, description: 'Ventas' });
      this.occupationList.push({ id: 6, description: 'Hogar' });
      this.occupationList.push({ id: 7, description: 'Servicios' });
      this.occupationList.push({ id: 8, description: 'Operario' });
      this.occupationList.push({ id: 9, description: 'Tecnico' });
      this.occupationList.push({ id: 10, description: 'Agricultura' });
      this.occupationList.push({ id: 11, description: 'Jornalero' });
      this.occupationList.push({ id: 12, description: 'Construcción' });
      this.occupationList.push({ id: 13, description: 'Supervisor-Administrador' });
      this.occupationList.push({ id: 14, description: 'Propietario de Negocios' });
      this.occupationList.push({ id: 15, description: 'Militar-Policia' });
      this.occupationList.push({ id: 16, description: 'Oficinista' });
      this.occupationList.push({ id: 17, description: 'Jubilado-Pensionado' });
      this.occupationList.push({ id: 18, description: 'Ingeniero' });
      this.occupationList.push({ id: 19, description: 'Sacerdote' });
      this.occupationList.push({ id: 20, description: 'Médico' });
      this.occupationList.push({ id: 21, description: 'Enfermero' });
      this.occupationList.push({ id: 22, description: 'Intendente' });
      this.occupationList.push({ id: 23, description: 'Directora' });
      this.occupationList.push({ id: 24, description: 'Secretaria' });
      this.occupationList.push({ id: 25, description: 'Seguridad-Guardia' });
      this.occupationList.push({ id: 26, description: 'Chofer' });
      this.occupationList.push({ id: 27, description: 'Independiente' });
      this.occupationList.push({ id: 28, description: 'Oficios Varios' });
      this.occupationList.push({ id: 29, description: 'Otro' });
      this.occupationList.push({ id: 30, description: 'Jubilado' });
      this.occupationList.push({ id: 31, description: 'Pensionado' });
    },
    getMaritalStatus() {
      this.maritalStatusList.push({ id: 1, description: 'SOLTERO' });
      this.maritalStatusList.push({ id: 2, description: 'CASADO B. SEPARADOS' });
      this.maritalStatusList.push({ id: 3, description: 'CASADO B. MANCOMUNADOS' });
      this.maritalStatusList.push({ id: 4, description: 'DIVORCIADO (A)' });
      this.maritalStatusList.push({ id: 5, description: 'UNION LIBRE' });
      this.maritalStatusList.push({ id: 6, description: 'SEPARADO (A)' });
      this.maritalStatusList.push({ id: 7, description: 'VIUDO (A)' });

    },

    async postContractData() {
      this.data.Cellphone = this.store.userdata.cellphone;
      this.data.RfcDoc = this.data.RfcDoc ?? "";
      this.data.TypeFileDoc = this.data.TypeFileDoc ?? "";
      const result = await usersignin.addcontractdata(this.data);
      if (result.success) {
        this.$router.push({ name: "completedregistrationended" });
      } else {

        dialogError({
                    title: "¡Error!",
                    text:  result.message,
                });
      }
    }

  },
  computed: {
    validateForm() {
      let dontactive = new Array(); // if is false, the button turns to active mode, true deactive the button

      if (this.data.email != '') {
        dontactive.push(false);
      }
      else {
        dontactive.push(true);
      }

      if (this.data.ocuppation > 0) {
        dontactive.push(false);
      }
      else {
        dontactive.push(true);
      }
      if (this.data.rfc != '') {
        dontactive.push(false);
      }
      else {
        dontactive.push(true);
      }

      if (this.data.maritalstatus > 0) {
        dontactive.push(false);
      }
      else {
        dontactive.push(true);
      }

      if (this.data.hometown != '') {
        dontactive.push(false);
      }
      else {
        dontactive.push(true);
      }

      return dontactive.find(x => x == true);
    },
    store() {
      return this.$store.state;
    },
    backFileOk() {
      if (this.constanciaSucess) {
        // return require("@/assets/checkcicle_icon.svg");
      }
      return null;
    },
  },
  async mounted() {
    this.Loading(true);
    await antiforgery.get();
    this.Loading(false);
    const aft = await antiforgery.get();
    this.store.requesttoken = aft;
    this.constanciaBtnDisabled = false;
    this.occupationList = await catservice.Occupations();
    this.maritalStatusList = await catservice.Maritalstatus();
    this.data.Cellphone = this.store.Cellphone;
  },
};
</script>
      
<style scoped>
.btnEditar {
  margin: auto;
  color: #FFF;
  display: flex;
  width: 394px;
  height: 56px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--primary-500, #379BEC);
}

.salto {
height: 10px;
}

.dropdown {
  min-width: 394px;
  display: inline-flex;
  height: 56px;
  padding: 18px 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 0.7px solid var(--secundarios-400, #E0E2E4);
  background: var(--secundarios-blanco, #FFF);
}

.btnLogin {
  display: flex;
  width: 393px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

@media screen and (max-width: 767px) {}
</style>
