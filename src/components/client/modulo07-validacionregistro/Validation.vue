<template>
  <v-container fluid>
    <v-row style="align-items: center">
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <v-card>
          <v-card-title>
            <p class="title">Regístrate</p> 
            <br />
            <p class="subtitle">Verifica tu número telefónico</p>
            <p class="subtitle2">
              Por favor ingresa el código de 4 digitos que enviamos por SMS a tu
            celular. {{ areacode }} ***** {{ phone.slice(-4) }}
            </p>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-otp-input
                ref="phoneCodeOne"
                id="1"
                name="one"
                min="0"
                max="9"
                v-model="phoneCodeOne"
                type="number"
                @keypress="onKeyPress"

                :length="4"
              ></v-otp-input>
              <v-btn color="primary2" block @click="onClickNextButton"
                >Continuar</v-btn
              >
              <br />

              <div style="text-align: center">
                <span class="leyenda">¿No has recibido el código?</span>
                <span class="termino">
                  <button-primary
                    class="lowercase-text"
                    variant="text"
                    :Text="
                      'Solicitar nuevo código en ' +
                      (this.countdown == 0 ? '' : this.countdown)
                    "
                    :disabled="countdown !== 0"
                    :OnClickButton="onClickResendButton"
                  />
                </span>
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
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
// import utils from '@/components/shared/commons/utils'
// import ButtonSecondary from "../shared/components/ButtonSecondary.vue";
export default {
  components: {
    // ButtonSecondary,
    ButtonPrimary,
  },
  name: "regristroComp",
  data() {
    return {
      phoneCodeOne: "",
      phoneCodeTwo: "",
      phoneCodeThree: "",
      phoneCodeFour: "",
      data: {
        code: this.getcode(),
        email: this.store().email,
      },
      areacode: "+52",
      phone: "968",
      countdown: 300,
      modalmessage: "",
      showmodal: false,
      v$: useVuelidate(),
    };
  },
  props: {
    EnableNextButton: { type: Boolean, default: true },
  },
  methods: {
    onCloseModalError() {
      this.showmodal = false;
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

    async onClickNextButton() {
      debugger;
      this.Loading(true);
      const value = { code: this.getcode(), cellphone: this.store().Cellphone };
      const result = await userservice.validatecodephone(value);
      if (result.success == true) {
        this.$router.push({ name: "registrationended" });
      } else {
        dialogError({
          title: "Error",
          text: result.message,
        });
        // this.modalmessage = result.message;
        // this.showmodal = true;
        this.cleanCode();
      }
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
    onClickCalcelButton() {},
    async sendCodePhone() {
      if (this.store().Cellphone) {
        const value = { Cellphone: this.store().Cellphone };
        await userservice.codephone(value);
      }
    },
    getcode() {
      return `${this.phoneCodeOne}${this.phoneCodeTwo}${this.phoneCodeThree}${this.phoneCodeFour}`;
    },
    Loading(value) {
      this.$store.state.isLoading = value;
    },
    cleanCode() {
      this.phoneCodeOne = "";
      this.phoneCodeTwo = "";
      this.phoneCodeThree = "";
      this.phoneCodeFour = "";
    },
  },
  computed: {
    validateForm() {
      let number = "";
      number =
        this.phoneCodeOne.toString();


      if (number.length === 4) return false;

      return true;
    },
    state() {
      return this.$store.state;
    },
  },
  async mounted() {
    debugger;
    this.Loading(true);
    this.phone = this.state.Cellphone;
    this.sendCodePhone();
    this.timer();
    this.Loading(false);
    const aft = await antiforgery.get();
    this.state.requesttoken = aft;
  },
};
</script>

<style scoped>
.lowercase-text {
  font-family: Barlow;
  text-transform: capitalize;
  margin-right: 10px;
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

.subtitle2 {
  color: var(--secundarios-600, #000);
  text-align: center;

  /* Text/Small/Regular */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
}
</style>
