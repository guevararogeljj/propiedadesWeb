<template>
  <v-container>
    <v-alert v-model="alert" border="start" variant="elevated" closable close-label="Close Alert" color="alert3"
      class="my-alert">
      <label class="h7">Te invitamos a conocer nuestros</label>
      <router-link to="/termsAndConditions" class="h7"> Términos y condiciones</router-link>
      <router-link to="/privacyPolicy" class="h7"> y Política de privacidad</router-link>
    </v-alert>

    <v-skeleton-loader v-if="this.isLoading" class="mx-auto" type="image"></v-skeleton-loader>
    <div v-else>
      <finder :OnClickBuscar="onClickBuscar" :isTipoInmueble="true" :isEstado="true" :isMunicipio="true"
        MainText="Invierte hoy en propiedades" MinorText="de oportunidad" :changeBtn="true"  :is-backgroud="true"/>
      <div class="salto"></div>
      <find-oportunity />
      <div class="salto"></div>
      <support />
      <div class="salto"></div>
      <oportunity />
      <div class="salto"></div>
      <Contact />
      <div class="salto"></div>
    </div>
  </v-container>
</template>

<script>
import BuscadorLight from "@/components/client/finderLight.vue";
import TitleDescription from "@/components/shared/TitleDescription.vue";
import antiforgery from "@/core/services/antiforgery";
import contservice from "@/core/services/contservice";
import oportunity from "@/components/client/oportunity.vue";
import Support from "@/components/client/support.vue";
import Contact from "@/components/shared/Contact.vue"
import FindOportunity from '@/components/client/findOportunity.vue';
import finder from "@/components/client/finder.vue";
export default {
  components: {
    BuscadorLight,
    TitleDescription,
    Contact,
    Support,
    oportunity,
    FindOportunity,
    finder
  },
  name: "Home",
  data() {
    return {
      showModal: false,
      messageContact: "",
      variants: ["elevated", "flat"],
      color: "indigo",
      isLoading: false,
      alert: true,
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
          // query: { state: params.estado, type: params.tipoInmueble },
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
    this.isLoading = this.Loading(true)
    // this.$store.state.isLoading = true;
    const aft = await antiforgery.get();
    this.state.requesttoken = aft;
    if (this.$route.params.section) {
      this.moveScrollToSecction(this.$route.params.section);
    }
    this.isLoading = this.Loading(false);
    // this.$store.state.isLoading = false;
  },
};
</script>

<style scope lang="scss"> 
.my-card {
   background-image: url("@/assets/nodata.png");
   background-size: cover;
   /* This will make sure the image covers the entire card */
   background-position: center;
   /* This will center the image in the card */
 }

 .salto {
   width: 100%;
   height: 100px;
   flex-shrink: 0;
 }

 .my-alert {
   width: 100%;
   text-align: center;
   position: absolute;
   top: 10;
   left: 0;
   z-index: 9999;

 }
</style>
