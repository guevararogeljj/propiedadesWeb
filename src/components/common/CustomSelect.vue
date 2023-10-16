<template>
<select v-if="ShowControl"
    class="form-select"
    name="inputInmueble"
    id="inputInmueble"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @change="onChangeSelectInner($event.target.value)"
  >
    <option v-if="ShowDefaultOption && DefaultOptionActive" value="">
      {{ DefaultOption }}
    </option>
    <option v-if="ShowDefaultOption && !DefaultOptionActive" disabled value="">
      {{ DefaultOption }}
    </option>

    <option
      v-for="item in ItemSource"
      :key="item[itemId]"
      v-bind:value="item[itemId]"
      selected
    >
      {{ item[itemName] }}
    </option>
  </select>
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
      selected: this.selected,
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
    data: {
    selected: ''
  },
  },
};
</script>
  
<style lang="scss">
.form-select {
  background: #ffffff;
  border-radius: 7px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background-image: url("@/assets/select_icon.svg");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 24px 24px;
}

</style>
