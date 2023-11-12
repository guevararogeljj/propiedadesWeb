<template>
  <div class="content">
    <br />
    <v-row>
      <h1 class="center">Nosotros</h1>
    </v-row>
    <br />
    <v-row class="body">
    <div class="banner"></div>
    </v-row>
    <!-- <v-row>
      <v-col cols="12">
        <div style="text-align: center;">
          <video style="width: 100%; height: auto;" controls>
            <source src="https://finastrategy.mx/wp-content/uploads/2023/09/Capsula%2001_Nosotros.mp4" type="video/mp4">
          </video>
        </div>
      </v-col>
    </v-row> -->
    <br />
    <!-- <v-col cols="12">
      <div class=WordSection1>

        <p class=MsoNormal>Somos una administradora de cartera que conecta el mundo de
          los bienes raíces con las finanzas.<br>
          <br>
          Nos especializamos en brindar valor diferenciado en nuestra cartera ya que
          compartimos tu compromiso de mantener las relaciones de negocios ágiles y
          profesionales. <br>
          <br>
          Nuestro enfoque es poner a tu disposición la información completa y actualizada
          de miles de propiedades en México, en un solo click. Tenemos un profundo
          conocimiento del mercado y un extraordinario servicio al cliente
        </p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal><span style='font-size:18.0pt'>Qué hacemos por ti</span>
          <o:p></o:p>
        </p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal>Cesión de derechos de crédito y litigiosos</p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal style="text-align:justify">Es un contrato por el cual la parte cedente enajena su
          derecho legalmente cedible en favor de otra persona denominada cesionario, para
          que éste lo ejerza en su propio nombre. La cesión es siempre un acto jurídico
          inter-vivos, por lo que para perfeccionarse se requiere que sea a través de
          escritura pública.</p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal><span style='font-size:18.0pt'>Compraventa</span>
          <o:p></o:p>
        </p>

        <p class=MsoNormal><span style='font-size:18.0pt'>
            <o:p>&nbsp;</o:p>
          </span></p>

        <p class=MsoNormal>Es un contrato por el cual los contratantes se obligan a
          transmitir la propiedad de un bien determinado y la otra parte se obliga a
          pagar por ella un precio cierto.</p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal>
          <o:p>&nbsp;</o:p>
        </p>

        <p class=MsoNormal align=center style='text-align:center'><span style='font-size:18.0pt'>En Finastrategy
            realizamos desde el proceso de
            licitación pública o privada<br>
            hasta la determinación de un precio de compra.</span>
          <o:p></o:p>
        </p>

      </div>
    </v-col> -->
  </div>
</template>
<script>
import json from "@/assets/json/preguntas_frecuentes.json";
import VueVideoPlayer from "vue-video-player";
export default {
  data() {
    return {
      colors: ["#EAECEE", "#EAECEE"],
      preguntasRespuestas: [],
      videoUrl: "https://example.com/video.mp4",
    };
  },
  components: {
    VueVideoPlayer,
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
};
</script>
<style scoped>
.body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.banner {
  background-image: url("@/assets/nosotros-banner-finastrategy-0 5.png");
  background-size: 1242px 350px;
      width: 1242px;
      height: 350px;
      position: relative;
      z-index: 1; 
}

.center {
  margin: auto;
  padding: 10px;
}

.WordSection1 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}</style>
    