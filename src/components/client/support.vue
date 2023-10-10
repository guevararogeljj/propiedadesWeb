<template>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows="hover"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center">
            <div>
              {{ slide }} 
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </template>
  <script>
    export default {
      data () {
        return {
          colors: [
            'indigo',
            'indigo',
          ],
          slides: [
            'Apoyo 1',
            'Apoyo 2'

          ],
        }
      },
    }
  </script>