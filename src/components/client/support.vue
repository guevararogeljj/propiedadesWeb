<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#tab1">Elemento 1</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#tab2">Elemento 2</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#tab3">Elemento 3</a>
    </li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade show active" id="tab1">
      <h3>Contenido del elemento 1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="tab-pane fade" id="tab2">
      <h3>Contenido del elemento 2</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="tab-pane fade" id="tab3">
      <h3>Contenido del elemento 3</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
  <!-- <v-card color="primary3" class="card-style">
    <v-card-title style="text-align: center;">
      <span class="title">Te apoyamos en tu proceso de compra</span>
    </v-card-title>
    <v-tabs v-model="activeTab" align-tabs="center" background-color="primary">
      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" class="custom-tab">
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="activeTab" class="asesor-inmobiliario">
        <v-window-item class="card-text" v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.text }}
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card> -->
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
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  color: black;

}
</style>
