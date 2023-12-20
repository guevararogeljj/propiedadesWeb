<template>
  <v-container fluid class="content">
    <v-row align="center" justify="center">
      <span class="h1 color-black">Encuentra la</span>&nbsp; &nbsp;<span
        class="h1 color-primary"
      >
        oportunidad de inversión </span
      >&nbsp;
    </v-row>
    <v-row align="center" justify="center">
      <span class="h1 color-black">a tu medida</span>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-card flat>
          <!-- Card content goes here -->
          <v-card-title> </v-card-title>
          <v-card-text>
            <div class="card-cesion"></div>
            <div>
              <strong class="textCenter">
                <p>
                  <strong class="textCenter">Cesión de derechos</strong>
                </p>
              </strong>
              <div class="textCardItemsUno">
                La cesión de derechos de un crédito hipotecario es un acto
                jurídico mediante el cual un acreedor denominado "Cedente"
                transmite / transfiere a otra persona llamado "Cesionario" los
                derechos, créditos y obligaciones que tiene contra su deudor a
                través de un contrato.
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="auto"></v-col>
      <v-col cols="auto"></v-col>
      <v-col cols="auto">
        <v-card flat>
          <!-- Card content goes here -->
          <v-card-title> </v-card-title>
          <v-card-text>
            <div class="card-venta"></div>
            <div>
              <strong class="textCenter">
                <p>
                  <strong class="textCenter">Venta de inmuebles</strong>
                </p>
              </strong>
              <div class="textCardItemsDos">
                Es la compraventa de un bien inmueble en donde se transfieren
                todos los derechos y obligaciones del mismo a cambio de una
                contraprestación.
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.salto {
  width: 100%;
  height: 100px;
  flex-shrink: 0;
}
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
  background-position: center;
}
.textCardItemsUno {
  height: 120px;
  width: 300px;
  max-width: max-content;
  text-align: start;
  margin: 0 auto;
  min-width: none;
  text-align: center;
}
.textCardItemsDos {
  height: 120px;
  width: 300px;
  max-width: max-content;
  text-align: end;
  margin: 0 auto;
  min-width: none;
  text-align: center;
}

.textCenter {
  text-align: center;
  align-content: center;
}
.color-primary {
  color: #379bec !important;
}
.color-black {
  color: #000000 !important;
}

@media screen and (max-width: 767px) {
  .card-cesion {
    background-image: url("@/assets/icono-cesion-de-derechos-clean-mobile.png");
    width: 250px;
    height: 189.205px;
    flex-shrink: 0;
  }

  .card-venta {
    background-image: url("@/assets/icon-venta-de-inmuebles-finsatretegy-clean-mobile.png");
    width: 250px;
    height: 189.205px;
    flex-shrink: 0;
  }
  .textCardItemsUno {
    height: 120px;
    width: auto;
    max-width: max-content;
    margin: 0 auto;
    min-width: none;
    text-align: center;
  }
  .textCardItemsDos {
    height: 120px;
    width: auto;
    max-width: max-content;
    margin: 0 auto;
    min-width: none;
    text-align: center;
  }
}
</style>
