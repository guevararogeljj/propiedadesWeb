<template>
  <div class="propinfo p-3">
    <div>
      <div class="text-start">
        <p class="title">{{ Title }}</p>
      </div>
    </div>
    <div class="row">
      <div class="justify-content-left">
        <p>Desde:</p>
      </div>
      <div class="justify-content-left price">
        <p>{{ formatedCurrency }} MXN</p>
      </div>
      <div  v-if="IsLogin" class="col-12 text-start">{{ StreetName }}</div>
      <div class="text-start">{{ Description }}</div>
    </div>
  </div>
</template>

<script>
import utils from "@/core/utils/utils";
import ButtonFlat from "@/components/common/ButtonPrimary.vue";
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
export default {
  components: { ButtonPrimary, ButtonFlat },
  name: "propinfoComp",
  data() {
    return {
      info: {
        favorite: false,
        key: "",
        price: 352222,
        description: "Av. Jaime Balmes 8 Polanco, Ciudad de México.",
        name: "Departamento",
        streetname: "nuevo toledo 123",
      },
      isFavorite: false,
    };
  },
  props: {
    IsLogin: {
      type: Boolean,
      default: false,
    },
    Favorite: {
      type: Boolean,
      default: false,
    },
    Title: {
      type: String,
      default: () => "Departamento",
    },
    StreetName: {
      type: String,
      default: () => "Nuevo toledo #123",
    },
    Description: {
      type: String,
      default: () => "Av. Jaime Balmes 8 Polanco, Ciudad de México.",
    },
    Price: {
      type: Number,
      default: 0,
    },
    OnClickPropInfo: {
      type: Function,
      default: null,
    },
    OnClickShare: {
      type: Function,
      default: null,
    },
    OnClickFavorite: {
      type: Function,
      default: null,
    },
    OnClickPropGetInfo:{
      type: Function,
      default: null,
    }
  },
  computed: {
    formatedCurrency() {
      return utils.currencyFormart(this.Price);
    },
  },

  methods: {
    onClickFavoriteButton(val) {
      if (this.OnClickFavorite != null) {
        this.OnClickFavorite(val);
      }
    },
    onClickInfoButton() {
      if (this.OnClickPropInfo != null) {
        this.OnClickPropInfo();
      }
    },
    onClickShareButton() {
      if (this.OnClickShare != null) {
        this.OnClickShare();
      }
    },
    onClickGetInfo(){
      if(this.OnClickPropGetInfo !=null){
        // console.log('onClickGetInfo');
        this.OnClickPropGetInfo();
      }

    },
  },
};
</script>

<style scoped lang="scss">
.propinfo {
  max-width: 20.5em;
  background: rgba(0, 146, 188, 0.05);
  border-radius: 4px;
}
.btn.btn-primary {
  font-size: 0.8em;
}

.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;

  display: flex;
  align-items: center;

  color: #63666a;
}

.price {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.5px;

  color: #484343;
}
</style>