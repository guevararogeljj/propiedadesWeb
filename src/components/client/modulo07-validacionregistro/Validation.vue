<template>
    <div class="main-container">
      <div class="container wrapper-container pt-3 pb-4 mt-3">
        <div class="row mb-2">
          <div class="col-12 title justify-content-center">
            Verificación de celular
          </div>
          <div class="col-12 subtitle mt-1">
            Por favor ingresa el código de 4 digitos que enviamos por SMS a tu
            celular. {{ areacode }} ***** {{ phone }}
          </div>
        </div>
  
        <form method="post">
          <div class="row mt-5"></div>
          <div class="row justify-content-center">
            <input type="hidden" name="csrf" :value="true" />
            <div class="col-12 d-flex justify-content-center w-95">
              <p>Ingresa el código</p>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <div class="row">
                <div class="col-2"></div>
                <div class="col-2">
                  <input
                    ref="phoneCodeOne"
                    id="1"
                    name="one"
                    min="0"
                    max="9"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    v-model="phoneCodeOne"
                    @keypress="onKeyPress"
                    @keyup="onChangeCode('phoneCodeOne')"
                    class="form-control codephone"
                    type="number"
                    placeholder="*"
                  />
                </div>
                <div class="col-2">
                  <input
                    ref="phoneCodeTwo"
                    maxlength="1"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    @keyup="onChangeCode('phoneCodeTwo')"
                    @keypress="onKeyPress"
                    v-model="phoneCodeTwo"
                    class="form-control codephone"
                    type="number"
                    placeholder="*"
                    min="0"
                    max="9"
                  />
                </div>
                <div class="col-2">
                  <input
                    ref="phoneCodeThree"
                    maxlength="1"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    @keyup="onChangeCode('phoneCodeThree')"
                    @keypress="onKeyPress"
                    v-model="phoneCodeThree"
                    class="form-control codephone"
                    type="number"
                    placeholder="*"
                    min="0"
                    max="9"
                  />
                </div>
                <div class="col-2">
                  <input
                    ref="phoneCodeFour"
                    maxlength="1"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                    @keyup="onChangeCode('phoneCodeFour')"
                    @keypress="onKeyPress"
                    v-model="phoneCodeFour"
                    class="form-control codephone"
                    type="number"
                    placeholder="*"
                    min="0"
                    max="9"
                  />
                </div>
                <div class="col-2"></div>
              </div>
            </div>
  
            <div class="row w-95 mt-2">
              <div class="col-12">
                <button-primary
                  :Text="
                    'Reenviar sms ' + (this.countdown == 0 ? '' : this.countdown)
                  "
                  :disabled="countdown !== 0"
                  :OnClickButton="onClickResendButton"
                />
              </div>
            </div>
  
            <div class="row w-95 mt-2">
              <div class="col-12">
                <button-primary
                  ref="nextButton"
                  Text="Siguiente"
                  :OnClickButton="onClickNextButton"
                  :disabled="validateForm"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Modal
      Title="Aviso"
      :visible="showmodal"
      :OnCloseTittleButton="onCloseModalError"
    >
      {{ modalmessage }}
    </Modal>
  </template>
  
  <script>
  import userservice from "../services/userservice";
  import ButtonPrimary from "../shared/components/ButtonPrimary.vue";
  import antiforgery from "../services/antiforgery";
  import Modal from "@/components/shared/components/Modal2.vue";
  // import utils from '@/components/shared/commons/utils'
  // import ButtonSecondary from "../shared/components/ButtonSecondary.vue";
  export default {
    components: {
      // ButtonSecondary,
      ButtonPrimary,
      Modal,
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
      onChangeCode(val) {
        if (val == "phoneCodeOne") {
          this.$refs.phoneCodeTwo.focus();
        }
  
        if (val == "phoneCodeTwo") {
          this.$refs.phoneCodeThree.focus();
        }
  
        if (val == "phoneCodeThree") {
          this.$refs.phoneCodeFour.focus();
        }
  
        if (val == "phoneCodeFour") {
          //this.$refs.phoneCodeFour.lostfocust()
        }
      },
      async onClickNextButton() {
        this.Loading(true);
        const value = { code: this.getcode(), cellphone: this.store().cellphone };
        const result = await userservice.validatecodephone(value);
        if (result.success == true) {
          this.$router.push({ name: "registrationended" });
        } else {
          this.modalmessage = result.message;
          this.showmodal = true;
          this.cleanCode();
          //alert(result.message);
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
        if (this.store().cellphone) {
          const value = { cellphone: this.store().cellphone };
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
          this.phoneCodeOne = '';
          this.phoneCodeTwo='';
          this.phoneCodeThree ='';
          this.phoneCodeFour ='';
      },
      
    },
    computed: {
      validateForm() {
        let number = "";
        number =
          this.phoneCodeOne.toString() +
          this.phoneCodeTwo.toString() +
          this.phoneCodeThree.toString() +
          this.phoneCodeFour.toString();
  
        if (number.length === 4) return false;
  
        return true;
      },
      state() {
        return this.$store.state;
      },
    },
    async mounted() {
      this.Loading(true);
      this.phone = this.state.cellphone.slice(-3);
      this.sendCodePhone();
      this.timer();
      this.Loading(false);
      const aft = await antiforgery.get();
      this.state.requesttoken = aft;
    },
  };
  </script>
      
  
  <style  lang="scss" scoped>
  .wrapper-container {
    background: #f8f8f8;
    width: 30%;
    border-radius: 5px;
  }
  
  .form {
    border: 2px;
    border-radius: 5px;
    width: 80%;
  }
  
  .form-control-custom {
    background: #ffffff;
    border: 1px solid #d1d1d6;
    border-radius: 8px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    color: #333333;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  .title {
    letter-spacing: 1.4886px;
    color: #0092bc;
  }
  
  .subtitle {
    align-items: center;
    text-align: center;
    color: #484343;
  }
  
  .main-container {
    background-image: url("@/assets/landingpage_main.svg");
    background-repeat: no-repeat;
    background-position: center top;
    min-height: 34em;
  }
  .codephone {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    position: relative;
  }
  
  @media only screen and (max-width: 900px) {
    .wrapper-container {
      background: #f8f8f8;
      width: 85%;
      border-radius: 5px;
    }
  }
  </style>