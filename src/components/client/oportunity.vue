<template>
  <v-row>
    <!-- <span class="h1 color-black center"> {{ title }}</span>     <div class="counter" style="margin-right: auto;">{{ this.totalItems }} Disponibles</div> -->
  </v-row>
  <v-row>
    <v-col cols="12" md="4">
      <!-- Content for column 1 -->
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3">
      <span class="h1 color-black"> {{ title }}</span>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3">
      <div class="counter" v-if="!this.isLoading">
        <div class="counterText">{{ this.totalItems }} Disponibles</div>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="14">
      <v-skeleton-loader v-if="this.isLoading" class="mx-auto" type="image, table"></v-skeleton-loader>
      <div v-else>
        <v-carousel class="carouselDesktop" hide-delimiters :cycle="false" :show-arrows="true" :show-indicators="false"
          :per-page="1" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right">
          <v-carousel-item v-for="(group, index) in groupedData" :key="index">
            <v-row justify="center" align="center">
              <v-col v-for="(item, itemIndex) in group" :key="itemIndex" cols="12" sm="6" md="4" lg="3">
                <oportunidadCard :Title="item.title" :OnClick="onClickProperty" :Settlement="item.settlement"
                  :City="item.city" :State="item.state" :Price="item.price" :Favorite="item.favorite"
                  :Id="item.creditnumber" :Image="item.thumbnail ?? this.casas" :IsSold="item.sold">
                  <template v-slot:iconbar>
                    <PropertyCardIconBar class="d-none d-sm-block" :LivingSize="item.constructionsize"
                      :BathsQuantity="item.bathrooms" :BebsQuantity="item.rooms" :ConstructionSize="item.constructionsize"
                      :ParkingLots="item.parkingspaces" ConstructionSizeUnits="m²" LivinSizeUnits="m²">
                    </PropertyCardIconBar>
                  </template>
                </oportunidadCard>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>

        <v-carousel hide-delimiters :cycle="false" :show-arrows="true" :show-indicators="false" :per-page="1"
          color="primary3" class="carouselResponsive">
          <v-carousel-item v-for="(item, i) in this.propiedades" :key="i">
            <v-row justify="center" align="center">
              <v-col cols="10" sm="6" md="4" lg="3">
                <oportunidadCard :Title="item.title" :OnClick="onClickProperty" :Settlement="item.settlement"
                  :City="item.city" :State="item.state" :Price="item.price" :Favorite="item.favorite"
                  :Id="item.creditnumber" :Image="item.thumbnail ?? this.casas" :IsSold="item.sold">
                  <template v-slot:iconbar>
                    <PropertyCardIconBar class="d-none d-sm-block" :LivingSize="item.constructionsize"
                      :BathsQuantity="item.bathrooms" :BebsQuantity="item.rooms" :ConstructionSize="item.constructionsize"
                      :ParkingLots="item.parkingspaces" ConstructionSizeUnits="m²" LivinSizeUnits="m²"
                      :DetailsMode="false"></PropertyCardIconBar>
                  </template>
                </oportunidadCard>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <div class="salto"></div>
        <div class="text-center mx-auto">
          <button-secondary @click="navigateopportunities()" Text="Ver listado completo" color="primary3" class="btnCustom" width="394px" />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script type="ts">
import ButtonSecondary from "../common/ButtonSecondary.vue";
import propservice from "@/core/services/propservice";
import casa from "@/assets/casa.jpeg";
import {
  default as signinservice,
  default as usersignin,
} from "@/core/services/userservice";
import PropertyCardIconBar from "@/components/common/shared/PropertyCardIconBar.vue";
import oportunidadCard from "@/components/client/modulo-oportunidades/oportunidadCard.vue";
export default {
  name: "CarouselExample",
  props: {
    title: {
      type: String,
      default: "Oportunidades",
    },
  },
  components: {
    PropertyCardIconBar,
    ButtonSecondary,
    oportunidadCard
  },
  data: () => ({
    isExpanded: false,
    spacing: true,
    propiedades: [],
    currentPage: 1,
    totalItems: 0,
    perPage: 9,
    ParamsProperties: {},
    ItemSourcePagination: [],
    ordenProperties: "",
    outState: "",
    outPropertyType: "",
    outCity: "",
    outPrice: "",
    outRooms: "",
    outBathrooms: "",
    outProceduraStage: "",
    showModalLoginRequest: false,
    isLoading: false,
    casas: casa,
    isCarrusel: true,
  }),
  methods: {
    onClickProperty(id) {
      this.$router.push({ name: "information", query: { id: id } });
    },

    Loading(value) {
      return (this.$store.state.isLoading = value);
    },
    async performSearch(params) {
      // console.log('params', params)
      this.isLoading = this.Loading(true);

      this.ParamsProperties = params;
      this.ParamsProperties.isCarrusel = this.isCarrusel;
      //this.currentPage = 1;
      let properties = await propservice.PropertiesRange(
        this.currentPage,
        this.perPage,
        this.ParamsProperties
      );

      this.$store.state.filterSaved = params;
      this.ItemSourcePagination = properties.data;

      this.totalItems = properties.totalRecords;
      this.propiedades = properties.data;
      this.isLoading = this.Loading(false);
    },
    textTruncateTitle(title) {
      if (title.length > 30) return title.trim().substring(0, 30)
      else return title.trim()
    },
    textTruncate(settlement, city) {
      let array = [];
      const ubiDescription = settlement.trim() + ',' + city.trim();

      if (ubiDescription.length > 36) {
        array.push(ubiDescription.substring(0, 35));
        array.push(ubiDescription.substring(35, ubiDescription.length));
      }
      else {
        array.push(ubiDescription);
      }
      return array;
    },
    priceFormated(prices) {
      let currencESLocale = Intl.NumberFormat("es-MX");
      const price = currencESLocale.format(prices, {
        style: "currency",
        currency: "USD",

      });
      return `$${price}`;
    },
    navigateopportunities() {
      this.$router.push({ name: "opportunities" });
    },
  },
  async mounted() {
    let properties = [];
    if (this.getRequestsaved) {
      this.outBathrooms = this.state.filterSaved.bathrooms;
      this.outCity = this.state.filterSaved.city;
      this.outPropertyType = this.state.filterSaved.propertytype;
      this.outPrice = this.state.filterSaved.price;
      this.outProceduraStage = this.state.filterSaved.proceduraStage;
      this.outRooms = this.state.filterSaved.rooms;
      this.outBathrooms = this.state.filterSaved.bathrooms;
      this.outState = this.state.filterSaved.state;

      await this.performSearch(this.getRequestsaved);
    } else {
      this.isLoading = this.Loading(true);
      if (
        (this.$route.query.state != "" &&
          this.$route.query.state != undefined) ||
        (this.$route.query.type != "" && this.$route.query.type != undefined)
      ) {
        this.outState = this.$route.query.state;
        this.outPropertyType = this.$route.query.type;
        properties = await propservice.PropertiesRange(
          this.currentPage,
          this.perPage,
          {
            propertytype: this.$route.query.type,
            state: this.$route.query.state,
          }
        );
      } else {
        properties = await propservice.PropertiesRange(
          this.currentPage,
          this.perPage,
          {"isCarrusel" : this.isCarrusel}
        );
      }

      this.totalItems = properties.totalRecords;
      this.propiedades = properties.data;

      this.isLoading = this.Loading(false);
    }
  },
  computed: {
    ShowProperties() {
      let show = false;
      if (this.ItemSourcePagination.length > 0) {
        show = true;
      }
      return show;
    },
    state() {
      return this.$store.state;
    },
    store() {
      return this.$store;
    },
    getRequestsaved() {
      return this.$store.getters.getRequestsaved;
    },
    groupedData() {
      // Agrupa los elementos del JSON en grupos de 3x3
      const groups = [];
      for (let i = 0; i < this.propiedades.length; i += 3) {
        groups.push(this.propiedades.slice(i, i + 3));
      }
      return groups;
    },

  },
};
</script>
<style scoped>
.loading {
  margin: auto;
  /* 70 × 139 */
  width: 70px;
  height: 139px;

  transform: translate(-50%, -50%);
}

.salto {
  width: 100%;
  height: 20px;
  flex-shrink: 0;
}

.btnCustom {
  text-transform: none;
}

.v-window__controls {
  pointer-events: auto;
  background-color: red;
}

.carouselDesktop {
  display: flex;
}

.carouselResponsive {
  display: none;
}

.counterText {
  text-indent: 20px;
  color: var(--secundarios-600, #000);
  /* Heading/Semibold 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  /* 104% */
  letter-spacing: -0.5px;
}

.counter {
  width: 206px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--alertas-yellow, #ffc101);
  float: right;
  display: flex;
  align-items: center;
}


.color-black {
  color: var(--secundarios-600, #000);
  text-align: center;

  /* Heading/Large1 */
  font-family: Barlow;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 52.83px;
  /* 110.063% */
  letter-spacing: -1.44px;
}

/* Desktop */
@media (min-width: 1024px) {
  /* CSS styles for desktop */
}

/* iPad */
@media (min-width: 768px) and (max-width: 1023px) {

  /* CSS styles for iPad */
  .carouselResponsive {
    display: flex;
  }

  .carouselDesktop {
    display: none;
  }
}

/* Mobile */
@media (max-width: 767px) {

  /* CSS styles for mobile */
  .carouselResponsive {
    display: flex;
  }

  .carouselDesktop {
    display: none;
  }
}
</style>
