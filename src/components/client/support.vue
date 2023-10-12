<template>
  <div class="content">
  <v-row>
    <h1 class="center">Te apoyamos en tu proceso</h1>
  </v-row>
  <v-col cols="12">
    <div>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="i in 3"
        :key="i"
        title="Apoyo..."
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      ></v-expansion-panel>
    </v-expansion-panels>
  </div>
  </v-col>
  </div>
  </template>
  <script>
    export default {
      data () {
        return {
          colors: [
            '#EAECEE',
            '#EAECEE',
          ],
          slides: [
            'Apoyo 1',
            'Apoyo 2'

          ],
        }
      },
    }
  </script>
  <style scoped>
    .center {
      margin: auto;
      padding: 10px;
    }
  </style>