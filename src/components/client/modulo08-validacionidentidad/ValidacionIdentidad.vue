<template>
  <v-container fluid>
    <v-row style="align-items: center">
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
        <div class="title">Valida tu identidad</div>
        <div class="salto"></div>
        <div class="subtitle">Para obtener el NDA en Línea necesitamos verificar tu identidad
          a través de tu INE vigente</div>
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col cols="12" md="3" align="center">
      </v-col>
      <v-col cols="12" md="3" align="center">
        <v-card flat class="card">
          <v-card-title>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">
              <img class="iconsImage" src="@/assets/ife_front.png" alt="ife frente" height="160" />
            </div>
            <div class="salto"></div>
            <div class="d-flex justify-center frenteText">
              Sube una fotografía clara del frente de tu INE
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <Buttonfile Text="Subir frente de INE" :ImageIconRight="frontFileOk" FileType="Front"
              :IsDisabled="frontsuccess" :OnChangeFile="onChangeFileFront" v-show="!this.isMobile" />

            <v-btn class="btnFrontMobile"  @click="onClickFrontMobile" v-show="this.isMobile">
             <v-icon v-if="this.frontsuccess">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else>mdi-camera-outline</v-icon>
              Tomar foto del frente de INE
            </v-btn>
              
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" align="center">
        <v-card flat class="card" :disabled="!this.frontsuccess">
          <v-card-title>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">
              <img class="iconsImage" src="@/assets/ife_back.png" alt="ife frente" height="160" />
            </div>
            <div class="salto"></div>
            <div class="d-flex justify-center frenteText">
              Sube una fotografía clara del reverso de tu INE
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <Buttonfile Text="Reverso de INE" FileType="Back" :ImageIconRight="backFileOk" :IsDisabled="backsuccess"
              :OnChangeFile="onChangeFileBack" v-show="!this.isMobile" />
                <v-btn class="btnFrontMobile"  @click="onClickReverseMobile" v-show="this.isMobile">
                  <v-icon v-if="this.backsuccess">mdi-checkbox-marked-circle</v-icon>
              <v-icon v-else>mdi-camera-outline</v-icon>
              Tomar foto reverso de INE</v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" align="center">
      </v-col>
    </v-row>
    <v-row style="align-items: center">
      <v-col cols="12" md="3" align="center">
      </v-col>
      <v-col cols="12" md="6" align="center">
        <v-btn flat block class="btnContinuar" :disabled="activeNextButton" @click="onClickNextButton">Continuar</v-btn>
      </v-col>
      <v-col cols="12" md="3" align="center">
      </v-col>
    </v-row>
  </v-container>
  <!-- <div class="main-container">
      <div class="container wrapper-container pt-3 pb-4 mt-3">
        <div class="row mb-2">
          <div class="col-12 title justify-content-center">
            Validación de identidad
          </div>
          <div class="col-12 subtitle mt-1">
            Captura una fotografia de tu INE/IFE
          </div>
        </div>
        <div>
          <div class="row mt-5"></div>
          <div class="row justify-content-center">
            <div class="col-12">
              <img src="@/assets/ife_front.png" alt="ife frente" height="160" />
            </div>
            <div class="col-12 mt-1">
              <customButtonSeconday class="" Text="FRENTE DE INE" :ImageIconRight="frontFileOk" FileType="Front"
                :IsDisabled="frontsuccess" :OnChangeFile="onChangeFileFront" v-show="!this.isMobile" />
  
              <ButtonSecondary Text="FRENTE DE INE" :OnClickButton="onClickFrontMobile" :ImageIcon="frontFileOk" v-show="this.isMobile" />
            </div>
  
            <div class="col-12 mt-3">
              <img src="@/assets/ife_back.png" alt="ife reverso" height="160" />
            </div>
            <div class="col-12 mt-1">
              <customButtonSeconday Text="REVERSO DE INE" FileType="Back" :ImageIconRight="backFileOk"
                :IsDisabled="backsuccess" :OnChangeFile="onChangeFileBack" v-show="!this.isMobile" />
  
              <ButtonSecondary Text="REVERSO DE INE" :OnClickButton="onClickReverseMobile" :ImageIcon="backFileOk" v-show="this.isMobile" />
            </div>
  
            <div class="row w-95 mt-4">
              <div class="col-12">
                <button-primary Text="Siguiente" :OnClickButton="onClickNextButton" :disabled="activeNextButton" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>
  
<script>
import devicedetector from "@/core/utils/isMobileDevice";
import Buttonfile from "@/components/shared/FileButton.vue";
import { mapGetters, mapMutations } from "vuex";
import antiforgery from "@/core/services/antiforgery";
import userservice from '@/core/services/userservice';
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
export default {
  components: {
    ButtonPrimary,
    ButtonSecondary,
    Buttonfile,
  },
  name: "validacionIdentidadComp",
  data() {
    return {
      data: [],
      frontsuccess: false,
      backsuccess: false,
      camara: null
    };
  },
  props: {
    EnableNextButton: { type: Boolean, default: true },
  },
  methods: {
    ...mapMutations(['DELETE_FOTO_CAMERA']),
    onClickFrontMobile() {
      this.$router.push({ name: 'scandni', params: { side: 'front' } });
    },
    onClickReverseMobile() {
      this.$router.push({ name: 'scandni', params: { side: 'back' } });
    },
    Loading(value) {
      this.$store.state.isLoading = value;
    },
    async onClickNextButton() {
      debugger;
      this.DELETE_FOTO_CAMERA()
      this.Loading(true)
      // console.log('onClickNextButton.this.data', this.data);

      const result = await userservice.validateidentification(this.data);
      // console.log(result)
      if (result.success) {
        dialogSuccess({ title: '¡Listo!', text: 'Tu identidad ha sido validada correctamente' });
        this.$router.push({ name: 'data' });
      }
      else {
        // dialogError(title = '¡Error!', text = 'Ocurrió un error al validar tu identidad'); 
        dialogError({
          title: "Error",
          text: "Ocurrió un error al validar tu identidad",
        });
      }

      this.Loading(false)
    },
    onClickCalcelButton() { },
    onChangeFileFront(e) {
      e.cellphone = this.store.cellphone;
      this.data.push(e);
      this.frontsuccess = true;
    },
    onChangeFileBack(e) {
      e.cellphone = this.store.cellphone;
      this.data.push(e);
      this.backsuccess = true;
    },
    validarfoto() {
      this.data = []
      if (this.getCamera.frontal && this.getCamera.frontal.filetype === 'front') {
        let frontal = this.getCamera.frontal
        frontal.cellphone = this.store.cellphone
        let setnew = true
        this.data.map(f => {
          if (f.filetype === 'front') {
            f = frontal
            setnew = false
          }
        })
        if (setnew) this.data.push(frontal);
        this.frontsuccess = true
      }
      if (this.getCamera.tracera && this.getCamera.tracera.filetype === 'back') {
        let tracera = this.getCamera.tracera
        tracera.cellphone = this.store.cellphone
        let setnew = true
        this.data.map(f => {
          if (f.filetype === 'back') {
            f = tracera
            setnew = false
          }
        })
        if (setnew) this.data.push(tracera);
        this.backsuccess = true
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapGetters(['getCamera']),
    isMobile() {
      return devicedetector();
    },
    store() {
      return this.$store.state;
    },
    activeButtonNext() {
      return false;
    },
    frontFileOk() {
      if (this.frontsuccess) {
        // return require("@/assets/checkcicle_icon.svg");
      }
      return null;
    },

    backFileOk() {
      if (this.backsuccess) {
        // return require("@/assets/checkcicle_icon.svg");
      }
      return null;
    },
    activeNextButton() {
      if (this.frontsuccess && this.backsuccess) {
        return false;
      }
      return true;
    },
  },
  async mounted() {
    this.scrollToTop();
    const aft = await antiforgery.get()
    this.store.requesttoken = aft;
    this.validarfoto()
  }
};
</script>
      
  
<style lang="scss" scoped>
.btnFrontMobile {
  text-transform: none;
  width: 280px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--primary-500, #379BEC);
 color:#ffffff;
}

.card {
  max-width: 288px;
  max-height: 330px;
  flex-shrink: 0;
  border-radius: 23px;
  border: 1px solid var(--secundarios-400, #E0E2E4);
  background: var(--secundarios-blanco, #FFF);
}

.iconsImage {
  width: 107px;
  height: 78px;
  flex-shrink: 0;
}

.btnContinuar {
  display: flex;
  width: 606px;
  padding: 24px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  background: var(--primary-300, #E3F1FC);

  color: var(--primary-500, #379BEC);

  /* Text/Large/Medium */
  font-family: Barlow;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.18px;
}

.frenteText {
  height: 40px;
  min-width: 172px;
  color: var(--secundarios-600, #000);
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.backText {
  color: var(--secundarios-400, #E0E2E4);
  text-align: center;

  /* Text/Regular/Regular */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 125% */
}

.salto {
  width: 100%;
  height: 20px;
  flex-shrink: 0;
}

.title {
  height: 40px;
  width: 301px;
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


.wrapper-container {
  background: #f8f8f8;
  width: 85%;
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

.main-container {
  background-image: url("@/assets/landingpage_main.svg");
  background-repeat: no-repeat;
  background-position: center top;
  min-height: 34em;
}
</style>