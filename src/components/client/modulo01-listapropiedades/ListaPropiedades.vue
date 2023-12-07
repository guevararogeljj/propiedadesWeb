<template>
  <div class="container">
    <br>
    <v-divider class="d-sm-none"></v-divider>
    <div class="row">
      <buscador
        MinorText=""
        MainText="Catálogo"
        :OnClickBuscar="performSearch"
        :PorpertyType="outPropertyType"
        :State="outState"
        :City="outCity"
        :Price="outPrice"
        :Rooms="outRooms"
        :Bathrooms="outBathrooms"
        :ProceduraStage="outProceduraStage"
        :isTipoInmueble="true"
        :isEstado="true"
        :isMunicipio="true"
        :isClear="true"
      >
        <template v-slot:customcontrol>
          <OrderBar class="orderbar">
            <template v-slot:order="{ items }">
              <customselect
                :ItemSource="items"
                v-model="ordenProperties"
                DefaultOption="Destacados"
                :DefaultOptionActive="true"
              />
            </template>
          </OrderBar>
        </template>
      </buscador>
    </div>
    <v-skeleton-loader
      v-if="this.isLoading"
      class="mx-auto"
      type="image, table"
    ></v-skeleton-loader>

    <lista
      v-else
      :ItemSource="propiedades"
      ItemIdAttribute="creditnumber"
      :NoItemsMessage="!ShowProperties"
      :Count="totalItems"
    >
      <template v-slot:item="{ item }">
        <property-card
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
          <template v-slot:favoritebar>
            <div>
              <!-- <img v-if="item.favorite" src="@/assets/favorite2_icon.svg" alt="favorite" @click="
                onClickFavoriteButton(item.favorite, item.creditnumber)
                " />
              <img v-else src="@/assets/favorite_icon.svg" alt="favorite" @click="
                onClickFavoriteButton(item.favorite, item.creditnumber)
                " /> -->
            </div>
          </template>
        </property-card>
      </template>
    </lista>
    <div class="d-grid gap-2">
      <div class="row mt-3">
        <pagination
          class="mt-5"
          :class="{ 'd-none': !ShowProperties }"
          :propItemSource="ItemSourcePagination.length"
          :propTotalItems="totalItems"
          :propCurrentPage="currentPage"
          :propPerPage="perPage"
          @pagechanged="onPageChange"
          @setCurrentPage="(value) => (currentPage = value)"
          @setPerPage="(value) => (perPage = value)"
          @setTotalItems="(value) => (totalItems = value)"
        >
        </pagination>
      </div>
    </div>
  </div>
  <!-- <modalacceptLogin :Show="showModalLoginRequest" Title="¡Necesitar iniciar sesión!"
    :OnCloseTittleButton="onClickCloseModalButton" :OnClickAcceptButton="onClickAcceptModalButton">
    <p>¿Desea iniciar sesión?</p>
  </modalacceptLogin> -->
</template>

<script>
import propservice from "@/core/services/propservice";
import {
  default as signinservice,
  default as usersignin,
} from "@/core/services/userservice";
import buscador from "@/components/client/finderLight.vue";
import customselect from "@/components/common/CustomSelect.vue";
import lista from "@/components/common/shared/Lista.vue";
// import modalacceptLogin from "@/components/shared/components/ModalAccept.vue";
import OrderBar from "@/components/common/shared/OrderBar.vue";
import pagination from "@/components/common/shared/Pagination.vue";
import propertyCard from "@/components/common/shared/PropertyCard.vue";
import PropertyCardIconBar from "@/components/common/shared/PropertyCardIconBar.vue";
// import propexample from "@/assets/propexample.jpg";
export default {
  components: {
    buscador,
    lista,
    propertyCard,
    PropertyCardIconBar,
    OrderBar,
    customselect,
    pagination,
    // modalacceptLogin,
  },
  data() {
    return {
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
      // propexample,
      isLoading: false,
    };
  },
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
    onClickAcceptModalButton() {
      this.$router.push({ name: "login" });
    },
    onClickCloseModalButton() {
      this.showModalLoginRequest = false;
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
    async searchProps(currentPage, perPage) {
      // console.log('params', this.ParamsProperties)
      this.isLoading = this.Loading(true);
      //this.currentPage = 1;
      let properties = await propservice.PropertiesRange(
        currentPage,
        perPage,
        this.ParamsProperties
      );

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
    loadItemsToGrid(pageNumber, pageSize) {
      return this.ItemSourcePagination.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
      );
    },
    onPageChange(event) {
      this.searchProps(event.currentPage, event.perPage);
    },
    async onClickFavoriteButton(val, idprop) {
      if (this.state.isLogin) {
        let result = this.propiedades.find((x) => x.creditnumber === idprop);
        result.favorite = !val;

        if (result.favorite) {
          await signinservice.addfavorite({
            cellphone: this.state.userdata.cellphone,
            id: idprop,
          });
        } else {
          await signinservice.removefavorite({
            email: this.state.userdata.email,
            id: idprop,
          });
        }
      } else {
        this.showModalLoginRequest = true;
      }
    },
    onClickFavotiteListButton() {
      //alert("favorites");
    },
    onClickProperty(id) {
      this.$router.push({ name: "information", query: { id: id } });
    },
  },
  async mounted() {
    let properties = [];
    console.log(this.getRequestsaved);

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
  },
  watch: {
    async ordenProperties(newValue) {
      this.ItemSourcePagination = [];
      this.ItemSourcePagination = await propservice.PropertiesRange(
        this.currentPage,
        this.perPage,
        this.paramsProperties ?? [],
        newValue
      );
    },
  },

  scrollToTop() {
    window.scrollTo(0, 0);
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

<style></style>