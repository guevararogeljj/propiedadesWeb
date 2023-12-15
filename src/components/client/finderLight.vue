<template>
  <v-container>
    <div :class="`${isBackgroud ? 'wrapper desktop-style' : ''}`">
      <div class="row">
        <div class="col-12 maintext">{{ MainText }}</div>
        <div class="col-12 minortext mt-1">{{ MinorText }}</div>
      </div>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <customselect class="Inputs" v-if="isTipoInmueble" :ItemSource="catalogs.tipoInmuebles" ItemIdAttribute="id"
            ItemNameAttribute="description" DefaultOption="Tipo de inmueble" v-model="params.propertytype"
            :DefaultOptionActive="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <customselect class="Inputs" v-if="isEstado" :ItemSource="catalogs.estados" ItemIdAttribute="id"
            ItemNameAttribute="description" DefaultOption="Estado" v-model="params.state" :OnChangeSelect="onChangeEstado"
            :DefaultOptionActive="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <customselect class="Inputs" v-if="isMunicipio" :ItemSource="catalogs.municipios" ItemIdAttribute="id"
            ItemNameAttribute="description" DefaultOption="Municipio" v-model="params.city" :DefaultOptionActive="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" v-if="hideFilters">
          <customselect class="Inputs" :ItemSource="catalogs.rangoprecios" ItemIdAttribute="key"
            ItemNameAttribute="description" DefaultOption="Precio" v-model="params.price" :DefaultOptionActive="true" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-if="hideFilters">
          <customselect class="Inputs" :ItemSource="catalogs.habitaciones" ItemIdAttribute="key"
            ItemNameAttribute="description" DefaultOption="Habitaciones" v-model="params.rooms"
            :DefaultOptionActive="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" v-if="hideFilters">
          <customselect class="Inputs" :ItemSource="catalogs.banios" ItemIdAttribute="id" ItemNameAttribute="description"
            DefaultOption="Baños" v-model="params.bathrooms" :DefaultOptionActive="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" align="center">
          <v-btn flat class="btn" @click="onClickButtonBuscar()">Buscar</v-btn>
          &nbsp;
          <customButtonSeconday flat Text="Limpiar" Icon="mdi-filter-remove-outline" class="btnLimpiar"
            :OnClickButton="onClickButtonLimpiar" />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" align="center">
          <v-btn flat @click="onClickButtonPlus()" class="btnFiltros">
            <v-icon>mdi-filter-variant</v-icon>
            Más Filtros</v-btn>
          <!-- <customButtonSeconday  Text="Más Filtros" Icon="mdi-filter-variant"
          :OnClickButton="showFilters()" /> -->
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
  
<script>
import catservice from "@/core/services/catservice";
import utils from "@/core/utils/utils";
import customButtonPrimary from "@/components/common/ButtonPrimary.vue";
import customButtonSeconday from "@/components/common/ButtonSecondary.vue";
import customselect from "@/components/common/CustomSelect.vue";
import Modal from "@/components/common/Modal2.vue";
import backgroundFinder from "@/assets/backgroundFinder.jpeg";
export default {
  name: "buscadorCompo",
  props: {
    OnClickBuscar: { type: Function, default: null },
    MainText: {
      type: String,
      default: "Buscar una oferta",
    },
    MinorText: {
      type: String,
      default: "Elige entre las ofertas mas destacadas",
    },
    State: { type: String, default: "" },
    PorpertyType: { type: String, default: "" },
    City: { type: String, default: "" },
    Price: { type: String, default: "" },
    Rooms: { type: String, default: "" },
    Bathrooms: { type: String, default: "" },
    ProceduraStage: { type: String, default: "" },
    isTipoInmueble: {
      type: Boolean,
      default: false,
    },
    isEstado: {
      type: Boolean,
      default: false,
    },
    isMunicipio: {
      type: Boolean,
      default: false,
    },
    isPrecio: {
      type: Boolean,
      default: false,
    },
    isBatrooms: {
      type: Boolean,
      default: false,
    },
    isRooms: {
      type: Boolean,
      default: false,
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    changeBtn: {
      type: Boolean,
      default: false,
    },
    isBackgroud: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    customButtonPrimary,
    customButtonSeconday,
    customselect,
    Modal,
  },
  data() {
    return {
      catalogs: {
        tipoInmuebles: [],
        estados: [],
        municipios: [{ id: "1", description: "" }],
        rangoprecios: [],
        habitaciones: [],
        etapaprocesal: [],
        bathrooms: [],
      },
      hideFilters: false,
      hideMobileFilters: true,
      hideMobileOrder: true,
      params: {
        propertytype: "",
        state: "",
        city: "",
        price: "",
        rooms: "",
        proceduralStage: "",
        bathrooms: "",
      },
      orderSelect: "",
      show: false,
      backgroundFinder
    };
  },
  methods: {
    onClickButtonBuscar() {
      if (this.OnClickBuscar != null) {
        this.OnClickBuscar(this.params);
      }
    },
    onClickButtonLimpiar() {
      utils.setAllPropsObject(this.params, "");
      this.$store.state.filterSaved = null;
    },
    onClickButtonPlus() {
      this.hideFilters = !this.hideFilters;
      this.show = !this.show;
    },
    onClickButtonFiltersMobile() {
      this.hideMobileFilters = !this.hideMobileFilters;
    },
    onOrderButtonClick() {
      this.hideMobileOrder = !this.hideMobileOrder;
    },
    async onChangeEstado(id) {
      this.catalogs.municipios = await catservice.Municipios(id);
    },
    onCloseModal(val) {
      this.hideMobileFilters = val;
      this.hideMobileOrder = val;
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    },
    showFilters() {
      debugger;
      this.hideFilters = !this.hideFilters;
    },
  },
  computed: {
    ShowModalFilter() {
      return this.showFilters;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  async mounted() {
    this.catalogs.tipoInmuebles = await catservice.TipoInmuebles();

    this.catalogs.estados = await catservice.Estados();

    this.catalogs.rangoprecios = catservice.RangoPrecios();

    this.catalogs.habitaciones = await catservice.Habitaciones();

    if (this.isLogin) {
      this.catalogs.etapaprocesal = await catservice.EtapaProcesal();
    }

    this.catalogs.banios = await catservice.Banios();
  },
  watch: {
    async State(val) {
      this.params.state = val;
      this.catalogs.municipios = await catservice.Municipios(val);
    },
    PorpertyType(val) {
      this.params.propertytype = val;
    },
    City(val) {
      this.params.city = val;
    },
    Price(val) {
      this.params.price = val;
    },
    Rooms(val) {
      this.params.rooms = val;
    },
    Bathrooms(val) {
      this.params.bathrooms = val;
    },
    ProceduraStage(val) {
      this.params.proceduralStage = val;
    },
    async isLogin() {
      this.catalogs.etapaprocesal = await catservice.EtapaProcesal();
    },
  },
};
</script>
  
<style lang="scss" scoped>
.btnLimpiar {
  height: 56px;
  text-transform: none;
  display: flex;
  width: 115px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--Primary-300, #E3F1FC);
  color: var(--Primary-500, #379BEC);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.btnFiltros {
  height: 56px;
  text-transform: none;
  display: flex;
  width: 157px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--Primary-500, #379BEC);
  text-align: center;
  border-radius: 12px;
  border: 1px solid var(--Primary-500, #379BEC);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.btn {
  height: 56px;
  text-transform: none;
  display: flex;
  width: 115px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--Primary-500, #379BEC);
  color: var(--Secundarios-Blanco, #FFF);

  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}

.maintext {
  font-weight: 500;
  font-size: 48px;
  line-height: 48px;
  /* or 100% */

  align-items: left;
  padding: 0.5em;
  text-align: left;
}

.minortext {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: black;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15px;
}

.Inputs {
  height: 56px;
  width: 90%;
  margin: auto;
  padding: 10px;
  min-width: 90%;
}

@media only screen and (max-width: 767px) {
  .desktop-style {
    background-image: url("@/assets/banner-home-mobile-4 1.png");
    background-size: cover;
    background-position: center;
    border-radius: 26px;


  }
}

/* Apply desktop styles */
@media only screen and (min-width: 900px) {
  .desktop-style {

    /* Show on desktop */
    background-image: url("@/assets/backgroundFinder.jpeg");
    background-size: cover;
    border-radius: 26px;
    // width: 1242px;
    // height: 500px;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .desktop-style {
    display: block;
    background-image: url("@/assets/backgroundFinder.jpeg");
    background-size: cover;
    background-position: center;
    border-radius: 26px;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .desktop-style {
    display: block;
    background-image: url("@/assets/backgroundFinder.jpeg");
    background-size: cover;
    background-position: center;
    border-radius: 26px;
  }
}
</style>