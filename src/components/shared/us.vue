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
          <video style="width: 929.875px; height: 525.99px; flex-shrink: 0;" controls>
            <source src="https://finastrategy.mx/wp-content/uploads/2023/09/Capsula%2001_Nosotros.mp4" type="video/mp4">
          </video>
        </div>
      </v-col>
    </v-row>
    <div class="containerus  center">
      <div class="left-div">
      </div>
      <div class="right-div">
        <label class="h4" color="primary">Invierte hoy en tu patrimonio</label>
        <br>
        <label class="h1" style="width: 505px; height: 159px; justify-items: end;" color="primary">Tu oportunidad de
          encontrar tu lugar soñado está aquí </label>
        <br>
        <ButtonSecondary color="primary5" class="btn" @click="ToCatalog()" Text="Ver propiedades" width="324px" />
      </div>
    </div>
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
.containerus {
  display: flex;
  width: 1242px;
}

.left-div {
  flex: 1;
  background-image: url("@/assets/persona-feliz-compra.png");
  width: 705px;
  height: 471px;
  background-position: right;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* Agrega aquí otros estilos para el div de la izquierda */
}

.right-div {
  flex: 1;
  background-color: #379BEC;
  color: white;
  align-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 20px;
  /* Agrega aquí otros estilos para el div de la derecha */
}

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
  width: 705px;
  height: 471px;
  background-position: right top;

}

.btn {
  display: flex;
  width: 394px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

  .left-div {
  display: none;
    /* Agrega aquí otros estilos para el div de la izquierda */
  }

  .right-div {
    display: flex;
    flex: 1;
    background-color: #379BEC;
    color: white;
    align-content: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-left: 20px;
    /* Agrega aquí otros estilos para el div de la derecha */
  }

  .containerus {
    display: flex;
    width: 600px;
  }
}

.center {
  margin: auto;
  padding: 10px;
}

@media only screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) {

  .banner {
    background-image: url("@/assets/nosotros-banner-finastrategy-0 5.png");
    width: 800px;
    height: 350px;
    position: relative;
    z-index: 1;
  }
}
</style>
    