<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">          
          <div class="title">
            Verificación en 2 pasos
          </div>
          <div class="textoUno">
            Realiza los siguientes pasos para agregar más seguridad a tu cuenta
            y activar la verificación
          </div>
          
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
          <v-card class="card" flat>
            <v-row justify="center">
              <v-col cols="12" sm="12" md="6" style="text-align: center;"> 
                <div class="pasoUno">
                  1. Descarga la Aplicación en tu teléfono
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-evenly;">
                  <div class="cardDos">
                    <br>
                      <div class="divUnoCardDos">Autenticador de Google</div>
                      <a class="hrefCardDos" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2
">Descargar para Android</a>
                  <br>
                      <a  class="hrefCardDos" href="https://apps.apple.com/us/app/google-authenticator/id388497605">Descargar para iOs</a>
                  </div>
                  <div class="cardDos">
                    <br>
                      <div class="divUnoCardDos">Autenticador de Microsoft</div>
                      <a class="hrefCardDos" href="https://play.google.com/store/search?q=autenticador+de+microsoft&c=apps">Descargar para Android</a>
                  <br>
                      <a  class="hrefCardDos" href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458">Descargar para iOs</a>
  
                  </div>            
                </div>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="12" md="6" style="text-align: center;"> 
                
                  <div>
                    <div class="pasoUno">
                      2. Abre la app descargada y escanea el siguiente código QR para continuar la verificación
                    </div >
                    <div class="divUnoCardPaso2">
                      <img :src="this.url" alt="qr code" class="imagenQr" />
                    </div>
                    <v-btn flat class="siguiente" @click="onClickSiguientedobleFactorButton()">
                        Siguiente
                    </v-btn>
                  </div>
              </v-col>
            </v-row>        
          </v-card>         
        </v-col>
      </v-row>
    </v-container>
   
  </template>
  
  <script>
 
 
  import usersignin from "@/core/services/usersignin" 

  export default {
    name: "tfaComp",    
    data() {
      return {
        manualkey: "",
        code: "",
        url: "",
        showmodal: false,
      };
    },
    methods: {
      onCloseModalError() {
        this.showmodal = false;
      },
      onKeyupInputCode() { },
      async onClickCopyButton() {
        await navigator.clipboard.writeText(this.manualkey);
      },  
      goToHome() {
        this.$router.push({ name: "home" });
      },
      onClickBack() {
        this.goToHome();
      },
      async onClickNext() {
        this.state.isLoading = true;
  
        const result = await usersignin.uptfaappstatus({
          cellphone: this.state.userdata.cellphone,
          code: "" + this.code
        });
  
        if (result.success) {
          this.$router.push({ name: "tfavalidated" });
        } else {
          this.showmodal = true;
        }
        this.state.isLoading = false;
      },      
      onClickSiguientedobleFactorButton() {
            this.$router.push({ name: "codigodoblefactor" });
      }
    },
    computed: {
      state() {
        return this.$store.state;
      },
      validcode() {
        const regexCode = /^\d{6}$/;
        const validcode = regexCode.test(this.code);
  
        return validcode;
      },
    },
    async mounted() {
      this.state.isLoading = true;
  
      if (this.state.isLogin) {
        const result = await usersignin.uptfaapp({
          cellphone: this.state.userdata.cellphone,
        });
        this.url = result.result.url;
        this.manualkey = result.result.manualkey;
        // console.log(result);
      } else {
        this.$router.push({ name: "login" });
      }
  
      this.state.isLoading = false;
    },
  };
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
    line-height: 40px; /* 100% */
    letter-spacing: -1.2px;
    margin: 41px auto;
    width: 379px;
    height: 40px;
  }
  
  .textoUno
  {
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

  .card {
    margin: auto;
    max-width: 537px;
    min-height: 818px;
    height: 713px;
    flex-shrink: 0;
    border-radius: 23px;
    border: 1px solid var(--secundarios-400, #E0E2E4);
    fill: var(--Secundarios-300, #F5F6F6);
}

.pasoUno
{
  color: var(--Secundarios-600, #000);
  text-align: center;
  /* Heading/Medium 2 */
  font-family: Barlow;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: -0.4px;
  width: 337px;
  height: 24px;
  margin: 46px auto 28px auto;

}

.cardDos{
  border-radius: 22px;
  background: var(--Secundarios-200, #FBFBFB);
  width: 230px;
  height: 152px;
  flex-shrink: 0;
  margin: auto 15px;
}

.divUnoCardDos
{
  color: var(--Secundarios-600, #000);
  text-align: center;
  /* Text/Small/Medium */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  margin: 9px auto 9px;

}
.hrefCardDos
{
  color: var(--Primary-500, #379BEC);
  text-align: center;
  justify-content: center;
  /* Text/Regular/MediumUnder */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: -0.16px;
  text-decoration-line: underline;
  margin: 9px auto 9px auto;

}
.lineaDivisor
{
  width: 818px;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 0.7px;
  stroke: var(--Secundarios-400, #E0E2E4);
}
.imagenQr
{
  width: 159px;
  height: 160px;
  flex-shrink: 0;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  margin: 29px;

}
.siguiente
{
  border-radius: 12px;
  background: var(--Primary-500, #379BEC);
  display: flex;
  width: 394px;
  height: 56px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: var(--Secundarios-Blanco, #FFF);
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: -0.16px;
  text-transform: none;
}
.divUnoCardPaso2
{  
  margin: 15px auto 15px;
}
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  input[type="number"] {
    width: 14.5rem;
    text-align: center;
  }
  
  textarea {
    resize: none;
  }
  </style>