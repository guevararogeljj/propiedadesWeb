<template>
  <v-row class="content">
    <!-- <h1 class="center">{{title}}</h1> -->
    <span class="h1 color-black center"> {{ title }}</span>&nbsp;
    <v-col cols="12">
      <v-carousel hide-delimiters :cycle="false" :show-arrows="true" :show-indicators="false" :per-page="1">
        <v-carousel-item v-for="(group, index) in carouselGroups" :key="index">
          <v-row>
            <v-col v-for="(item, itemIndex) in group" :key="itemIndex" cols="4">
              <div :class="`tp-product-item-2 ${spacing ? 'mb-40' : ''}`">
                <div class="tp-product-thumb-2 p-relative z-index-1 fix w-img card-border"
                  style="background-color: #f2f3f5">
                  <img :src="item.imageSrc" @click="onClickTitle" alt="property"  />
                  <div class="tp-product-action-2 tp-product-action-blackStyle">
                    <div class="tp-product-action-item-2 d-flex flex-column">
                      <div class="d-inline col-12 d-flex justify-content-end">
                      </div>
                    </div>
                    <div class="card-text card-text-state d-flex justify-content-end"></div>
                  </div>
                  <div class="tp-product-content-2 pt-15">
                    <div class="tp-product-tag-2">
                      <span class="tooltip-custom">
                      <!-- <span class="tooltip-custom" :data-text="Title"> -->
                        <!-- {{ textTruncateTitle }} -->
                        titulo
                        <!-- <a v-if="this.Title.length > 30"> ... </a> -->
                      </span>
                    </div>
                    <div class="tp-product-title-2">
                      <div class="card-text mt-3 card-text-price d-flex justify-content-start">
                        MXN
                      </div>
                      <div class="card-text card-text-state">
                        <div class="row">
                          <div class="d-inline col-10 d-flex justify-content-start">
                            <!-- {{ State }} -->
                            estado
                          </div>
                          <div class="card-text card-text-city d-flex justify-content-start">
                            detalles
                            <!-- <label v-if="(textTruncate.length > 1)">
                <label v-if="isExpanded" @click="(isExpanded = false)">
                  {{ textTruncate[0] + textTruncate[1] }}
                </label>
                <label v-else>
                  {{ textTruncate[0] }} <a v-if="!isExpanded"> ... </a>
                </label>

              </label>
              <label v-else>
                {{ textTruncate[0] }}
              </label> -->
                          </div>
                          <div class="mt-2">
                            <slot name="iconbar"></slot>
                          </div>
                          <div class="d-inline col-12 d-flex justify-content-end">
                            <!-- <slot name="favoritebar"></slot> -->
                          </div>
                          <div class="card-text card-text-state d-flex justify-content-end"></div>
                        </div>
                      </div>
                    </div>
                    <div class="tp-product-rating-icon tp-product-rating-icon-2">

                    </div>
                    <div class="tp-product-price-wrapper-2">
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
  <v-row>

  </v-row>
</template>

<script>

import propservice from "@/core/services/propservice";
import {
  default as signinservice,
  default as usersignin,
} from "@/core/services/userservice";
export default {
  name: "CarouselExample",
  props: {
    title: {
      type: String,
      default: "Oportunidades",
    },
  },
  data: () => ({
    isExpanded: false,
    spacing: true,
    model: 0,
    carouselGroups: [
      [
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', altText: 'Imagen 1' },
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', altText: 'Imagen 2' },
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', altText: 'Imagen 3' }
      ],
      [
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', altText: 'Imagen 4' },
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', altText: 'Imagen 5' },
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', altText: 'Imagen 6' }
      ],
      [
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', altText: 'Imagen 4' },
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', altText: 'Imagen 5' },
        { imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', altText: 'Imagen 6' }
      ],
      // Agrega más grupos de imágenes para completar las 12 imágenes
    ],
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
  }),
  methods: {
    async loadProperties(properties) {
      // console.log('1. loadProperties.properties', properties);
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
          properties.result.result.items
        );

        this.ItemSourcePagination = propertiesandfavorites;
      } else {
        this.ItemSourcePagination = properties.result.result.items;
      }

      this.totalItems = properties.result.result.count;
      this.propiedades = properties.result.result.items;
      this.isLoading = this.Loading(false);
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
      this.performSearch(this.getRequestsaved);
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
          properties.result.result.items
        );

        this.ItemSourcePagination = propertiesandfavorites;
        this.isLoading = this.Loading(false);
      } else {
        this.ItemSourcePagination = properties.result.result.items;
      }
      this.totalItems = properties.result.result.count;
      this.propiedades = properties.result.result.items;

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
  },
};
</script>
<style scoped>
.center {
  margin: auto;
  padding: 10px;
}

.color-black {
  color: #000000 !important;

}


.card-border {
  border-radius: 22px;
}

.card {
  background: #ffffff;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.14)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2));
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

  background: #D60101;
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

.tooltip-custom:hover:before {
  display: block;
}

@media only screen and (max-width: 900px) {
  .card {
    widows: 88vw;
  }
}
</style>
