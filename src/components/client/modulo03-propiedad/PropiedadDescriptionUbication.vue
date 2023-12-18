<template>
  <p :class="{ 'text-start': TextLeft }" style="text-align: justify">
    {{ PropertyDescription }}
  </p>
  <title-description Title="Ubicación:" :Description="UbicacionDescription" />

  <p class="title">Mapa</p>
  <v-row style="align-items: center">
    <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3" align="center">
      <v-img v-if="isLocation()" class="map-banner" alt="Ubicación" :src="LocationBanner" @click="onClickImageLocation" />
      <v-img v-else class="map-banner-no-found" alt="Ubicación no encotrada" :src="MissedBaner" />
    </v-col>
  </v-row>
</template>
  
<script>
import TitleDescription from "@/components/shared/TitleDescription.vue";
import LocationBanner from "@/assets/location_banner.svg";
import MissedBaner from "@/assets/location_missed_banner.png";
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
  color: var(--secundarios-600, #000);

  /* Heading/Medium 1 */
  font-family: Barlow;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
}

.map-banner {
  margin: 0;
  display: flex;
  width: 1242px;
height: 340px;
flex-shrink: 0;
border-radius: 26px;

}

.map-banner-no-found {
  margin: 0;
  display: flex;
  width: 1242px;
height: 340px;
flex-shrink: 0;
border-radius: 26px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
}
</style>