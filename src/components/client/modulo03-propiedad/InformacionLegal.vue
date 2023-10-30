<template>
    <div class="wrapper-section1 mt-3">
      <div class="m-3" v-if="ShowDesign">
        <p class="title-section1 fw-bold text-start">{{ TitleDesign }}</p>
        <p class="text-start content-section1">
          {{ DesignDescription }}
        </p>
      </div>
    </div>
  
    <div class="text-start wrapper" v-if="state.isLogin">
      <div class="m-3">
        <p class="fw-bold">Información Legal</p>
        <div class="">
          <p class="fw-bold font-size d-inline">Número de referencia:</p>
          <p class="font-size d-inline ms-1" :class="{ blur: !ShowInfo }">
            {{ NoCredito }}
          </p>
        </div>
        <div class="d-none">
          <p class="fw-bold font-size d-inline">Saldos:</p>
          <p class="font-size m-0" v-html="Saldos" :class="{ blur: !ShowInfo }"></p>
        </div>
        <div class="d-none">
          <p class="fw-bold font-size d-inline">Tipo de operación:</p>
          <p class="font-size d-inline ms-1" :class="{ blur: !ShowInfo }">
            {{ TipoOperacion }}
          </p>
        </div>
        <div class="d-none">
          <p class="fw-bold font-size d-inline">Extracto de dictamen legal:</p>
          <p class="font-size d-inline ms-1" :class="{ blur: !ShowInfo }">
            {{ DictamenLegal }}
          </p>
        </div>
        <div>
          <p class="fw-bold font-size d-inline">Estatus Jurídico:</p>
          <p class="font-size d-inline ms-1" :class="{ blur: !ShowInfo }">
            {{ EstatusJuridico }}
          </p>
        </div>
  
        <!-- <div>
          <button-secondary
                Text="Obtener Información"
                :OnClickButton="onClickMoreInfoButton"
                :disabled="activeNextButton"
              />
        </div> -->
  
  
      </div>
  
    </div>
  
    <div v-if="NDAProcessActive">
  
      <div class="invest_banner mt-5  " v-if="state.isLogin">
        <img src="@/assets/invest_banner.png" class="banner" alt="invertir" @click="onClickMoreInfoButton" />
      </div>
  
    </div>
    <div class="mt-5" v-if="!state.isLogin">
      <img src="@/assets/moreinfo_banner.jpg" class="banner" alt="mas info" @click="onClickBannerMoreInfo" />
    </div>
  </template>
  
  <script>
  //import ButtonSecondary from "../shared/components/ButtonSecondary.vue";
  
  export default {
    components: {
      //ButtonSecondary
    },
    props: {
      NDAProcessActive: { type: Boolean },
      ShowInfo: { type: Boolean },
      NoCredito: { type: String, default: "xxxxxxx" },
      Saldos: {
        type: String,
        default:
          "sdfasdfasdfdsfadfasdf df asdf adsfadsf sadf asdfasdfasdfadsfasdfadsfas dfadsf sdf",
      },
      TipoOperacion: { type: String, default: "xxxxxxx" },
      DictamenLegal: { type: String, default: "xxxxxxx" },
      EstatusJuridico: { type: String, default: "xxxxxxx" },
      OnCickBanner: { type: Function, default: null },
      OnClickInfoButton: { type: Function, default: null },
      TitleDesign: { type: String, default: "Diseño:" },
      DesignDescription: {
        type: String,
        default:
          "El apartamento consta de un gran salón, que está conectado con la cocina y el comedor. En esta parte del apartamento también hay un estudio, que está muy sutilmente separado de la sala de estar por una elegante pared de vidrio y vigas de madera. Desde el salón hay una transición suave a las habitaciones, un armario, un baño compartido y un dormitorio principal con baño separado.",
      },
      ShowDesign: { tyoe: Boolean, default: false },
    },
    methods: {
      onClickBannerMoreInfo() {
        if (this.OnCickBanner != null) {
          this.OnCickBanner();
        }
      },
      onClickMoreInfoButton() {
        if (this.OnClickInfoButton != null) {
          this.OnClickInfoButton();
        }
      }
    },
    computed: {
      state() {
        return this.$store.state;
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .font-size {
    font-size: 0.8em;
  }
  
  .wrapper {
    min-height: 15.125em;
    max-width: 20.5em;
    border: 1px solid #0092bc;
    border-radius: 4px;
  }
  
  .wrapper-disenio {
    background: #f8f8f8;
    border-radius: 4px;
    min-height: 20em;
  }
  
  .title-section1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
  
    letter-spacing: 0.15px;
  
    /* Grayscale/Main_Text */
  
    color: #63666a;
  }
  
  .content-section1 {
    font-size: 0.9em;
    max-width: 20.5em;
  }
  
  .banner {
    cursor: pointer;
  }
  
  .blur {
    color: transparent;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
  }
  
  .invest_banner {
    max-width: 20.5em;
  }
  
  
  @media only screen and (max-width: 900px) {
    .invest_banner {
      max-width: 100%;
  
    }
  }
  </style>