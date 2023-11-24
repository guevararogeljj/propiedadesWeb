<template>
  <v-row>
    
    <!-- <span class="h1 color-black center"> {{ title }}</span>     <div class="counter" style="margin-right: auto;">{{ this.totalItems }} Disponibles</div> -->
  </v-row>
  <v-row>
      <v-col cols="12" md="4">
        <!-- Content for column 1 -->
      </v-col>
      <v-col cols="12" md="4">
        <span class="h1 color-black"> {{ title }}</span>
      </v-col>
      <v-col cols="12" md="4">
        <div class="counter" v-if="!this.isLoading">
        <p class="counterText" >  {{ this.totalItems }} Disponibles </p>
        </div>
      </v-col>
    </v-row>
  <v-row>
    <!-- <h1 class="center">{{title}}</h1> -->
    <!-- <span class="h1 color-black center"> {{ title }}</span> -->
    
    <v-col cols="14">
      <v-skeleton-loader
        v-if="this.isLoading"
        class="mx-auto"
        type="image, table"
      ></v-skeleton-loader>
      <div v-else>
        <v-carousel
          hide-delimiters
          :cycle="false"
          :show-arrows="true"
          :show-indicators="false"
          :per-page="1"
        >
   
          <v-carousel-item v-for="(group, index) in groupedData" :key="index">
            <v-row>
              <v-col
                v-for="(item, itemIndex) in group"
                :key="itemIndex"
                cols="4"
              >
                <oportunidadCard
                  :Title="item.title"
                  :OnClick="onClickProperty"
                  :Settlement="item.settlement"
                  :City="item.city"
                  :State="item.state"
                  :Price="item.price"
                  :Favorite="item.favorite"
                  :Id="item.creditnumber"
                  :Image="item.thumbnail ?? require('@/assets/propexample.svg')"
                  :IsSold="item.sold"
                >
                  <template v-slot:iconbar>
                    <PropertyCardIconBar
                      class="d-none d-sm-block"
                      :LivingSize="item.constructionsize"
                      :BathsQuantity="item.bathrooms"
                      :BebsQuantity="item.rooms"
                      :ConstructionSize="item.constructionsize"
                      :ParkingLots="item.parkingspaces"
                      ConstructionSizeUnits="m²"
                      LivinSizeUnits="m²"
                    ></PropertyCardIconBar>
                  </template>
                </oportunidadCard>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <div class="text-center mx-auto">
          <button-secondary
            Text="ver listado completo"
            color="primary3"
            class="btnCustom"
            @click="onClickButtonSend"
            width="394px"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script type="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import SvgSectionLine from "@/components/svg/section-line.vue";
import SvgRightArrow from "@/components/svg/right-arrow.vue";
import product_data from "@/core/data/product-data";
import ButtonSecondary from "../common/ButtonSecondary.vue";
import propservice from "@/core/services/propservice";
import item_client from "@/components/client/modulo-oportunidades/item_client.vue";
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
    SvgSectionLine,
    item_client,
    SvgRightArrow,
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
    offer_products: product_data.filter(
      (p) => p.productType === "electronics" && p.offerDate
    ),
  }),
  methods: {
    onClickProperty(id) {
      this.$router.push({ name: "information", query: { id: id } });
    },
    async loadProperties(properties) {
      let favorites = await usersignin.favorites({
        cellphone: this.state.userdata.cellphone,
      });

      for (var i in favorites) {
        const item = properties.find(
          (x) => x.creditnumber === favorites[i].creditnumber
        );

        if (item) {
          const index = properties.indexOf(item);
          properties[index].favorite = favorites[i].favorite;
        }
      }
      this.isLoading = false;
      // console.log('2. loadProperties.properties', properties);
      return properties;
    },
    Loading(value) {
      return (this.$store.state.isLoading = value);
    },
    async performSearch(params) {
      // console.log('params', params)
      this.isLoading = this.Loading(true);
      this.ParamsProperties = params;
      //this.currentPage = 1;
      let properties = await propservice.PropertiesRange(
        this.currentPage,
        this.perPage,
        this.ParamsProperties
      );

      this.$store.state.filterSaved = params;

      if (this.state.isLogin) {
        const propertiesandfavorites = await this.loadProperties(
          properties.result.items
        );

        this.ItemSourcePagination = propertiesandfavorites;
      } else {
        this.ItemSourcePagination = properties.result.items;
      }

      this.totalItems = properties.result.count;
      this.propiedades = properties.result.items;
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
      console.log(this.state);
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
          []
        );
      }

      if (this.state.isLogin) {
        const propertiesandfavorites = await this.loadProperties(
          properties.result.items
        );

        this.ItemSourcePagination = propertiesandfavorites;
        this.isLoading = this.Loading(false);
      } else {
        this.ItemSourcePagination = properties.result.items;
      }
      this.totalItems = properties.result.count;
      this.propiedades = properties.result.items;

      this.isLoading = this.Loading(false);
    }
    console.log("this.propiedades", this.propiedades);
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
.counterText{
  color: var(--secundarios-600, #000);
  text-align: center;
  /* Heading/Semibold 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 104% */
  letter-spacing: -0.5px;
}
.counter{

  width: 206px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--alertas-yellow, #FFC101);
  float: right;

}
.center {
  margin: auto;
  padding: 10px;
}

.color-black {
  color: var(--primary-500, #379BEC);
text-align: center;
/* Heading/Large1 */
font-family: Barlow;
font-size: 48px;
font-style: normal;
font-weight: 500;
line-height: 52.83px; /* 110.063% */
letter-spacing: -1.44px;

}

.card-border {
  border-radius: 22px;
}

.card {
  background: #ffffff;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.14))
    drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))
    drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2));
  border-radius: 8px;
}

.card-img-top {
  cursor: pointer;
}

.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25em;
  line-height: 1.75;
  /* or 140% */

  cursor: pointer;
  letter-spacing: 0.15px;

  /* Grayscale/Main_Text */

  color: #63666a;
}

.card-text-price {
  font-family: "Roboto";
  font-style: normal;
  /* Brand/Blue */

  color: #0092bc;
}

.card-text-city {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 150% */

  letter-spacing: 0.5px;

  /* Grayscale/Main_Text */

  color: #63666a;
}

.card-text-state {
  /* Headline/H6 regular */

  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height, or 140% */

  letter-spacing: 0.15px;

  /* Grayscale/finastrategy_Dark_Gray */

  color: #484343;
}

.banner-sale {
  position: absolute;
  margin-top: 0.7rem;
  right: 0rem;
  width: 224px;
  height: 39px;

  background: #d60101;
  border-radius: 6px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;

  letter-spacing: 0.15px;
  padding-top: 5px;
  vertical-align: middle !important;

  color: #f8f8f8;
}

.tooltip-custom {
  position: relative;
}

.tooltip-custom:before {
  content: attr(data-text);
  position: absolute;
  top: 100%;
  transform: translateY(-170%);
  top: 100%;
  margin-left: 5px;
  max-width: 300px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: #fff;
  text-align: center;
  font-size: 0.7em;
  display: none;
}
.carousel {
  display: flex;
  flex-wrap: wrap;
}

.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px; /* Adjust the gap between items as needed */
}

.item {
  /* Add your styles for the carousel items */
  width: 100%;
  height: 100px; /* Adjust the height of the items as needed */
  background-color: #ccc;
}

.tooltip-custom:hover:before {
  display: block;
}

@media only screen and (max-width: 900px) {
  .card {
    widows: 88vw;
  }
}
</style>
