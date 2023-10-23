<template>
  <div class="">
    <img :src="ImageUrl" :alt="AlterName" class="d-inline" />
    <!-- <v-img src='@/assets/batt'  :width="300" aspect-ratio="16/9" cover></v-img> -->
    <p class="d-inline font-property">{{ Text }} {{ Text2 }}</p>
  </div>
</template>
  
<script>

export default {
  name: "imageComp",
  props: {
    ImageUrl: { type: String, required: true },
    AlterName: {
      type: String,
      default: () => {
        return "img";
      },
    },
    Text: { type: Number, required: true },
    Text2: { type: String, required: false },
  },
};
</script>
  
<style scoped lang="scss" >
p {
  margin-left: 0.5em;
}

.font-property {
  font-size: 0.8em;
}
</style>