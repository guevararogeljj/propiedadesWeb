<template>
  <v-container fluid class="content">
    <v-row align="center" justify="center">
      <h1>Encuentra la oportunidad de inversión a tu medida</h1>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-card class="card-cesion">
          <!-- Card content goes here -->
          <v-card-title></v-card-title>
          <v-card-text>

            <!-- More card content -->
          </v-card-text>
        </v-card>
        <div align="center" justify="center"><strong>Cesión de derechos</strong></div>
      </v-col>
      <v-col cols="auto">
        <v-card class="card-venta">
          <!-- Card content goes here -->
          <v-card-title></v-card-title>
          <v-card-text>
            <!-- More card content -->
          </v-card-text>
        </v-card>
        <div align="center" justify="center"><strong>Venta de inmuebles</strong></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
.card-cesion {
  background-image: url("@/assets/icono-cesion-de-derechos-clean.png");
  background-position: cover;
  height: 202.5px;
  width: 260.7px;
  background-color: transparent;
  border-color: transparent;
}

.card-venta {
  background-image: url("@/assets/icon-venta-de-inmuebles-finsatretegy-clean.png");
  background-position: cover;
  height: 202.5px;
  width: 260.7px;
  background-color: transparent;
  border-color: transparent;
}
</style>