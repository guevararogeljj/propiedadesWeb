<template>
  <v-container fluid class="content">
    
    <v-row align="center" justify="center">
      <span class="h1 color-black">Encuentra la</span>&nbsp;
      &nbsp;<span class="h1 color-primary"> oportunidad de inversión </span>&nbsp;
    </v-row>
    <v-row  align="center" justify="center">
      <span class="h1 color-black">a tu medida</span>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-card class="card-cesion" flat>
          <!-- Card content goes here -->
          <v-card-title></v-card-title>
          <v-card-text>
            <!-- More card content -->
          </v-card-text>
        </v-card>
        <div>
          <strong class="textCenter">
          <p>
            <strong class="textCenter">Cesión de derechos</strong>
          </p>
        </strong>
          <div class="textCardItemsUno" style="margin: 0;">
            La cesión de derechos de un crédito hipotecario es un acto jurídico mediante el cual un acreedor denominado "Cedente" transmite / transfiere a otra persona llamado "Cesionario" los derechos, créditos y obligaciones que tiene contra su deudor a través de un contrato.
          </div>
        </div>
      </v-col>
      <v-col cols="auto"></v-col>
      <v-col cols="auto"></v-col>
      <v-col  cols="auto">
        <v-card class="card-venta" flat>
          <!-- Card content goes here -->
          <v-card-title></v-card-title>
          <v-card-text>
            <!-- More card content -->
          </v-card-text>
        </v-card>
        <div>
          <strong class="textCenter">
            <p>
              <strong class="textCenter">Venta de inmuebles</strong>
            </p>
          </strong>
          <div class="textCardItemsDos">
            Es la compraventa de un bien inmueble en donde se transfieren todos los derechos y obligaciones del mismo a cambio de una contraprestación.
          </div>
        </div>
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
  width: 300px;
  max-width: max-content;
  text-align: start;
  margin: 0 auto;
  min-width: none;
  text-align: center;
}
.textCardItemsDos {
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
  color: #379BEC!important;
}
.color-black {
  color: #000000!important;

}
</style>