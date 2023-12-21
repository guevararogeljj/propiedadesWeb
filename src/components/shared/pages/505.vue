<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2" md="6" align="center">
          <v-card flat align="center">
            <v-card-title>
              <v-img class="notfound" :src="notfound"></v-img>
              <br />
              <p class="title">505</p>
            </v-card-title>
            <v-card-text>
              <v-form>
                <p class="subtitle">La versión HTTP no es compatible con el servidor</p>
                <p class="subtitle2">
                    Lamentamos las molestias. Por favor intenta actualizar tu navegador y si el problema persiste contáctanos
                </p>
                <!-- <v-btn color="primary3" class="lowercase-text btn" @click="navigateLogin()">Inicio</v-btn> -->
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script>
  import notfound from "@/assets/notfound.png";
  export default {
    data() {
      return {
        notfound,
      };
    },
    methods: {
      navigateLogin() {
        this.$router.push("/");
      },
    },
  }
  </script>
  <style>
  .btn {
    display: flex;
    width: 236px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: var(--primary-500, #379BEC);
  }
  
  .lowercase-text {
    font-family: Barlow;
    text-transform: capitalize;
    margin-right: 10px;
  }
  
  .notfound {
    margin: auto;
    width: 235.755px;
    height: 199.23px;
    flex-shrink: 0;
  
  }
  
  .custom-card {
    height: 400px;
    /* Set the desired height */
    width: 600px;
    /* Set the desired width */
  }
  
  .form {
    margin: auto;
    min-width: 320px;
  }
  
  .title {
    width: 184px;
    height: 83px;
    flex-shrink: 0;
    color: var(--primary-500, #379BEC);
    text-align: center;
    font-family: Barlow;
    font-size: 90px;
    font-style: normal;
    font-weight: 500;
    line-height: 52.83px;
    /* 58.7% */
    letter-spacing: -2.7px;
  }
  
  .subtitle {
    height: 80px;
    width: 303px;
    text-align: center;
    color: var(--secundarios-600, #000);
    text-align: center;
    width: auto;
    height: auto;
    /* Heading/Large2 */
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    /* 100% */
    letter-spacing: -1.2px;
  }
  
  
  
  
  
  .subtitle2 {
  
    height: 109px;
    flex-shrink: 0;
    color: #000;
    text-align: center;
  
    /* Text/Large/Regular */
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  </style>
    