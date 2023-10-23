<template>
  <div>
  <div class="pb-3 wrapper">
      <div class="row">
        <div class="col-12 maintext">{{ TitleText }}</div>
      </div>
      <div class="row justify-content-center filters me-3 ms-3">
        <div class="d-flex select-container">
          <customselect v-if="isTipoInmueble" class="d-inline select w-50" :ItemSource="catalogs.tipoInmueble" ItemIdAttribute="id" ItemNameAttribute="description"
          DefaultOption="Tipo inmueble" v-model="params.tipoInmueble" />

          <div class="divider"></div>
          <customselect v-if="isEstado" class="d-inline select w-50" :ItemSource="catalogs.estados" ItemIdAttribute="id" ItemNameAttribute="description"
          DefaultOption="Estado" 
          v-model="params.estado"
          :OnChangeSelect="onChangeEstado" />

          <div class="divider"></div>
          <customselect v-if="isMunicipio" class="d-inline select w-50" :ItemSource="catalogs.municipios" ItemIdAttribute="id" ItemNameAttribute="description"
          DefaultOption="Municipio" v-model="params.city" />
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
              Text="Mas"
              Icon="mdi-plus"
              :OnClickButton="onClickButtonPlus"
            />
            <custom-button-primary
              Text="Buscar"
              :OnClickButton="onClickButtonBuscar"
              Icon="mdi-magnify"
            />
            <customButtonSeconday
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
        @after-leave="end">
        <div class="accordion-collapse collapsed show" v-show="show">
          <div class="row justify-content-center filters"> 
            <div class="d-flex w-75 select-container">
              <customselect
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
    <div class="cotainer-flex container-mobile">
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
  </div>
</template>
  
<script>
import customselect from "@/components/common/CustomSelect.vue";
import customButtonPrimary from "@/components/common/ButtonPrimary.vue";
import customButtonSeconday from "@/components/common/ButtonSecondary.vue";
import catservice from "@/core/services/catservice";
import utils from "@/core/utils/utils";

export default {
  name: "buscadorLight",
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
    TitleText: {
      type: String,
      default: "",
    },
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
    orderSelect: "",
        show: false 
  },
  components: {
    customButtonPrimary,
    customButtonSeconday,
    customselect,
  },
  data() {
    return {
      catalogs: {
        tipoInmueble: [],
        estados: [],
        municipios: [{ id: "1", description: "" }],
      },
      params: {
        tipoInmueble: "",
        estado: "",
        city: "",
      },
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
    },
    async onChangeEstado(id) {
        this.catalogs.municipios = await catservice.Municipios(id);
      },
  },
  async mounted() {
    this.catalogs.tipoInmueble = await catservice.TipoInmuebles();
    this.catalogs.estados = await catservice.Estados();
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
  color: #63666a;
  align-items: center;
  text-align: center;
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
</style>