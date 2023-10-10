<template>
  <buscador-light class="buscador-light ms-5 me-5" TitleText="Texto ancla" :OnClickBuscar="onClickBuscar" />
  <v-row align="center" justify="center">
    <h1>Encuentra la oportunidad de inversión a tu medida</h1>
  </v-row>
  <v-row align="center" justify="center">
    <v-col v-for="(variant, i) in variants" :key="i" cols="auto">
      <v-card class="mx-auto" max-width="344" :color="color" :variant="variant">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              {{ variant }}
            </div>
            <div class="text-h6 mb-1">
              Headline
            </div>
            <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-btn>
            Button
          </v-btn>
        </v-card-actions>
      </v-card>
      ssdsd
    </v-col>
  </v-row>
  <br>
  <br>
  <support />

  <modal :visible="showModal" Title="Ya te escuchamos." :OnCloseTittleButton="onCloseModal">
    {{ messageContact }}
  </modal>
</template>

<script>
import BuscadorLight from "@/components/client/finderLight.vue";
import Contact from "@/components/shared/Contact.vue";
import TitleDescription from "@/components/shared/TitleDescription.vue";
import modal from "@/components/common/Modal2.vue";
import antiforgery from "@/core/services/antiforgery";
import contservice from "@/core/services/contservice";


import { ref } from 'vue';
import Support from '@/components/client/support.vue';
export default {
  components: { BuscadorLight, TitleDescription, Contact, modal, Support },
  name: "Home",
  data() {
    return {
      showModal: false,
      messageContact: "",
      variants: ['elevated', 'flat'],
      color: 'indigo',
    };
  },
  methods: {
    Loading(value) {
      return (this.$store.state.isLoading = value);
    },
    onCloseModal() {
      this.showModal = false;
    },
    async onClickContactSend(data) {
      this.Loading(true);
      const result = await contservice.send(data);
      this.messageContact = result.message;
      this.showModal = true;
      this.Loading(false);
    },
    moveScrollToSecction(val) {
      if (val) {
        let element = null;
        if (this.isMovil) element = document.getElementById(val);
        else element = document.getElementsByClassName(val)[0];
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    onClickBuscar(params) {
      if (params.estado != "" || params.tipoInmueble != "") {
        this.$router.push({
          name: "properties",
          query: { state: params.estado, type: params.tipoInmueble },
        });
      }
    },
  },
  computed: {
    landpageSection() {
      return this.$route.params.section;
    },
    state() {
      return this.$store.state;
    },
    isMovil() {
      const touchDevice = "ontouchstart" in document.documentElement;
      // console.log('touchDevice', touchDevice);
      return touchDevice;
    },
  },
  watch: {
    landpageSection(val) {
      // console.log(this.landpageSection);
      this.moveScrollToSecction(val);
    },
  },
  async mounted() {
    const aft = await antiforgery.get();
    this.state.requesttoken = aft;
    if (this.$route.params.section) {
      this.moveScrollToSecction(this.$route.params.section);
    }
  },
};
</script>

<style scope lang="scss">
.title {
  font-weight: 400;
  font-size: 3.2rem;
  line-height: 3.3rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  color: #63666a;
}

.title-description {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
  letter-spacing: 0.1rem;
  color: #63666a;
}

.image-content {
  // background-image: url("@/assets/landingpage_main.svg");
  background-repeat: no-repeat;
  background-position: right center;
  min-height: 34em;
}

.title-about {
  font-weight: 500;
  font-size: 3rem;
  line-height: 48px;

  display: flex;
  align-items: center;

  color: #484343;
}

.description-about {
  max-width: 35em;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;

  display: flex;
  align-items: center;
  letter-spacing: 0.15px;

  /* Grayscale/finastrategy_Dark_Gray */

  color: #484343;
}

.description-blue {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 3rem;
  line-height: 1.5em;
  letter-spacing: -0.011em;

  color: #0092bc;
}

.landing-image {
  background-image: url("@/assets/landingpage_main.svg");
  background-repeat: no-repeat;
  background-position: right center;
  min-height: 34rem;
  margin-top: 3rem !important;
}

.image-about {
  width: 100%;
}

.bg-about {
  background: #f8f8f8;
}

.container-mobile {
  display: none;
}

@media only screen and (max-width: 1850px) {
  .landing-image {
    background-image: url("@/assets/landingpage_main.svg");
    background-repeat: no-repeat;
    background-position: right center;
    min-height: 50rem;
    margin-top: -2rem !important;
    margin: -4%;
  }

  .title-about {
    font-weight: 500;
    font-size: 3rem;
    line-height: 48px;

    display: flex;
    align-items: center;

    color: #484343;
    margin-top: -10%;
  }
}

@media only screen and (max-width: 900px) {
  .casa {
    margin: 10%;
    margin-top: -1rem !important;
  }

  .title {
    font-weight: 500;
    font-size: 3rem;
    line-height: 40px;

    display: flex;
    align-items: center;
    letter-spacing: 0.25px;

    color: #484343;
  }

  .title-description {
    font-weight: 400;
    font-size: 1rem;
    line-height: 20px;

    display: flex;
    align-items: center;
    letter-spacing: 0.25px;

    color: #484343;
  }

  .title-about {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 32px;
    /* or 133% */

    display: flex;
    align-items: center;

    /* Grayscale/finastrategy_Dark_Gray */

    color: #484343;
  }

  .description-about {
    margin-left: 1rem;
    margin-top: 1rem;

    font-weight: 400;
    font-size: 1rem;
    line-height: 20px;
    /* or 143% */

    letter-spacing: 0.25px;

    color: #484343;
  }

  .description-blue {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 28px;

    letter-spacing: 0.15px;

    color: #0098c9;
  }

  .container-mobile {
    display: block;
  }

  .landing-image {
    background-image: none;
    background-repeat: no-repeat;
    background-position: right center;
    min-height: 34rem;
    margin-top: 0rem !important;
  }

  .landing-image-mobile {
    background-image: url("@/assets/landpage_main_mobile.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 25rem;
  }
}
</style>
