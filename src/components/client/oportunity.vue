<template>
    <v-row class="content">
        <h1 class="center">{{title}}</h1>
      <v-col cols="12">
        <v-carousel v-model="model">
          <v-carousel-item>
            <v-sheet class="content">
              <v-container fill-height>
                <v-row>
                  <v-col cols="4">
                    <v-card min-height="300" class="my-card">
                      <v-card-title></v-card-title>
                      <v-card-text>
                      
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card min-height="300" class="my-card">
                      <v-card-title></v-card-title>
                      <v-card-text>

                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card min-height="300" class="my-card">
                      <v-card-title></v-card-title>
                      <v-card-text>

                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-carousel-item>
          <v-carousel-item>
            <v-sheet class="content">
              <v-container fill-height>
                <v-row>
                  <v-col cols="4">
                    <v-card min-height="300" class="my-card">
                      <v-card-title></v-card-title>
                      <v-card-text>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card min-height="300" class="my-card">
                      <v-card-title></v-card-title>
                      <v-card-text>

                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card min-height="300" class="my-card">
                      <v-card-title></v-card-title>
                      <v-card-text>

                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "CarouselExample",
  props: {
    title: {
      type: String,
      default: "Oportunidades",
    },
  },
  data: () => ({
    model: 0,
  }),
};
</script>
<style scoped>

.center {
      margin: auto;
      padding: 10px;
    }
</style>
