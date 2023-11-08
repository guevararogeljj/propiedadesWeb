<template>
  <v-card color="primary">
    <v-card-title style="text-align: center;">

      <span class="title">Te apoyamos en tu proceso de compra</span>
    </v-card-title>
  <v-tabs v-model="activeTab"  align-tabs="center">
    <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
      {{ tab.title }}
    </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="activeTab">
        <v-window-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
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
