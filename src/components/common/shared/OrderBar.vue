<template>
    <div class="row mt-3">
      <div class="col-lg-1 col-sm-12"></div>
      <div class="col-lg-4 col-sm-12 text-search">
        <p class="title-order">Resultados de búsqueda</p>
      </div>
  
      <div class="col-lg-2 col-sm-12">
        <slot name="order" :items="itemSource">order</slot>
      </div>
      <div class="col-lg-2 col-sm-12"></div>
      <div class="col-lg-1 col-sm-12 text-favorite justify-content-end mt-2">
        <slot name="favorite"></slot>
      </div>
    </div>
  </template>
  
  <script>
  // import customSelect from "./CustomSelect.vue";
  export default {
    components: {
      // customSelect,
    },
    name: "orderbarComp",
    data() {
      return {
        itemSource: [
          { Id: '1', Name: "De mayor  a menor precio" },
          { Id: '2', Name: "De menor a mayor precio" },
        ],
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  .text-search {
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;
    /* or 125% */
  
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
  
    /* Grayscale/Main_Text */
  
    color: #63666a;
  }
  .text-favorite {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */
  
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  
    /* Brand/Blue */
  
    color: #0092bc;
  }
  
  @media only screen and (max-width: 900px) {
    .title-order {
      display: none;
    }
  }
  </style>