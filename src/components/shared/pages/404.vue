<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="error-card">
            <v-card-title class="error-title">404 - Página no encontrada</v-card-title>
            <v-card-text class="error-text">Lo sentimos, la página que estás buscando no existe.</v-card-text>
            <v-card-actions>
              <v-btn color="primary" to="/">Volver a la página de inicio</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style>
  .error-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  
  .error-title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .error-text {
    margin-bottom: 20px;
  }
  </style>
  