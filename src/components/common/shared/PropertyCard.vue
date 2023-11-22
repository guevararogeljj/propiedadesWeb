<template>
  <div :class="`tp-product-item-2 ${spacing ? 'mb-40' : ''}`">
    <div class="tp-product-thumb-2 p-relative z-index-1 fix w-img card-border" style="background-color: #f2f3f5">
      <img src="@/assets/propsample.jpeg" @click="onClickTitle" alt="property" height="300" />
      <!-- product badge -->
      <div class="tp-product-badge">
        <span v-if="IsSold" class="product-hot">vendido</span>
      </div>
      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
      <div class="tp-product-action-item-2 d-flex flex-column">
        <div class="d-inline col-12 d-flex justify-content-end">
        </div>
        <slot name="favoritebar"></slot>
      </div>
      <div class="card-text card-text-state d-flex justify-content-end"></div>
    </div>
    <div class="tp-product-content-2 pt-15">
      <div class="tp-product-tag-2">
        <span class="tooltip-custom" :data-text="Title">
          {{ textTruncateTitle }}
          <a v-if="this.Title.length > 30"> ... </a>
        </span>
      </div>
      <div class="tp-product-title-2">
        <div class="card-text mt-3 card-text-price d-flex justify-content-start">
          {{ priceFormated }} MXN
        </div>
        <div class="card-text card-text-state">
          <div class="row">
            <div class="d-inline col-10 d-flex justify-content-start">
              {{ State }}
            </div>
            <div class="card-text card-text-city d-flex justify-content-start">
              <label v-if="(textTruncate.length > 1)">

                <label v-if="isExpanded" @click="(isExpanded = false)">
                  {{ textTruncate[0] + textTruncate[1] }}
                </label>
                <label v-else>
                  {{ textTruncate[0] }} <a v-if="!isExpanded"> ... </a>
                </label>

              </label>
              <label v-else>
                {{ textTruncate[0] }}
              </label>
            </div>
            <div class="mt-2">
              <slot name="iconbar"></slot>
            </div>
            <div class="d-inline col-12 d-flex justify-content-end">
              <!-- <slot name="favoritebar"></slot> -->
            </div>
            <div class="card-text card-text-state d-flex justify-content-end"></div>
          </div>
        </div>
      </div>
      <div class="tp-product-rating-icon tp-product-rating-icon-2">

      </div>
      <div class="tp-product-price-wrapper-2">
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
import propsample from "@/assets/propsample.jpeg";
export default {
  components: {
    // PropertyCardIconBar,
  },
  name: "propertyCardComp",
  data() {
    return {
      isExpanded: false,
      spacing: true,
    };
  },
  props: {
    Title: { required: true, type: String },
    Id: { required: true, type: String }, // creditnumber
    BedsNumber: { required: false, type: Number },
    BatshNumber: { required: false, type: Number },
    ConstructionSize: { required: false, type: Number }, // constructionsize
    LotSize: { require: false, type: Number }, // lotsize
    Price: { required: true, type: Number },
    ParkingSpaces: { require: false, type: Number }, //parkingspaces
    Image: { required: true, type: String },
    City: { required: true, type: String },
    Settlement: { required: true, type: String },
    State: { required: true, type: String },
    Favorite: { required: false, type: Boolean },
    OnClick: { type: Function, default: null },
    IsSold: { required: false, type: Boolean, default: false },
  },
  computed: {
    textTruncateTitle() {
      if (this.Title.length > 30) return this.Title.trim().substring(0, 30)
      else return this.Title.trim()
    },
    textTruncate() {
      let array = [];
      const ubiDescription = this.Settlement.trim() + ',' + this.City.trim();

      if (ubiDescription.length > 36) {
        array.push(ubiDescription.substring(0, 35));
        array.push(ubiDescription.substring(35, ubiDescription.length));
      }
      else {
        array.push(ubiDescription);
      }
      return array;
    },
    priceFormated() {
      let currencESLocale = Intl.NumberFormat("es-MX");
      const price = currencESLocale.format(this.Price, {
        style: "currency",
        currency: "USD",
        
      });
      return `$${price}`;
    },
  },
  methods: {
    onClickTitle() {
      if (this.OnClick != null) {
        this.OnClick(this.Id);
      }
    },
    expandDescription() {
      // console.log('expandDescription');
      this.isExpanded = true;
    },
  },
};
</script>
  
<style scoped lang="scss">
.card-border {
  border-radius: 22px;
}
.card {
  // max-width: 24em;
  // max-height: 30em;

  background: #ffffff;

  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.14)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2));
  border-radius: 8px;
}

.card-img-top {

  cursor: pointer;
}

.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25em;
  line-height: 1.75;
  /* or 140% */

  cursor: pointer;
  letter-spacing: 0.15px;

  /* Grayscale/Main_Text */

  color: #63666a;
}

.card-text-price {
  font-family: "Roboto";
  font-style: normal;
  /* Brand/Blue */

  color: #0092bc;
}

.card-text-city {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 150% */

  letter-spacing: 0.5px;

  /* Grayscale/Main_Text */

  color: #63666a;
}

.card-text-state {
  /* Headline/H6 regular */

  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height, or 140% */

  letter-spacing: 0.15px;

  /* Grayscale/finastrategy_Dark_Gray */

  color: #484343;
}

.banner-sale {
  position: absolute;
  margin-top: 0.7rem;
  right: 0rem;
  width: 224px;
  height: 39px;

  background: #D60101;
  border-radius: 6px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;

  letter-spacing: 0.15px;
  padding-top: 5px;
  vertical-align: middle !important;

  color: #f8f8f8;
}

.tooltip-custom {
  position: relative;
  // border-bottom:1px dashed #000;
}

.tooltip-custom:before {
  content: attr(data-text);
  position: absolute;
  top: 100%;
  transform: translateY(-170%);
  top: 100%;
  margin-left: 5px;
  max-width: 300px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: #fff;
  text-align: center;
  font-size: 0.7em;
  display: none;
}

.tooltip-custom:hover:before {
  display: block;
}

@media only screen and (max-width: 900px) {
  .card {
    widows: 88vw;
  }
}
</style>