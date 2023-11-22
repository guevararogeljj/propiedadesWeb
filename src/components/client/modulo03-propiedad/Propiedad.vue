<template>
  <v-container class="content">
    <v-responsive>
      <br>
      <v-row>
        <v-col cols="12" md="7"> <!-- Columna izquierda -->
          <v-label class="text-h5">{{ propertyInfo.title }}</v-label>
          <div>
            <ButtonSecondary v-if="propertyInfo.favorite" Icon="mdi-heart" variant="plain" />
            <ButtonSecondary v-else Icon="mdi-heart-outline" variant="plain" />
            <ButtonSecondary Icon="mdi-thumb-up-outline"  @click="onClickInfoButton" color="primary" Text="Me interesa" />
          </div>
          <image-gallery :ItemSource="propertyInfo.photos" :ShowDescription="false">
          </image-gallery>
          <div v-if="propertyInfo.sold" class="banner-sale">Vendida</div>
          <br>

          <p class="title">Detalles</p>
          <propiedadInfo class="mt-2" :Title="propertyInfo.type" :Description="propertyInfo.description"
            :StreetName="propertyInfo.address2" :Price="propertyInfo.price" :Favorite="propertyInfo.favorite"
            :OnClickShare="onClickShareButton" :OnClickPropInfo="onClickPropInfoButton"
            :OnClickFavorite="onClickFavoriteButton" :IsLogin="isLogin" />
          <property-card-icon-bar class="mt-5 me-1" :BathsQuantity="propertyInfo.bathrooms" BathsUnits="Baños"
            :LivingSize="propertyInfo.lotsize" LivinSizeUnits="m2" :BebsQuantity="propertyInfo.rooms"
            BedsUnits="Habitaciones" :ParkingLots="propertyInfo.parkingspaces" ParkingUnits="Espacios"
            :ConstructionSize="propertyInfo.constructionsize" ConstructionSizeUnits="m2" :DetailsMode="true" />
          <br>
          <p class="title">Descripción</p>
        </v-col>
        <v-col cols="12" md="4"> <!-- Columna derecha -->
          <Contact Titulo="Contacta a un asesor"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <propiedad-description-ubication :PropertyDescription="propertyInfo.description"
          :UbicacionDescription="description.ubicationDescription" :Latitude="this.propertyInfo.latitude"
          :Longitude="this.propertyInfo.longitude" :IsLogin="isLogin" :NoLoginImage="onClickBannerButton" />
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <oportunity title="Propiedades similares"/> 
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
 
</template>
  
<script>
import InformacionLegal from "@/components/client/modulo03-propiedad/InformacionLegal.vue";
import antiforgery from "@/core/services/antiforgery";
import { default as contactservice, default as shareservice } from "@/core/services/contservice";
import propservice from "@/core/services/propservice";
import signinservice from "@/core/services/usersignin";
import Primarybutton from "@/components/common/ButtonPrimary.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";
import { default as Modal, default as ModalShare } from "@/components/common/Modal2.vue";

import { mapMutations } from "vuex";
import PropertyCardIconBar from "@/components/common/shared/PropertyCardIconBar.vue";
import PropiedadDescriptionUbication from "./PropiedadDescriptionUbication.vue";
import propiedadInfo from "@/components/client/modulo03-propiedad/PropertyInfo.vue";
import Contact from "@/components/shared/Contact.vue"
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import oportunity from "../oportunity.vue";
export default {
  components: {
    propiedadInfo,
    InformacionLegal,
    ImageGallery,
    PropertyCardIconBar,
    PropiedadDescriptionUbication,
    Modal,
    ModalShare,
    Primarybutton,
    Contact,
    ButtonSecondary,
    oportunity

  },
  name: "propiedadComp",
  data() {
    return {
      shareemail: "",
      showlegalinfo: false,
      showShareMenu: false,
      favorite: true,
      validemail: false,
      propertyInfo: {},
      showModalLoginRequest: false,
      ndaprocess: false,
      design: {
        description:
          "El apartamento consta de un gran salón, que está conectado con la cocina y el comedor. En esta parte del apartamento también hay un estudio, que está muy sutilmente separado de la sala de estar por una elegante pared de vidrio y vigas de madera. Desde el salón hay una transición suave a las habitaciones, un armario, un baño compartido y un dormitorio principal con baño separado.",
        title: "Diseño",
      },
      legal: {
        dictamenLegal: "example dictamen legal",
        estadoJuridico: "Rddfiudkej",
        noCredito: "846582254",
        saldos:
          "Addfisdl: $1,425,711.11 <br/> Vdjskjs Gadsddtía: $955,000.00 <br/> Pdslfk: $214,359.81",
        tipoOperacion: "Nodfmalk",
      },

      title: "Amplio departamento de 4 habitaciones con hermosa terraza.",
      description: {
        ubicationDescription: ``,
      },
      showPropInfo: false,
      showPropGetInfo: false
    };
  },
  methods: {
    ...mapMutations(['SET_OPEN_DIALOG_LOGIN', 'DELETE_FOTO_CAMERA']),
    onClickBannerButton() {
      this.showModalLoginRequest = true;
    },
    onClickInfoButton() {
      if (this.OnClickPropInfo != null) {
        this.OnClickPropInfo();
      }
    },
    onClickAcceptModalButton() {
      // funcion del login aqui
      this.SET_OPEN_DIALOG_LOGIN(true)
      this.showModalLoginRequest = false;
      // this.$router.push({ name: "login" });
    },
    onClickCloseModalButton() {

      this.showModalLoginRequest = false;
      this.showPropGetInfo = false;
    },
    isError(value) {
      return (this.$store.state.isError = value);
    },
    async onClickModalShareButton() {
      const regex = /^\w+([.\-_]{0,3}?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      const isValid = regex.test(this.shareemail);

      if (!isValid) {
        this.validemail = true;
        this.state.isLoading = false;
        return;
      }

      this.validemail = false;

      if (this.shareemail != null && this.shareemail != "") {
        this.Loading(true);
        const result = await shareservice.share(
          this.shareemail,
          this.propertyInfo.creditnumber
        );

        if (result.success == false) {
          this.$store.state.messageErrors = result.message;
          this.state.isError = true;
          this.showPropInfo = false;
          this.showShareMenu = false;
        }
        this.shareemail = "";
        this.Loading(false);
      }
    },
    onCloseModal() {
      this.showPropInfo = false;
      this.showShareMenu = false;
      this.validemail = false;
    },
    Loading(value) {
      return (this.$store.state.isLoading = value);
    },
    async onClickFavoriteButton(val) {
      if (this.state.isLogin) {
        this.propertyInfo.favorite = !val;
        if (this.propertyInfo.favorite) {
          await signinservice.addfavorite({
            email: this.state.userdata.email,
            id: this.propertyInfo.creditnumber,
          });
        } else {
          await signinservice.removefavorite({
            email: this.state.userdata.email,
            id: this.propertyInfo.creditnumber,
          });
        }
      } else {
        this.showModalLoginRequest = true;
      }
    },
    async onClickPropInfoButton() {
      if (this.state.isLogin == true) {
        this.showPropInfo = true;
        await contactservice.requestinfo(
          this.state.userdata.cellphone,
          this.propertyInfo.creditnumber
        );
      } else {
        this.showModalLoginRequest = true;
      }
    },
    onClickShareButton() {
      this.showShareMenu = true;
    },
    async onClickPropGetInfoButton() {
      if (this.state.isLogin == true) {
        this.showPropGetInfo = true;
      } else {
        this.showPropGetInfo = true;
        //this.showModalLoginRequest = true;
      }
    },
    onClickAcceptModalButtonGetInfo() {
      //  funcion de eliminar store de credencial
      this.DELETE_FOTO_CAMERA()
      this.$router.push({ name: "images" }); //INE
      //this.$router.push({ name: "data" }); //RFC 
      //this.$router.push({ name: "fiscaldata" }); //Fiscal Data


    },
    async legalGetInfo() {
      if (this.$route.query.id != "" && this.$route.query.id != undefined) {
        const id = this.$route.query.id;
        let data = await propservice.PropertyDetails(id);

        if (this.state.isLogin) {
          const legaldata = await propservice.legaldata({
            creditnumber: this.$route.query.id,
          });
          this.legal.noCredito = legaldata.creditnumber;
          this.legal.estadoJuridico = legaldata.proceduralstage;
          this.showlegalinfo = true;
          const favorites = await signinservice.favorites({
            email: this.state.userdata.email,
          });


          const result = await signinservice.ndastatus({ Cellphone: this.state.cellphone })
          this.ndaprocess = result.result



          for (var i in favorites) {
            if (favorites[i].creditnumber == data.creditnumber) {
              data.favorite = favorites[i].favorite;
            }
          }
        }
        this.propertyInfo = data;
      }
      const aft = await antiforgery.get();
      this.state.requesttoken = aft;
    }
  },
  computed: {
    state() {
      return this.$store.state;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  watch: {
    async isLogin() {
      this.Loading(true);
      await this.legalGetInfo()
      this.Loading(false);
    }
  },
  async mounted() {
    this.Loading(true);
    await this.legalGetInfo()
    this.Loading(false);
  },
};
</script>
  
<style scoped lang="scss">
.title {
  /* Headline/H3 regular */

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 48px;
  /* or 100% */

  display: flex;
  align-items: center;

  /* Grayscale/Main_Text */

  color: #63666a;
}

.banner-sale {
  // position: absolute;
  // margin-top: 0.7rem;
  // right: 0rem;
  // width: 116px;
  // height: 28px;

  background: #0092bc;
  border-radius: 6px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;

  letter-spacing: 0.15px;
  //background-color: red;

  color: #f8f8f8;
}

@media only screen and (max-width: 900px) {
  .title-mobile {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 28px;
    /* or 108% */

    display: flex;
    align-items: center;
  }
}
</style>