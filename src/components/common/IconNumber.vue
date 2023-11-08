<template>
  <div class="">
    <!-- <img
      :src="ImageUrl"
      :alt="AlterName"
      class="d-inline-block align-top"
      min-height="10"
      min-width="20"
    /> -->
    <v-icon :icon="Icon" :alt="AlterName">
    </v-icon>
    <!-- <v-img :src="ImageUrl" class="d-inline-block align-top"></v-img> -->
    <p class="d-inline font-property">{{ Text }} {{ Text2 }}</p>
  </div>
</template>
  
<script>
export default {
  name: "imageComp",
  props: {
    Icon: { type: String, required: true },
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