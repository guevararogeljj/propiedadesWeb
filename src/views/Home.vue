<template>
  <v-container>
    <buscador-light
      TitleText="Texto ancla"
      :OnClickBuscar="onClickBuscar"
      Icon="mdi-facebook"
    />
    <find-oportunity/>
    <br />
    <support />
    <br />
    <oportunity />
    <br />
    <br />
    <br />
    <Contact/>
    
    <modal
      :visible="showModal"
      Title="Ya te escuchamos."
      :OnCloseTittleButton="onCloseModal"
    >
      {{ messageContact }}
    </modal>
  </v-container>
</template>

<script>
import BuscadorLight from "@/components/client/finderLight.vue";
import TitleDescription from "@/components/shared/TitleDescription.vue";
import modal from "@/components/common/Modal2.vue";
import antiforgery from "@/core/services/antiforgery";
import contservice from "@/core/services/contservice";
import oportunity from "@/components/client/oportunity.vue";
import Support from "@/components/client/support.vue";
import Contact from "@/components/shared/Contact.vue"
import FindOportunity from '@/components/client/findOportunity.vue';
export default {
  components: {
    BuscadorLight,
    TitleDescription,
    Contact,
    modal,
    Support,
    oportunity,
    FindOportunity,
  },
  name: "Home",
  data() {
    return {
      showModal: false,
      messageContact: "",
      variants: ["elevated", "flat"],
      color: "indigo",
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
      debugger;
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

  .my-card {
  background-image: url("@/assets/nodata.png");
  background-size: cover; /* This will make sure the image covers the entire card */
  background-position: center; /* This will center the image in the card */
}


</style>
