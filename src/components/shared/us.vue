<template>
  <div class="content">
    <br>
    <div class="banner center"></div>
    <br>
    <label class="h1 textCenter salto">¿Qué hacemos por ti?</label>
    <label class="textCenter">Nos especializamos en brindar valor diferenciado en nuestra cartera ya que compartimos tu
      compromiso de mantener las relaciones de negocios ágiles y profesionales.</label>
    <div class="salto"></div>
    <FindOportunity />
    <br>
    <v-row>
      <v-col align="center">
    <span class="enfoque">Nuestro enfoque es poner a tu disposición la información completa y actualizada de miles de
      propiedades en México,
      en un solo click. Tenemos un profundo conocimiento del mercado y un extraordinario servicio al cliente</span> 
    </v-col>
    </v-row>
    <br>
    <v-row>
      <v-col cols="12">
        <div style="text-align: center;">
          <video class="video" controls>
            <source src="https://finastrategy.mx/wp-content/uploads/2023/09/Capsula%2001_Nosotros.mp4" type="video/mp4">
          </video>
        </div>
        <div class="salto"></div>
        <div class="merchant center" style="text-align: center;">
          <br />
          <span class="merchantText">Tenemos un profundo conocimiento del mercado y un extraordinario servicio al
            cliente</span>
        </div>
      </v-col>
    </v-row>

    <div class="containerus  center">
      <div class="left-div">
      </div>
      <div class="right-div">
        <br>
        <br>
        <br>
        <label class="invierte">Invierte hoy en tu patrimonio</label>
        <br>
        <br>
        <label class="oportunidad">Tu oportunidad de
          encontrar tu lugar soñado está aquí </label>
        <br>
        <br>
        <ButtonSecondary class="btnText" flat @click="ToCatalog()" Text="Ver propiedades" width="324px" />
      </div>
    </div>


    <v-col align="center">
      <div class="mobile">
        <div class="bannerHappy"></div>
        <div class="contentHappy">
          <p class="title center">
            Invierte hoy en tu patrimonio
          </p>
          <p class="subtitle center">
            Tu oportunidad de encontrar tu lugar soñado está aquí
          </p>

          <p>
            <v-btn variant="flat" class="btnColor">
              <span class="btnText" flat @click="ToCatalog()">Ver propiedades</span>
            </v-btn>
          </p>
          <br />
        </div>



      </div>
    </v-col>

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
.oportunidad{
  color: var(--Secundarios-Blanco, #FFF);

/* Heading/Large1 */
font-family: Barlow;
font-size: 48px;
font-style: normal;
font-weight: 500;
line-height: 52.83px; /* 110.063% */
letter-spacing: -1.44px;
}
.enfoque{
  margin:auto;
  max-width: 1030px;
height: 59px;
flex-shrink: 0;
color: var(--Secundarios-600, #000);
text-align: center;

/* Text/Large/Medium */
font-family: Barlow;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.18px;
}
 .salto {
   width: 100%;
   height: 100px;
   flex-shrink: 0;
 }
.contentHappy {

  width: 320px;

  flex-shrink: 0;
  border-radius: 26px;
  background-color: var(--primary-500, #379BEC);
}

.salto {
  width: 100%;
  height: 100px;
  flex-shrink: 0;
}

.merchant {
  display: none;
  width: 320px;
  height: 156px;
  flex-shrink: 0;
  border-radius: 26px;
  background: var(--primary-300, #E3F1FC);
}

.merchantText {
  display: none;
  width: 252px;
  height: 107px;
  flex-shrink: 0;
  color: var(--primary-500, #379BEC);
  text-align: center;
  justify-content: center;
  /* Heading/Medium 2 */
  font-family: Barlow;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  /* 120% */
  letter-spacing: -0.4px;
}

.video {
  width: 929.875px;
  height: 525.99px;
  flex-shrink: 0;
}

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
  border-top-left-radius: 26px;
  border-bottom-left-radius: 26px;
  /* Agrega aquí otros estilos para el div de la izquierda */
}

.right-div {
  flex: 1;
  background-color: #379BEC;
  color: white;
  align-content: center;
  border-top-right-radius: 26px;
  border-bottom-right-radius: 26px;
  padding-left: 20px;
  /* Agrega aquí otros estilos para el div de la derecha */
}

.textCenter {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  color: var(--Secundarios-600, #000);
text-align: center;

/* Text/Large/Medium */
font-family: Barlow;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.18px;
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

.btn {
  display: flex;
  width: 394px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--primary-300, #E3F1FC);


}

.btnColor {
  color: var(--primary-500, #379BEC);
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.btnText {
  text-transform: none;
  color: var(--primary-500, #379BEC);
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.center {
  margin: auto;
  padding: 10px;
}

.mobile {
  display: none;
}

@media screen and (orientation: portrait) and (max-width: 767px) {

  .mobile {
    display: contents;
    width: 320px;
    height: 733px;
    flex-shrink: 0;
  }

  .bannerHappy {
    background-image: url("@/assets/persona-feliz-compra-mobile.png");
    width: 320px;
    height: 335.094px;
    background-position: center;
  }

  .contentHappy {
    margin-top: -1px;
    justify-items: center;
    flex-shrink: 0;
    padding: -10px;
    border-top-left-radius: 0%;
    border-top-right-radius: 0%;
    border-bottom-left-radius: 26px;
    border-bottom-right-radius: 26px;
    background-color: var(--primary-500, #379BEC);
  }

  .merchant {
    display: flex;
    width: 320px;
    height: 156px;
    flex-shrink: 0;
    border-radius: 26px;
    background: var(--primary-300, #E3F1FC);
  }

  .merchantText {
    display: flex;
    width: 252px;
    height: 107px;
    flex-shrink: 0;
    color: var(--primary-500, #379BEC);
    text-align: center;
    justify-content: center;
    /* Heading/Medium 2 */
    font-family: Barlow;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    /* 120% */
    letter-spacing: -0.4px;
  }

  .video {
    width: 365px;
    height: 207px;
    flex-shrink: 0;
  }

  .banner {
    background-image: url("@/assets/nosotros-banner-mobile-550-2 1.png");
    width: 360px;
    height: 618px;
    flex-shrink: 0;
  }

  .left-div {
    display: none;
    /* Agrega aquí otros estilos para el div de la izquierda */
  }

  .right-div {
    display: none;
    /* Agrega aquí otros estilos para el div de la derecha */
  }

  .title {
    color: var(--primary-300, #E3F1FC);
    /* Heading/Medium 3 Mb */
    font-family: Barlow;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.44px;
  }

  .subtitle {
    color: var(--secundarios-blanco, #FFF);
    text-align: center;
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: -1.2px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .merchant {
    display: none;

  }

  .merchantText {
    display: none;

  }

  .containerus {
    display: flex;
  }
}</style>
    