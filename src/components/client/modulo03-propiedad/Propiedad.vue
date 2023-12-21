<template>
  <v-container class="content">
    <v-responsive>
      <br />
      <v-row>
        <v-col cols="12" md="7">
          <!-- Columna izquierda -->
          <div>
            <v-icon @click="navigateToBack()">mdi-arrow-left</v-icon>
            <span class="back">Regresar a Catálogo</span>
          </div>
          <div class="title">{{ propertyInfo.state }}</div>
          <br />
          <v-row>
            <v-col cols="12" md="6" align="center">
              <div class="price">{{ priceFormated }} MXN</div>
            </v-col>
            <v-col cols="12" md="6" align="center">
              <ButtonSecondary
                v-if="propertyInfo.favorite"
                :OnClickButton="onClickFavoriteButton"
                Icon="mdi-heart-outline"
                variant="plain"
              />
              <ButtonSecondary
                v-else
                Icon="mdi-heart-outline"
                :OnClickButton="onClickFavoriteButton"
                variant="plain"
              />
              <v-dialog class="w-auto">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" class="btnInteresting" flat>
                    Me Interesa
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card class="card" flat>
                    <v-card-text>
                      <div class="titulocard">Gracias por tu interés</div>
                      <br />
                      <div class="subtituloCard">
                        Si deseas más información acerca de ésta propiedad un
                        asesor personalizado puede apoyarte
                      </div>
                      <v-btn
                        class="btnConfirm"
                        @click="onClickPropInfoButton"
                        flat
                        >Si, deseo que me contacten</v-btn
                      >
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text="cerrar"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <image-gallery
              :ItemSource="propertyInfo.photos"
              :ShowDescription="false"
            >
            </image-gallery>
          </v-row>
          <!-- <div v-if="propertyInfo.sold" class="banner-sale">Vendida</div> -->
          <v-row>
            <v-col cols="12" md="6">
              <div class="tp-product-badge" v-if="propertyInfo.sold">
                <span class="product-hot">vendido</span>
              </div>
              <br />
              <div class="detailsTitle">Detalles</div>

              <span>Tipo de Propiedad. {{ this.propertyInfo.type }}</span>
              <br />
              <span>Estado. {{ this.propertyInfo.state }} </span>
              <br />
              <span>Municipio. {{ this.propertyInfo.city }}</span>
              <br />
              <span>Colonia. {{ this.propertyInfo.settlement }}</span>
              <br />
            </v-col>
            <v-col cols="12" md="6" align="center"> </v-col>
          </v-row>

          <property-card-icon-bar
            class="mt-5 me-1"
            :BathsQuantity="propertyInfo.bathrooms"
            BathsUnits="Baños"
            :LivingSize="propertyInfo.lotsize"
            LivinSizeUnits="m2"
            :BebsQuantity="propertyInfo.rooms"
            BedsUnits="Habitaciones"
            :ParkingLots="propertyInfo.parkingspaces"
            ParkingUnits="Espacios"
            :ConstructionSize="propertyInfo.constructionsize"
            ConstructionSizeUnits="m2"
            :DetailsMode="false"
          />
          <br />
        </v-col>
        <v-col cols="12" md="4">
          <!-- Columna derecha -->
          <Contact
            v-if="isLogin"
            Titulo="¿Deseas invertir?"
            :IsInversion="true"
          />
          <Contact v-else Titulo="Contacta a un asesor" />
          <br />
          <br />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <propiedad-description-ubication
            :PropertyDescription="propertyInfo.description"
            :UbicacionDescription="description.ubicationDescription"
            :Latitude="this.propertyInfo.latitude"
            :Longitude="this.propertyInfo.longitude"
            :IsLogin="isLogin"
            :NoLoginImage="onClickBannerButton"
          />

          <!-- <propiedadInfo  :Title="propertyInfo.type" :Description="propertyInfo.description"
            :StreetName="propertyInfo.address2" :Price="propertyInfo.price" :Favorite="propertyInfo.favorite"
            :OnClickShare="onClickShareButton" :OnClickPropInfo="onClickPropInfoButton"
            :OnClickFavorite="onClickFavoriteButton" :IsLogin="isLogin" /> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <oportunity title="Propiedades similares" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import InformacionLegal from "@/components/client/modulo03-propiedad/InformacionLegal.vue";
import antiforgery from "@/core/services/antiforgery";
import {
  default as contactservice,
  default as shareservice,
} from "@/core/services/contservice";
import propservice from "@/core/services/propservice";
import signinservice from "@/core/services/usersignin";
import Primarybutton from "@/components/common/ButtonPrimary.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";
import {
  default as Modal,
  default as ModalShare,
} from "@/components/common/Modal2.vue";

import { mapMutations } from "vuex";
import PropertyCardIconBar from "@/components/common/shared/PropertyCardIconBar.vue";
import PropiedadDescriptionUbication from "./PropiedadDescriptionUbication.vue";
import propiedadInfo from "@/components/client/modulo03-propiedad/PropertyInfo.vue";
import Contact from "@/components/shared/Contact.vue";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import oportunity from "../oportunity.vue";
import invertir from "../modulo-invertir/invertir.vue";
import { dialogSuccess, dialogError } from "@/core/utils/alerts";
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
    oportunity,
    invertir,
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
      showPropGetInfo: false,
    };
  },
  methods: {
    ...mapMutations(["SET_OPEN_DIALOG_LOGIN", "DELETE_FOTO_CAMERA"]),
    onClickBannerButton() {
      this.showModalLoginRequest = true;
    },
    navigateToBack() {
      this.$store.state.filterSaved = null;
      this.$router.go(-1);
    },
    async onClickPropInfoButton() {
      if (this.state.isLogin == true) {
        this.showPropInfo = true;
        const result = await contactservice.requestinfo(
          this.state.userdata.cellphone,
          this.propertyInfo.creditnumber
        );
        if (result == true) {
          dialogSuccess({
            title: "¡Bien!",
            text: "Listo, en breve atenderemos tu solicitud",
          });
        } else {
          dialogError({
            title: "¡Error!",
            text: "¡No se ha podido enviar tu solicitud!",
          });
        }
      } else {
        dialogError({
          title: "¡Error!",
          text: "¡Necesitas iniciar sesión!",
        });
      }
    },
    onClickAcceptModalButton() {
      // funcion del login aqui
      this.SET_OPEN_DIALOG_LOGIN(true);
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
            cellphone: this.state.userdata.cellphone,
            id: this.propertyInfo.creditnumber,
          });
        } else {
          await signinservice.removefavorite({
            cellphone: this.state.userdata.cellphone,
            id: this.propertyInfo.creditnumber,
          });
        }
      } else {
        dialogError({
          title: "¡Error!",
          text: "¡Necesitas iniciar sesión!",
        });
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
      this.DELETE_FOTO_CAMERA();
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

          const result = await signinservice.ndastatus({
            Cellphone: this.state.cellphone,
          });
          this.ndaprocess = result.result;

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
    },
  },
  computed: {
    state() {
      return this.$store.state;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    priceFormated() {
      let currencESLocale = Intl.NumberFormat("es-MX");
      const price = currencESLocale.format(this.propertyInfo.price, {
        style: "currency",
        currency: "USD",
      });
      return `$${price}`;
    },
  },
  watch: {
    async isLogin() {
      this.Loading(true);
      await this.legalGetInfo();
      this.Loading(false);
    },
  },
  async mounted() {
    this.Loading(true);
    await this.legalGetInfo();
    this.Loading(false);
  },
};
</script>

<style scoped lang="scss">
.btnConfirm {
  margin: auto;
  height: 56px;
  display: flex;
  width: 255px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: none;
  color: var(--Secundarios-Blanco, #fff);
  border-radius: 12px;
  background: var(--Primary-500, #379bec);
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.card {
  margin: auto;
  max-width: 606px;
  max-height: 300px;
  flex-shrink: 0;
  border-radius: 26px;
  background: var(--Secundarios-Blanco, #fff);

  /* Shadows/Estandar100 */
  box-shadow: 5px 5px 30px 0px rgba(55, 155, 236, 0.3);
}

.titulocard {
  margin: auto;
  width: 366px;
  height: 34px;
  flex-shrink: 0;
  color: var(--Secundarios-600, #000);
  text-align: center;

  /* Heading/Medium 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
}

.subtituloCard {
  margin: auto;
  width: 375px;
  height: 63px;
  flex-shrink: 0;
  color: var(--Secundarios-600, #000);
  text-align: center;

  /* Text/Regular/Regular */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.back {
  color: var(--Secundarios-600, #000);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.detailsTitle {
  color: var(--secundarios-600, #000);

  /* Heading/Medium 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
}

.details {
  width: 341px;
  height: 113px;
  flex-shrink: 0;
  color: var(--secundarios-600, #000);

  /* Text/Small/Medium */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 142.857% */
  letter-spacing: -0.14px;
}

.textBtn {
  text-transform: capitalize;
  color: var(--primary-500, #379bec);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.btnInteresting {
  text-transform: none;
  display: flex;
  width: 106px;
  height: 40px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--Primary-300, #e3f1fc);
  color: var(--Primary-500, #379bec);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.back {
  color: var(--secundarios-600, #000);
  text-align: left;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.price {
  color: var(--secundarios-600, #000);

  /* Heading/Semibold 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  /* 100% */
  letter-spacing: -0.5px;
}

.title {
  text-align: left;
  color: var(--secundarios-600, #000);
  width: auto;
  /* Heading/Large1 */
  font-family: Barlow;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 52.83px;
  /* 110.063% */
  letter-spacing: -1.44px;
}

.banner-sale {
  background: #0092bc;
  border-radius: 6px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.15px;
  color: #f8f8f8;
}

@media only screen and (max-width: 900px) {
  .titulocard {
    margin: auto;
    width: auto;
    height: auto;
    flex-shrink: 0;
    color: var(--Secundarios-600, #000);
    text-align: center;

    /* Heading/Medium 1 */
    font-family: Barlow;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
  }

  .subtituloCard {
    margin: auto;
    width: auto;
    height: auto;
    flex-shrink: 0;
    color: var(--Secundarios-600, #000);
    text-align: center;

    /* Text/Regular/Regular */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
  }
  .card {
    margin: auto;
    max-width: auto;
    max-height: auto;
    flex-shrink: 0;
    border-radius: 26px;
    background: var(--Secundarios-Blanco, #fff);

    /* Shadows/Estandar100 */
    box-shadow: 5px 5px 30px 0px rgba(55, 155, 236, 0.3);
  }
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
