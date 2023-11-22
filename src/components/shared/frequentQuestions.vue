<template>
  <div class="content">
    <br>
    <v-row>
      <span class="h1 color-black center"> Preguntas Frecuentes</span>&nbsp;
      <!-- <h1 class="center">Preguntas Frecuentes</h1> -->
    </v-row>
    <br>
    <v-col cols="12">
      <div>
        <v-expansion-panels>
          <v-expansion-panel v-for="item in preguntasRespuestas" :key="item" :title="item.pregunta"
            :text="item.respuesta"></v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
  </div>
</template>
<script>
import json from '@/assets/json/preguntas_frecuentes.json'
export default {
  data() {
    return {
      colors: [
        '#EAECEE',
        '#EAECEE',
      ],
      preguntasRespuestas: [],
    }
  },
  mounted() {
    this.scrollToTop();
    this.cargarPreguntasRespuestas();

  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    cargarPreguntasRespuestas() {

      this.preguntasRespuestas = json.preguntas_respuestas || [];

    },
  },
}
</script>
<style scoped>
.center {
  margin: auto;
  padding: 10px;
}
</style>
  