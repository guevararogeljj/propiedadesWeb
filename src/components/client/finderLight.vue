<template>
  <div>
  <v-row class="mb-6" no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <h1>{{ TitleText }}</h1>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row class="mb-6" no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <customselect class="" :ItemSource="catalogs.estados" ItemIdAttribute="id" ItemNameAttribute="description"
          DefaultOption="Estado" v-model="params.estado" />
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet class="pa-2 ma-2">
        <customselect class="" :ItemSource="catalogs.estados" ItemIdAttribute="id" ItemNameAttribute="description"
          DefaultOption="Estado" v-model="params.estado" />
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet class="pa-2 ma-2">
        <customselect class="" :ItemSource="catalogs.estados" ItemIdAttribute="id" ItemNameAttribute="description"
          DefaultOption="Estado" v-model="params.estado" />
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet class="pa-2 ma-2">
        <custom-button-primary  Icon="mdi-magnify" Text="BUSCAR"
          :OnClickButton="onClickButtonBuscar" :Icon="search-icon" />
        <customButtonSeconday  Text="LIMPIAR" :OnClickButton="onClickButtonLimpiar">
        </customButtonSeconday>
      </v-sheet>
    </v-col>
  </v-row>
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
      },
      params: {
        tipoInmueble: "",
        estado: "",
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
  },
  async mounted() {
    this.catalogs.tipoInmueble = await catservice.TipoInmuebles();
    this.catalogs.estados = await catservice.Estados();
  },
};
</script>
  
<style lang="scss" scoped>

.wrapper {
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.016);
  border-radius: 4px;
  padding-top: 1em;
  gap: 10px;
  background: #f8f8f8;
}

.content-buscar {
  margin-left: 0.5em;
}

@media only screen and (max-width: 900px) {
  .button {
    width: 100% !important;
    margin-top: 1px;
  }
}
</style>