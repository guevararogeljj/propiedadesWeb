<template>
  <v-card color="primary3" class="card-style">
    <br/>
    <v-card-title style="text-align: center;">
      <span class="title">Te apoyamos en tu proceso de compra</span>
    </v-card-title>
    <v-card-item>
      <br/>
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" selected-class="v-tab--active">
        <p class="custom-tab"> {{ tab.title }}</p>
      </v-tab>
    </v-tabs>
  </v-card-item>
    <v-card-text>
      <v-window v-model="activeTab" class="asesor-inmobiliario">
        <v-window-item class="card-text" v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.text }}
        </v-window-item>
      </v-window>
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
  mounted() {
    this.tabs = jsonSupport.tabs;
  },
};


</script>
<style scoped>
.title {
  width: 300px;
  height: 106px;
  flex-shrink: 0;
  color: var(--secundarios-blanco, #FFF);

  /* Heading/Large1 */
  font-family: Barlow;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 52.83px;
  /* 110.063% */
  letter-spacing: -1.44px;
}

.v-tab--active .custom-tab {
  width: 228px;
  border-radius: 40px;
  background: var(--secundarios-blanco, #FFF);
  color: var(--primary-500, #379BEC);

}

.v-tab {
  /* color: rgba(255, 255, 255, 0.50); */
  font-family: Barlow;
  font-size: 20px;
  /* 130% */
  letter-spacing: -0.4px;
}

.v-tab:hover {
  color: rgba(255, 255, 255, 0.50);
  font-family: Barlow;
  letter-spacing: -0.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.4px;
  border-radius: 10px;
}

.card-text {
  text-align: justify;
  width: 70%;
}

.card-style {
  border-radius: 30px;
}

.asesor-inmobiliario {
  background-image: url("@/assets/asesor-inmobiliario.png");
  height: 586px;
  background-position: right center;
  background-repeat: no-repeat;
  background-color: transparent;
  border-color: transparent;
}

@media (max-width: 767px) {
  .asesor-inmobiliario {
    background-image: url("@/assets/asesor-inmobiliario-2 1.png");
    /* height: 459px; */
    background-position: bottom;
    background-repeat: no-repeat;
    background-color: transparent;
    border-color: transparent;
    width: auto;
  }

  .card-style {
    border-radius: 0px;
  }

  .card-text {
    text-align: center justify;
    width: 100%;

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
}
</style>
