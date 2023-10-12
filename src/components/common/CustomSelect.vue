<template>


<v-select
  label="Select"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
></v-select>

  <!-- <v-select v-if="ShowControl" class="form-select" name="inputInmueble" id="inputInmueble" :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" @change="onChangeSelectInner($event.target.value)">
    <option v-if="ShowDefaultOption && DefaultOptionActive" value="">
      {{ DefaultOption }}
    </option>
    <option v-if="ShowDefaultOption && !DefaultOptionActive" disabled value="">
      {{ DefaultOption }}
    </option>

    <option v-for="item in ItemSource" :key="item[itemId]" v-bind:value="item[itemId]" selected>
      {{ item[itemName] }}
    </option>
  </v-select> -->
</template>
  
<script>
export default {
  name: "customSelectComp",
  data() {
    return {
      selectedItem: "",
      items: this.ItemSource,
      itemId: this.ItemIdAttribute,
      itemName: this.ItemNameAttribute,
      cssAttribute: this.Css,
    };
  },
  methods: {
    onChangeSelectInner(val) {
      this.items = [];
      if (this.OnChangeSelect != null) {
        this.OnChangeSelect(val);
      }
    },
  },
  props: {
    modelValue: { type: String },
    DefaultOption: { type: String, default: "Todos" },
    OnChangeSelect: { type: Function, default: null },
    ItemSource: { type: Array, default: null },
    ItemIdAttribute: { type: String, default: "Id" },
    ItemNameAttribute: { type: String, default: "Name" },
    ShowDefaultOption: { type: Boolean, default: true },
    DefaultOptionActive: { type: Boolean, default: false },
    ShowControl: { type: Boolean, default: true },
  },
};
</script>
  
<style lang="scss">
  .v-field, .v-list-item-title  {
  font-size: 0.875rem !important;
}
.v-select-list {
  width: 100px;
}

</style>
