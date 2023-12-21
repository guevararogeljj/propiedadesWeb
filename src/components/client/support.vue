<template>
  <v-card color="primary3" class="card-style">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="subtitle">¿Cómo comienzo?</div>
          <br />
          <div class="title">Te asesoramos en tu proceso de compra</div>
          <br />
          <div class="subtitle2">Contáctanos y un asesor se comunicará contigo a la brevedad</div>
          <br />
          <v-btn flat class="btnContactar" @click="scrollbutton()">Comenzar ahora</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <div class="asesor-inmobiliario"></div>
        </v-col>
      </v-row>

      <!-- <v-window v-model="activeTab" class="asesor-inmobiliario">
        <v-window-item class="card-text" v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.text }}
        </v-window-item>
      </v-window> -->
    </v-card-text>
  </v-card>
</template>

<script>
import jsonSupport from "@/assets/json/apoyos.json";

export default {
  data() {
    return {
      activeTab: null,
      tabs: [],
    };
  },
  methods: {
    scrollbutton() {
      window.scrollTo({
        top: 2500,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.tabs = jsonSupport.tabs;
  },
};


</script>
<style scoped>
.subtitle2 {
  width: auto;
  max-width: 576px;
  height: 33px;
  flex-shrink: 0;
  color: var(--Secundarios-Blanco, #FFF);

  /* Text/Large/Medium */
  font-family: Barlow;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.18px;
}

.btnContactar {
  text-transform: none;
  height: 56px;
  display: flex;
  width: 285px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--Primary-300, #E3F1FC);
  color: var(--Primary-500, #379BEC);
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
  margin-left: 80px;
}

.subtitle {
  color: #FFF;
  /* Heading/Semibold 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  /* 100% */
  letter-spacing: -0.5px;
  text-align: left;
}

.title {
  text-indent: 20px;
  width: auto;
  max-width: 810px;
  height: 106px;
  flex-shrink: 0;
  color: var(--Secundarios-Blanco, #FFF);

  white-space: pre-wrap;
  /* Heading/Large1 */
  font-family: Barlow;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 52.83px;
  /* 110.063% */
  letter-spacing: -1.44px;
}


.card-style {
  justify-content: center;
  height: auto;
  min-height: 470px;
  flex-shrink: 0;
  border-radius: 30px;
  background: var(--Primary-500, #379BEC);
}

.asesor-inmobiliario {
  background-image: url("@/assets/asesor-inmobiliario.png");
  max-width: 619px;
  height: 461px;
  flex-shrink: 0;
  background-position: right top;
  background-repeat: no-repeat;
  background-color: transparent;
  border-color: transparent;

}

@media only screen and (orientation: landscape) and (min-device-width: 320px) and (max-device-width: 480px) {
  .card-style {
    justify-content: center;

    height: 470px;
    flex-shrink: 0;
    border-radius: 30px;
    background: var(red);
  }

  .asesor-inmobiliario {
    background-image: url("@/assets/asesor-inmobiliario-2 1.png");
    /* height: 459px; */

    background-repeat: no-repeat;
    background-color: transparent;
    border-color: transparent;
    width: auto;
  }
}

@media (max-width: 767px) {
  .asesor-inmobiliario {
    background-image: url("@/assets/asesor-inmobiliario-2 1.png");
    /* height: 459px; */
    background-position: center;
    background-repeat: no-repeat;
    background-color: transparent;
    border-color: transparent;
    width: auto;
  }

  .card-style {
    height: 770px;
    flex-shrink: 0;
    border-radius: 30px;
  }


  .subtitle2 {
    min-width: 272px;
    height: 79px;
    flex-shrink: 0;
    color: var(--Secundarios-Blanco, #FFF);
    text-align: center;

    /* Text/Large/Medium */
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.18px;
  }

  .btnContactar {
    text-transform: none;
    margin: auto;
    min-width: 236px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .subtitle {
    color: var(--Primary-300, #E3F1FC);
    text-align: center;
    /* Heading/Semibold 1 */
    font-family: Barlow;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: 25px;
    /* 100% */
    letter-spacing: -0.5px;
  }

  .title {
    min-width: 298px;
    color: var(--Secundarios-Blanco, #FFF);
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

}

.custom-tab {
  height: 50px;
  text-transform: capitalize;
  border-radius: 40px;
  color: white;
  font-family: Barlow;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;
}</style>
