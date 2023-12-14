<template>
  <div class="container">
    <v-row>
      <v-col cols="10" class="countProperty">{{this.Count}} {{ Title }}</v-col>
      <v-col cols="2" class="resent">Más recientes</v-col>
    </v-row>

    <div class=" mt-5  row" v-if="NoItemsMessage">
      <div class="col-12 ">No se encontraron propiedades</div>
    </div>
    <div v-if="!NoItemsMessage" class="row">
      <div class="col-lg-4 col-sm-4 pt-3" v-for="item in ItemSource" :key="item[itemName]" @click="clickitem">
        <slot name="item" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listaComp",
  data() {
    return {
      itemSource: this.ItemSource,
      itemId: this.ItemIdAttribute,
      itemName: this.ItemNameAttribute,
    };
  },
  props: {
    ItemSource: { type: Array, default: null },
    ItemIdAttribute: {
      type: String,
      default() {
        return "Id";
      },
    },
    NoItemsMessage: { type: Boolean, default: true },
    Count: { type: Number, default: 0 },
    Title : {type: String, default: "Propiedades"},
  },
  methods: {
    clickitem() {
      //  console.log(this.itemSource);
    },
  },
  mounted() { },
};
</script>

<style scoped lang="scss">
.resent {
  color: var(--secundarios-600, #000);
text-align: center;

/* Text/Regular/Regular */
font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 125% */
}
.countProperty {
  color: var(--secundarios-600, #000);

/* Heading/Semibold 1 */
font-family: Barlow;
font-size: 25px;
font-style: normal;
font-weight: 600;
line-height: 25px; /* 100% */
letter-spacing: -0.5px;
}
.container {
  min-height: 35em;
}
</style>