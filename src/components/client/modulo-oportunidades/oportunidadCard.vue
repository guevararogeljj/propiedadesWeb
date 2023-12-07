<template>
  <div :class="`tp-product-item-2 ${spacing ? 'mb-40' : ''}`">
    <div class="tp-product-thumb-2 p-relative z-index-1 fix w-img card-border">
      <img :src="Image" alt="property" height="250" />
      <div class="tp-product-content-1 pt-5">
        <div class="tp-product-tag-2" style="text-indent: 20px;">
          <span class="tooltip-custom" :data-text="Title">
            {{ this.State }}
          </span>
        </div>
        <div class="tp-product-title-2">
          <div class="card-text mt-3 card-text-price d-flex justify-content-start">
            {{ priceFormated }} MXN
          </div>
          <div class="card-text card-text-state">
            <div class="row">
              <div class="d-inline col-10 d-flex justify-content-start card-text-city">
                {{ State }}
              </div>
              <div class="card-text card-text-city d-flex justify-content-start">
                <label v-if="textTruncate.length > 1">
                  <label v-if="isExpanded" @click="isExpanded = false">
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
              <div style="text-indent: 20px;">
                <span class="title" :data-text="Title">
                  {{ textTruncateTitle }}
                  <a v-if="this.Title.length > 30"> ... </a>
                </span>
              </div>
              <div class="mt-2">
                <slot name="iconbar"></slot>
                <div class="tp-product-price-wrapper-2 center">
                  
                  <ButtonSecondary class="btn" Text="Ver detalles" @click="onClickTitle()" />
                </div>
              </div>
              <div class="d-inline col-12 d-flex justify-content-end">
                <!-- <slot name="favoritebar"></slot> -->
              </div>
              <div class="card-text card-text-state d-flex justify-content-end"></div>
            </div>
          </div>
        </div>
        <div class="tp-product-rating-icon tp-product-rating-icon-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import propsample from "@/assets/propsample.jpeg";
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
export default {
  components: {
    ButtonSecondary,
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
      if (this.Title.length > 30) return this.Title.trim().substring(0, 30);
      else return this.Title.trim();
    },
    textTruncate() {
      let array = [];
      const ubiDescription = this.Settlement.trim() + "," + this.City.trim();

      if (ubiDescription.length > 36) {
        array.push(ubiDescription.substring(0, 35));
        array.push(ubiDescription.substring(35, ubiDescription.length));
      } else {
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

.title {

  color: var(--secundarios-600, #000);
  /* Text/Small/Medium */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 142.857% */
  letter-spacing: -0.14px;
}

.center {
  text-align: center;
  margin: auto;
  padding: 10px;
}

.btn {
  display: flex;
  width: 347px;
  padding: 17px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  background: var(--primary-300, #E3F1FC);
  color: var(--primary-500, #379BEC);
  /* Text/Large/Medium */
  font-family: Barlow;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.18px;
}
.btn:hover {
  background: var(--primary-500, #379BEC);
  color: var(--primary-300, #E3F1FC);
}
.card-border {
  //text-indent: 40px;
  border-radius: 22px;
  border: 0.8px solid var(--secundarios-400, #E0E2E4);
  background: var(--secundarios-blanco, #FFF);
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
  text-indent: 20px;
  color: var(--secundarios-600, #000);
  font-family: Barlow;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.18px;
}

.card-text-city {
  color: var(--secundarios-600, #000);
  text-indent: 20px;
/* Text/Small/Regular */
font-family: Barlow;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.14px;
}

.card-text-state {
  color: var(--secundarios-600, #000);
  // text-indent: 20px;
  /* Text/Small/Regular */
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 142.857% */
  letter-spacing: -0.14px;
}

.banner-sale {
  position: absolute;
  margin-top: 0.7rem;
  right: 0rem;
  width: 224px;
  height: 39px;

  background: #d60101;
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
  color: var(--secundarios-600, #000);

  /* Heading/Semibold 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  /* 100% */
  letter-spacing: -0.5px;
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
