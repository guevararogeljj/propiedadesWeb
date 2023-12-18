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
          <!-- <v-expansion-panels>
          <v-expansion-panel v-for="item in preguntasRespuestas" :key="item" :title="item.pregunta"
            :text="item.respuesta"></v-expansion-panel>
        </v-expansion-panels> -->
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Cuáles son las formas de invertir en bienes inmuebles?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-circle-small</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Compra de Cesión de Derechos (Cobro, Crédito y Litigiosos)
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-circle-small</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Remates Hipotecarios (Derechos Adjudicatarios)
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-circle-small</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Compraventa de Inmuebles ad corpus.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Cuáles son los tipos de Cesión de Derechos?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      a)&nbsp; De Crédito. Aplica para aquellos asuntos que aún no se encuentran en un proceso judicial.
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      b)&nbsp; Litigiosos. Aplica para aquellos asuntos que se encuentran en un proceso judicial antes de
                      un remate.
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      c)&nbsp; Adjudicatarios. Aplica para aquellos juicios que ya cuentan con un Remate Firme sin
                      escrituración.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Qué es un remate hipotecario?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      Es una forma de comprar derechos litigiosos de adjudicación, los cuales fueron originados en un proceso de ejecución judicial a causa del incumplimiento de pago de una persona que contrató un crédito hipotecario y no pudo pagarlo a su acreedor.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Por qué invertir en un remate hipotecario?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      Porque es una excelente opción para adquirir los derechos de un inmueble adjudicado a un mejor valor de la propiedad, ya que comprando a través  de este instrumento se obtiene una plusvalía inmediata.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Cuánto tiempo puede llevar la resolución de un juicio?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      Dependiendo de la etapa legal en la que se encuentre el asunto como: Presentación de Demanda, Sentencia, Remate, Escrituración y Toma de Posesión, lo cual puede llevar un plazo de 6 a 12 meses, entre más avanzado esté el proceso más corto es el plazo.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Es recomendable que la Cesión se instrumente ante Notario Público?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      Si, ya que este fungirá como testigo y mediador de toda esa transmisión de derechos entre el CEDENTE y el CESIONARIO dando fe de que la transacción fue realizada bajo todos los requerimientos y condiciones otorgadas por la ley, así mismo él redactará un documento que describa las condiciones del acto jurídico.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Qué ventajas tiene el invertir con nosotros?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                    <v-list-item-content>
                      - Somos una Administradora líder a nivel nacional.
                    </v-list-item-content>
                </v-list>
                <v-list>
                  <v-list-item-content>
                      - Contamos con inmuebles en toda la República Méxicana.
                    </v-list-item-content>
                </v-list>
                <v-list>
                  <v-list-item-content>
                      - Precios muy competitivos.
                    </v-list-item-content>
                </v-list>
                <v-list>
                  <v-list-item-content>
                      - Agilidad y seguridad en la instrumentación de sus operaciones.
                    </v-list-item-content>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="titulopanel">
                ¿Qué tengo que hacer si estoy interesado en adquirir un inmueble mediante Cesión?
              </v-expansion-panel-title>
              <v-expansion-panel-text class="textopanel">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      A través de nuestra página podrás encontrar el espacio de Contacto, donde podrás dejarnos tus datos y un ejecutivo se pondrá en contacto contigo.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
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

.titulopanel {
  color: var(--Secundarios-600, #000);

  /* Text/Large/Medium */
  font-family: Barlow;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.18px;
}

.textopanel {
  width: auto;
  max-width: 753px;
  text-align: justify;
  flex-shrink: 0;
  color: #000;

  /* Text/Small/Regular */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 142.857% */
  letter-spacing: -0.14px;
}</style>
  