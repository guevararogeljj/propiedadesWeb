
<template>
  <!-- <div class="row ms-1" v-if="!DetailsMode">
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-bathtub" AlterName="beds" :Text="BebsQuantity" :Text2="BedsUnits"></IconNumber>
    </div>
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-bed" AlterName="baths" :Text="BathsQuantity" :Text2="BathsUnits"></IconNumber>
    </div>
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-image-size-select-small" AlterName="living size" :Text="LivingSize" :Text2="LivinSizeUnits"></IconNumber>
    </div>
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-domain" AlterName="Construction size" :Text="ConstructionSize"
        :Text2="ConstructionSizeUnits"></IconNumber>
    </div>
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-car" AlterName="parkinglot" :Text="ParkingLots"></IconNumber>
    </div>
  </div>
  <div class="row ms-1" v-if="DetailsMode">
    <div class="col-6 text-start mt-3">
      <IconNumber Icon="mdi-bed" AlterName="beds" :Text="BebsQuantity" :Text2="BedsUnits"></IconNumber>
    </div>
    <div class="col-6 text-start mt-3">
      <IconNumber Icon="mdi-bathtub" AlterName="baths" :Text="BathsQuantity" :Text2="BathsUnits"></IconNumber>
    </div>

    <div class="col-6 text-start mt-3">
      <IconNumber Icon="mdi-image-size-select-small" AlterName="living size" :Text="LivingSize" :Text2="LivinSizeUnits"></IconNumber>
    </div>
    <div class="col-6 text-start mt-3">
      <IconNumber Icon="mdi-domain" AlterName="Construction size" :Text="ConstructionSize" :Text2="ConstructionSizeUnits"></IconNumber>
    </div>
    <div class="col-6 text-start mt-3">
      <IconNumber Icon="mdi-car" AlterName="parkinglot" :Text="ParkingLots" :Text2="ParkingUnits"></IconNumber>
    </div>
  </div> -->
  <div class="row ms-1" v-if="!DetailsMode">
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-crop-landscape" AlterName="Construction size" :Text="ConstructionSize" :Text2="ConstructionSizeUnits"></IconNumber>
    </div>
    <div class="col-4 text-start">
      <IconNumber Icon="mdi-bed-king-outline" AlterName="beds" :Text="BebsQuantity" :Text2="BedsUnits"></IconNumber>
    </div>
      <div class="col-4 text-start">
        <IconNumber Icon="mdi-shower-head" AlterName="baths" :Text="BathsQuantity" :Text2="BathsUnits"></IconNumber>
      </div>
      <div class="col-4 text-start">
        <IconNumber Icon="mdi-car" AlterName="parkinglot" :Text="ParkingLots" :Text2="ParkingUnits"></IconNumber>
      </div>
      <div class="col-4 text-start">
        <IconNumber Icon="mdi-image-size-select-small" AlterName="living size" :Text="LivingSize" :Text2="LivinSizeUnits"></IconNumber>
      </div>
    </div>
    <div class="row ms-1" v-if="DetailsMode">
      <div class="col-6 text-start mt-3">
        <IconNumber Icon="mdi-crop-landscape" AlterName="Construction size" :Text="ConstructionSize" :Text2="ConstructionSizeUnits"></IconNumber>
      </div>
      <div class="col-6 text-start mt-3">
        <IconNumber Icon="mdi-bed-king-outline" AlterName="beds" :Text="BebsQuantity" :Text2="BedsUnits"></IconNumber>
      </div>

      <div class="col-6 text-start mt-3">
        <IconNumber Icon="mdi-shower-head" AlterName="baths" :Text="BathsQuantity" :Text2="BathsUnits"></IconNumber>
      </div>
      <div class="col-6 text-start mt-3">
        <IconNumber Icon="mdi-car" AlterName="parkinglot" :Text="ParkingLots" :Text2="ParkingUnits"></IconNumber>
      </div>
      <div class="col-6 text-start mt-3">
        <IconNumber Icon="mdi-image-size-select-small" AlterName="living size" :Text="LivingSize" :Text2="LivinSizeUnits"></IconNumber> 
      </div>
    </div>

</template>
  
<script>
import IconNumber from "@/components/common/IconNumber.vue";
import bathIcon from "@/assets/baths_icon.svg";
import bedIcon from "@/assets/beds_icon.svg";
import sizeIcon from "@/assets/size_icon.svg";
import parkingLots from "@/assets/parkinglots_icon.svg";
import constructionSize from "@/assets/constructionsize_icon.svg";
export default {
  name: "propertyCardIconBarComp",
  components: {
    IconNumber,
  },
  props: {
    BathsQuantity: { type: Number, required: true },
    BathsUnits: { type: String, required: false, default: '' },
    BebsQuantity: { type: Number, required: true },
    BedsUnits: { type: String, required: false, default: '' },
    LivingSize: { type: Number, required: true },
    LivinSizeUnits: { type: String, required: false, default: '' },
    ParkingLots: { type: Number, required: true },
    ParkingUnits: { type: String, required: false, default: '' },
    ConstructionSize: { type: Number, required: true },
    ConstructionSizeUnits: { type: String, required: false, default: '' },
    DetailsMode: { type: Boolean, default: false },

  },
  data() {
    return {
      bathIcon,
      bedIcon,
      sizeIcon,
      parkingLots,
      constructionSize,
    };
  },
};
</script>
  
<style></style>