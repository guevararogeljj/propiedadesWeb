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
        <div>
          <strong class="textCenter">
          <p>
            <strong class="textCenter">Cesión de derechos</strong>
          </p>
        </strong>
          <p class="textCardItems">
            Es un contrato por el cual la parte cedente enajena su derecho
            legalmente cedible en favor de otra persona denominada cesionario,
            para que éste lo ejerza en su propio nombre. La cesión es siempre un
            acto jurídico inter-vivos, por lo que para perfeccionarse se
            requiere que sea a través de escritura pública.
          </p>
        </div>
      </v-col>
      <v-col cols="auto">
        <v-card class="card-venta">
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
          <p class="textCardItems">
            Es un contrato por el cual la parte cedente enajena su derecho
            legalmente cedible en favor de otra persona denominada cesionario,
            para que éste lo ejerza en su propio nombre. La cesión es siempre un
            acto jurídico inter-vivos, por lo que para perfeccionarse se
            requiere que sea a través de escritura pública.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
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

.textCardItems {
  width: 300px;
  max-width: max-content;
  text-align: justify;
  margin: 0 auto;
  min-width: none;
}

.textCenter {
  text-align: center;
  align-content: center;
}
</style>