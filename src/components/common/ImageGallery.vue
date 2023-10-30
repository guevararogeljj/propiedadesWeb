<template>
<v-carousel v-model="photoActive" hide-delimiters>
    <v-carousel-item v-for="(item) in ItemSource" :key="item.photo">
      <v-img :src="item.photo" :alt="item.Description" class="d-block w-100 active-photo"></v-img>
      <v-carousel-caption v-if="ShowDescription">
        <h5>{{ item.title }}</h5>
        <p>{{ item.description }}</p>
      </v-carousel-caption>
    </v-carousel-item>
  </v-carousel>

  <v-carousel-control
    v-if="isFirstPhoto"
    prev
    class="bg-directional-button bg-gradient"
    :disabled="isFirstPhoto"
    @click="onClickBackButton"
  ></v-carousel-control>
  <v-carousel-control
    v-if="isFirstPhoto"
    next
    class="bg-directional-button bg-gradient"
    :disabled="isLastPhoto"
    @click="onClickNextButton"
  ></v-carousel-control>
  </template>
  
  <script>
  export default {
    name: "imageGalleryComp",
    data() {
      return {
        photoActive: 0,
      };
    },
    props: {
      ItemSource: {
        type: Array,
        default: () => [{ description: "", photo: "", title: "" }],
      },
      ShowDescription: { type: Boolean, default: false },
      ShowImageButtons: { type: Boolean, default: false },
    },
  
    methods: {
      onClickNextButton() {
        this.photoActive++;
      },
      onClickBackButton() {
        this.photoActive--;
      },
      onClickImageButton(index) {
        this.photoActive = index;
      },
    },
    computed: {
      isFisrtPhoto() {
        return this.photoActive === 0;
      },
      isLastPhoto() {
        return this.photoActive === this.ItemSource.length - 1;
      },
      isFirstPhoto() {
        return this.ItemSource.length > 1;
      }
    },
    watch: {
      photoActive() {
        // console.log(this.ItemSource);
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
   .v-carousel {
    box-shadow: none;
    border: none;
  }
  .active-photo{
    height: 500px;
    object-fit: contain;
  }
  
  .bg-directional-button{
    background: lightgray;
  }
  
  @media only screen and (max-width: 900px) {
    .active-photo{
    height: 300px;
    }
  }
  </style>