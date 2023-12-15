<template>
      <v-container>
  <div class="content">
    <button-back></button-back>
    <br>
    <v-row>
      <h1 class="titulo"> Preguntas Frecuentes</h1>
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
</v-container>
</template>
<script>
import ButtonBack from '@/components/common/ButtonBack.vue'
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
  components: {
    ButtonBack,
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

.titulo {
  color: var(--Secundarios-600, #000);

  /* Heading/Large1 */
  font-family: Barlow;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 52.83px;
  /* 110.063% */
  letter-spacing: -1.44px;
}
.center {
  margin: auto;
  padding: 10px;
}
</style>
  