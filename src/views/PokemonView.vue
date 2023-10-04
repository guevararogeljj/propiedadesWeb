<template>
  <h1>Pokemon</h1>
  <router-link to="/">Home</router-link>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { dialogSuccess } from "@/core/alerts";
const pokemon = ref([]);
const getPokemon = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    pokemon.value = response.data.results;
    console.log(pokemon.value);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getPokemon();
  dialogSuccess({
    title: "",
    text: "pokemones cargados",
  });
});
</script>

<style></style>
