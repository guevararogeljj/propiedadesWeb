<template>
  <div class="pb-3 wrapper desktop-style" :style="{'background-image': 'url(' + backgroundFinder + ')'}">
    <div class="row">
      <div class="col-12 maintext">{{ MainText }}</div>
      <div class="col-12 minortext mt-1">{{ MinorText }}</div>
    </div>

    <div class="row justify-content-center filters me-3 ms-3">
      <div class="d-flex select-container">
        <customselect
          v-if="isTipoInmueble"
          class="d-inline select w-50"
          :ItemSource="catalogs.tipoInmuebles"
          ItemIdAttribute="id"
          ItemNameAttribute="description"
          DefaultOption="Tipo de inmueble"
          v-model="params.propertytype"
          :DefaultOptionActive="true"
        />
        <div class="divider"></div>
        <customselect
          v-if="isEstado"
          class="d-inline select w-50"
          :ItemSource="catalogs.estados"
          ItemIdAttribute="id"
          ItemNameAttribute="description"
          DefaultOption="Estado"
          v-model="params.state"
          :OnChangeSelect="onChangeEstado"
          :DefaultOptionActive="true"
        />
        <div class="divider"></div>
        <customselect
          v-if="isMunicipio"
          class="d-inline select w-50"
          :ItemSource="catalogs.municipios"
          ItemIdAttribute="id"
          ItemNameAttribute="description"
          DefaultOption="Municipio"
          v-model="params.city"
          :DefaultOptionActive="true"
        />
        <div class="divider"></div>
        <customselect
          v-if="isPrecio"
          class="d-inline select w-50"
          :ItemSource="catalogs.rangoprecios"
          ItemIdAttribute="key"
          ItemNameAttribute="description"
          DefaultOption="Precio"
          v-model="params.price"
          :DefaultOptionActive="true"
        />
        <div class="divider"></div>

        <div class="button-container">
          <customButtonSeconday
           v-if="isRooms && isBatrooms" 
            Text="Mas"
            Icon="mdi-plus"
            :OnClickButton="onClickButtonPlus"
          />
          <custom-button-primary
            Text="Buscar"
            Icon="mdi-magnify"
            :OnClickButton="onClickButtonBuscar"
          />
          <customButtonSeconday
          v-if="isClear"
            Text="Limpiar"
            Icon="mdi-filter-remove-outline"
            :OnClickButton="onClickButtonLimpiar"
          />
        </div>
      </div>
    </div>

    <Transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div class="accordion-collapse collapsed show" v-show="show">
        <div class="row justify-content-center filters">
          <!-- :class="{ 'd-none': hideFilters }" -->
          <div class="d-flex w-75 select-container">
            <customselect
            v-if="isRooms"
              class="d-inline select w-50"
              :ItemSource="catalogs.habitaciones"
              ItemIdAttribute="id"
              ItemNameAttribute="description"
              DefaultOption="Habitaciones"
              v-model="params.rooms"
              :DefaultOptionActive="true"
            />
            <div class="divider"></div>
            <customselect
              v-if="isBatrooms"
              class="d-inline select w-50"
              :ItemSource="catalogs.banios"
              ItemIdAttribute="id"
              ItemNameAttribute="description"
              DefaultOption="Baño"
              v-model="params.bathrooms"
              :DefaultOptionActive="true"
            />
            <div class="divider"></div>
            <customselect
              class="d-inline select w-50"
              :ShowControl="isLogin"
              :ItemSource="catalogs.etapaprocesal"
              ItemIdAttribute="id"
              ItemNameAttribute="description"
              DefaultOption="Etapa"
              v-model="params.proceduralStage"
              :DefaultOptionActive="true"
            />
          </div>
        </div>
      </div>
    </Transition>

    <div class="row"></div>
  </div>
  <div class="mobile-style">

    <customButtonSeconday
      class="btn btn-lg w-25 mt-3 ms-1"
      Text="Orden"
      Icon="mdi-sort"
      :OnClickButton="onOrderButtonClick"
    />
    <customButtonSeconday
      class="btn btn-lg w-25 mt-3 ms-1"
      Text="Filtros"
      Icon="mdi-filter"
      :OnClickButton="onClickButtonFiltersMobile"
    />
  </div>

    <modal
    :visible="!hideMobileFilters"
    :OnCloseTittleButton="onCloseModal"
    Title="Filtros"
  >
    <customselect
      class="d-inline select w-100 mt-3"
      :ItemSource="catalogs.tipoInmuebles"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Tipo de inmueble"
      v-model="params.propertytype"
      :DefaultOptionActive="true"
    />

    <customselect
      class="d-inline select w-100 mt-3"
      :ItemSource="catalogs.estados"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Estado"
      v-model="params.state"
      :OnChangeSelect="onChangeEstado"
      :DefaultOptionActive="true"
    />

    <customselect
      class="d-inline select w-100 mt-3"
      :ItemSource="catalogs.municipios"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Municipio"
      v-model="params.city"
      :DefaultOptionActive="true"
    />

    <customselect
      class="d-inline select w-100 mt-3"
      v-if="isPrecio"
      :ItemSource="catalogs.rangoprecios"
      ItemIdAttribute="key"
      ItemNameAttribute="description"
      DefaultOption="Precio"
      v-model="params.price"
      :DefaultOptionActive="true"
    />

    <customselect
    v-if="isRooms"
      class="d-inline select w-100 mt-3"
      :ItemSource="catalogs.habitaciones"
      ItemIdAttribute="id"
      ItemNameAttribute="cuartos"
      DefaultOption="Habitaciones"
      v-model="params.rooms"
      :DefaultOptionActive="true"
    />

    <customselect
      v-if="isBatrooms"
      class="d-inline select w-100 mt-3"
      :ItemSource="catalogs.banios"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Baño"
      v-model="params.bathrooms"
      :DefaultOptionActive="true"
    />

    <customselect
      class="d-inline select w-100 mt-3"
      :ShowControl="isLogin"
      :ItemSource="catalogs.etapaprocesal"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Etapa"
      v-model="params.proceduralStage"
      :DefaultOptionActive="true"
    />
    <customselect
      class="d-inline select w-100 mt-3"
      :ShowControl="isLogin"
      :ItemSource="catalogs.occupations"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Etapa"
      v-model="params.proceduralStage"
      :DefaultOptionActive="true"
    />
    <customselect
      class="d-inline select w-100 mt-3"
      :ShowControl="isLogin"
      :ItemSource="catalogs.maritalstatus"
      ItemIdAttribute="id"
      ItemNameAttribute="description"
      DefaultOption="Etapa"
      v-model="params.proceduralStage"
      :DefaultOptionActive="true"
    />

    <custom-button-primary
      Icon="mdi-magnify"
      Text="Buscar"
      :OnClickButton="onClickButtonBuscar"
    />

    <customButtonSeconday
      v-if="isClear"
      Text="Limpiar"
      Icon="mdi-filter-remove-outline"
      :OnClickButton="onClickButtonLimpiar"
    />
  </modal>

  <modal
    :visible="!hideMobileOrder"
    :OnCloseTittleButton="onCloseModal"
    Title="Orden"
  >
    <slot name="customcontrol">order</slot>
  </modal>
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
      hideFilters: true,
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
  .select {
    border-left: 0px;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
    height: 2.5em;
  }
  .divider {
    border-left: 2px solid #d5d5d5;
    height: 3em;
    margin-left: 1em;
    margin-right: 1em;
  }
  .wrapper {
    background: rgba(0, 146, 188, 0.05);
    border-radius: 4px;
    padding-top: 1em;
    gap: 10px;
  }
  
  .content-buscar {
    margin-left: 0.5em;
  }
  
  .maintext {
    font-weight: 500;
    font-size: 48px;
    line-height: 48px;
    /* or 100% */
    color: #ffffff;
    align-items: left;
    padding: 0.5em;
    text-align: left;
  }
  
  .minortext {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    /* or 140% */
  
    color: #63666a;
    align-items: center;
    text-align: center;
    letter-spacing: 0.15px;
  }
  
  .main-row {
    background-color: white;
  }
  
  .select-container {
    background-color: white;
    padding: 1em;
    border-radius: 10px;
  }
  
  .button-container {
    width: 80em;
    display: inline-flex;
    align-items: center;
  }
  .button {
    height: 2em;
    width: 4.8em;
    margin-left: 0.1em;
  }
  .button-search {
    margin-left: 0.1em;
    height: 2em;
    width: 6em;
  }
  .accordion-enter-active, .accordion-leave-active {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }
  .accordion-enter, .accordion-enter-from, .accordion-leave-to {
    height: 0 !important;
    opacity: 0;
  }
  .buttonorder {
    display: none;
  }
  
  @media only screen and (max-width: 900px) {
    .filters {
      display: none;
    }
    .orderbar {
      display: none;
    }
  }

  .desktop-style {
  display: none; /* Hide on mobile */
}

.mobile-style {
  display: block; /* Show on mobile */
}

/* Apply desktop styles */
@media only screen and (min-width: 900px) {
  .desktop-style {
    display: block; /* Show on desktop */
    background-image: "url(@/assets/backgroundFinder.jpeg)";
    background-size: cover;
    background-position: center;

  }

  .mobile-style {
    display: none; /* Hide on desktop */
  }
}


</style>