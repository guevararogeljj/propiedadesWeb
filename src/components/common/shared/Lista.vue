  <template>
  <div class="container">
    <div class=" mt-5  row" v-if="NoItemsMessage">
      <div class="col-12 ">No se encontraron propiedades</div>
    </div>
    <div v-if="!NoItemsMessage" class="row">
      <div
        class="col-lg-4 col-sm-4 pt-3"
        v-for="item in ItemSource"
        :key="item[itemName]"
        @click="clickitem"
      >
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
  },
  methods: {
    clickitem() {
      //  console.log(this.itemSource);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.container{
  min-height: 35em;
}
</style>