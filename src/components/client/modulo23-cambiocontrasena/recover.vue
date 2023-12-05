<template>
  <v-container fluid>
    <v-row class="form">
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
        <v-card flat>
          <v-card-title>
            <p class="title">Recuperar mi contraseña</p>
            <br />
            <p class="subtitle">
              Para restaurar tu contraseña ingresa el número telefónico con el
              que te registraste
            </p>
          </v-card-title>
          <v-card-text>
            <v-text-field density="compact" variant="outlined" class="form-input"
<<<<<<< HEAD
              label="Ingresa con correo electrónico o número telefónico" v-model="data.oldemail"
=======
              label="Ingresa con correo electrónico o número telefónico" v-model="data.oldemail" 
>>>>>>> e9f1487416950112b1c84829dd637fc048aa052e
              autocomplete="off"></v-text-field>
            <br />
            <v-btn color="primary2" class="btnLogin" @click="onClickNextButton()">Continuar</v-btn>

            <br />
            <v-btn variant="flat" @click="cancel()">Cancelar</v-btn>
            <br />
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
import antiforgery from "@/core/services/antiforgery";
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
  name: "requestpasswordrecoveryComp",
  data() {
    return {
      data: {
        oldemail: "",
        newemail: "",
        password: "",
        code: '',
      },
      terms: false,
      newemail2: "",
      email: "",

      showModalError: false,
      showModalSuccess: false,
      showModalErrorService: false,
      errorservicemessage: "",
      phone: "",
    };
  },
  components: {
    ButtonSecondary,
    ButtonPrimary,
  },
  props: {
    EnableNextButton: { type: Boolean, default: true },
  },
  methods: {
    onCloseModalSuccess() {
      this.showModalSuccess = false;
      this.$router.push({ name: "Home" });
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

      let data = {
        cellphone: '' + this.data.oldemail
      };

      const result = await usersignin.sendpasswordrecovery(data);
      this.Loading(false);

      if (result.success) {

        this.store.dataTemp = { cellphone: this.data.oldemail };
        this.$router.push({
          name: 'passwordrecovery',
          query: {
            cellphone: '' + this.data.oldemail
          }
        });
      }
      else {
        dialogError({
                    title: "¡Error!",
                    text:"correo o número no encontrado " + result.message,
                });
      }
    },
    onClickCalcelButton() { },
    async sendUserData() { },
  },
  computed: {
    validateForm() {
      let dontactive = false; // if is false, the button turns to active mode, false deactive the button
      if (!this.data.oldemail) {
        dontactive = true;
      }
      if (this.terms == false) {
        dontactive = true;
      }

      return dontactive;
    },
    validateoldemail() {
      if (!this.data.oldemail || !(this.data.oldemail.length == 10)) {
        return this.resources().errormessagesoldemail.oldemail;
      }

      return this.resources().errormessagesoldemail.oldemailCorrect;
    },
    validatenewemail() {
      if (!(this.data.newemail.length == 10)) {
        return this.resources().errormessagesnewemail.newemail;
      }

      return this.resources().errormessagesnewemail.newemailCorrect;
    },
    validatenewemail2() {
      if (!(this.data.newemail.length == 10)) {
        return this.resources().errormessagesnewemail2.newemail2;
      }

      if (!(this.data.newemail === this.newemail2)) {
        return this.resources().errormessagesnewemail2.newemail2same;
      }
      return this.resources().errormessagesnewemail2.newemailCorrect2;
    },
    state() {
      return this.$store.state;
    },
    store() {
      return this.$store;
    },
  },
  async mounted() {
    const aft = await antiforgery.get();
    this.state.requesttoken = aft;
  },
};
</script>

<style lang="scss" scoped>
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
  max-width: 560px;
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
