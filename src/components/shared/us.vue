<template>
  <div class="content">
    <br>
    <div class="banner center"></div>
    <br>
    <label class="h1 textCenter">¿Que hacemos por ti?</label>
    <label class="textCenter">Nos especializamos en brindar valor diferenciado en nuestra cartera ya que compartimos tu
      compromiso de mantener las relaciones de negocios ágiles y profesionales.</label>
    <br>
    <FindOportunity />
    <br>
    <label class="textCenter">Nuestro enfoque es poner a tu disposición la información completa y actualizada de miles de
      propiedades en México,
      en un solo click. Tenemos un profundo conocimiento del mercado y un extraordinario servicio al cliente</label>
    <br>
    <v-row>
      <v-col cols="12">
        <div style="text-align: center;">
          <video style="width: 100%; height: auto;" controls>
            <source src="https://finastrategy.mx/wp-content/uploads/2023/09/Capsula%2001_Nosotros.mp4" type="video/mp4">
          </video>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <div class="bannerHappy center"></div>
      </v-col>
      <v-col cols="12" md="4" class="center"> <!-- Columna derecha -->
        <label class="textCenter h4" color="primary">Invierte hoy en tu patrimonio</label>
        <br>
        <label class="textCenter h1" color="primary">Tu oportunidad de encontrar tu lugar soñado está aquí </label>
        <br>
        <ButtonSecondary color="primary3"  @click="ToCatalog()" Text="Ver propiedades" width="324px"  />
      </v-col>
    </v-row>
    <v-row>
      <Contact class="center" />
    </v-row>
  </div>
</template>
<script>
import json from "@/assets/json/preguntas_frecuentes.json";
import FindOportunity from '@/components/client/findOportunity.vue';
import Contact from "./Contact.vue";
import ButtonSecondary from "../common/ButtonSecondary.vue";
export default {
  data() {
    return {
      colors: ["#EAECEE", "#EAECEE"],
      preguntasRespuestas: [],
      videoUrl: "https://example.com/video.mp4",
    };
  },
  components: {
    FindOportunity,
    Contact,
    ButtonSecondary
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
    ToCatalog() {
      this.$router.push("/propiedades");
    },
  },
};
</script>
<style scoped>
.textCenter {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

}

.center {
  margin: auto;
  padding: 10px;
}

.banner {
  background-image: url("@/assets/nosotros-banner-finastrategy-0 5.png");
  width: 1242px;
  height: 350px;
  position: relative;
  z-index: 1;
}

.bannerHappy {
  background-image: url("@/assets/persona-feliz-compra.png");
  width: 610px;
  height: 407px;
  position: relative;
  z-index: 1;
}

@media (max-width: 767px) {
  .banner {
    background-image: none;
    display: none;
  }
  .bannerHappy {
    background-image: none;
    display: none;
  }
}

.center {
  margin: auto;
  padding: 10px;
}


.WordSection1 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
    