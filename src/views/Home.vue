<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to home</div>
      <h1 class="text-h2 font-weight-bold">Vuetify</h1>
      <router-link to="/about">About</router-link>
      <br>
      <router-link to="/pokemon">Pokemon</router-link>
    </v-responsive>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
</script>
