<template>
  
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">

  

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
