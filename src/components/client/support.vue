<template>
  <v-card color="primary3" >
    <v-card-title style="text-align: center;">
      <span class="title">Te apoyamos en tu proceso de compra</span>
    </v-card-title>
  <v-tabs v-model="activeTab"  align-tabs="center">
    <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
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
.card-text{
  text-align: justify;
  width: 70%;

}
.asesor-inmobiliario{
  background-image: url("@/assets/asesor-inmobiliario.png");
  height: 586px;
  background-position: right center;
  background-repeat: no-repeat;
  background-color: transparent;
  border-color: transparent;
}
</style>
