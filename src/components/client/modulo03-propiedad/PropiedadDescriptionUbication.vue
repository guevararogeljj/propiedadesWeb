<template>
  <p :class="{ 'text-start': TextLeft }" style="text-align: justify">
    {{ PropertyDescription }}
  </p>
  <title-description Title="Ubicación:" :Description="UbicacionDescription" />
<p class="title">Mapa</p>
      <v-img
        v-if="isLocation()"
        class="map-banner"
        alt="Ubicación"
        :src="LocationBanner"
        @click="onClickImageLocation"
      />

      <v-img
        v-else
        class="map-banner-no-found"
        alt="Ubicación no encotrada"
        :src="MissedBaner"
      />

</template>
  
  <script>
import TitleDescription from "@/components/shared/TitleDescription.vue";
import LocationBanner from "@/assets/location_banner.svg";
import MissedBaner from "@/assets/location_missed_banner.jpg";
export default {
  components: { TitleDescription },
  props: {
    PropertyDescription: { type: String, default: "" },
    UbicacionDescription: { type: String, default: "" },
    TextLeft: { type: Boolean, default: false },
    Latitude: { type: String, default: "" },
    Longitude: { type: String, default: "" },
    UrlMap: {
      type: String,
      default:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14384.772443497423!2d-100.330348!3d25.6648925!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x79d734ad65ae902c!2sfinastrategy%20MX!5e0!3m2!1ses!2smx!4v1653245658459!5m2!1ses!2smx",
    },
    IsLogin: { type: Boolean, default: false },
    NoLoginImage: { type: Function, default: null },
  },
  methods: {
    onClickImageLocation() {
      if (this.IsLogin) {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${this.Latitude}%2C${this.Longitude}`
        );
      } else {
        if (this.NoLoginImage != null) {
          this.NoLoginImage();
        }
      }
    },
    isLocation() {
      if (
        (this.Latitude === null && this.Longitude === null) ||
        (this.Latitude === "" && this.Longitude === "")
      )
        return false;
      return true;
    },
  },
  data: () => {
    return {
      LocationBanner,
      MissedBaner,
    };
  },
};
</script>
  
  <style scoped lang="scss">
  .title {
  /* Headline/H3 regular */

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 48px;
  /* or 100% */

  display: flex;
  align-items: center;

  /* Grayscale/Main_Text */

  color: #63666a;
}
.map-banner {
  width: 100%;
  height: 350px;
  cursor: pointer;
}
.map-banner-no-found {
  width: 100%;
  height: 350px;
  cursor: pointer;
}
</style>