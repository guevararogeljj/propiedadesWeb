<template>
    <v-container>
        <v-row justify="center" style="text-align: center;">
            <v-col cols="12" sm="8" md="6">
                <svg  class="iconExitoso" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
<mask id="mask0_1629_28200" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
<rect width="120" height="120" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_1629_28200)">
<path d="M60.0082 107.5C53.4386 107.5 47.2634 106.253 41.4828 103.76C35.702 101.266 30.6736 97.8827 26.3975 93.6085C22.1213 89.3343 18.736 84.3081 16.2416 78.5299C13.7472 72.7518 12.5 66.5779 12.5 60.0083C12.5 53.4386 13.7469 47.2634 16.2406 41.4828C18.7344 35.702 22.1188 30.6736 26.3938 26.3975C30.6688 22.1213 35.6958 18.736 41.475 16.2416C47.2541 13.7472 53.429 12.5 59.9999 12.5C65.2669 12.5 70.2503 13.2917 74.9501 14.875C79.65 16.4583 83.9614 18.6667 87.8844 21.5L82.4615 27.048C79.2308 24.8237 75.7311 23.0929 71.9626 21.8556C68.1941 20.6185 64.2065 19.9999 59.9999 19.9999C48.9165 19.9999 39.479 23.8957 31.6874 31.6874C23.8957 39.479 19.9999 48.9165 19.9999 59.9999C19.9999 71.0832 23.8957 80.5207 31.6874 88.3124C39.479 96.104 48.9165 99.9999 59.9999 99.9999C71.0832 99.9999 80.5207 96.104 88.3124 88.3124C96.104 80.5207 99.9999 71.0832 99.9999 59.9999C99.9999 58.2435 99.8845 56.5064 99.6538 54.7886C99.4229 53.071 99.0768 51.401 98.6153 49.7786L104.673 43.673C105.589 46.2435 106.29 48.8878 106.774 51.6059C107.258 54.324 107.5 57.122 107.5 59.9999C107.5 66.5707 106.253 72.7457 103.76 78.5248C101.266 84.3039 97.8827 89.331 93.6085 93.606C89.3343 97.881 84.3081 101.265 78.5299 103.759C72.7518 106.253 66.5779 107.5 60.0082 107.5ZM52.9038 81.269L33.3846 61.7499L38.6538 56.4808L52.9038 70.7308L102.231 21.327L107.5 26.5961L52.9038 81.269Z" fill="#379BEC"/>
</g>
</svg>
</v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <div class="title">
                    La Verificación en 2 pasos se ha activado exitosamente
                </div>
                <div class="textoUno">
                    A partir de este momento utiliza tu Autenticador
para completar tu inicio de sesión.
                </div>
                <v-btn flat class="siguiente" @click="onClickIngresar()">
                    Ingresar
                </v-btn>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
export default {
    methods: {
        onClickIngresar() {
            this.$router.push({ name: "login" });
      }
    }
}

</script>
<style scoped lang="scss">
.iconExitoso{
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    margin: auto;
}
.title {
    color: var(--Secundarios-600, #000);
    text-align: center;
    /* Heading/Large2 */
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    /* 100% */
    letter-spacing: -1.2px;
    margin: 41px auto;
    width: 471px;
    height: 80px;
}
.textoUno {
    width: 900px;
    color: var(--Secundarios-600, #000);
    text-align: center;
    /* Text/Large/Medium */
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.18px;
}
.siguiente {
    display: flex;
    width: 394px;
    height: 56px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 36px 230px;
    border-radius: 12px;
    background: var(--Primary-500, #379BEC);
    color: var(--Secundarios-Blanco, #FFF);
}
@media screen and (max-width: 1919px) {
    .siguiente {
        display: flex;
        width: 394px;
        height: 56px;
        padding: 18px 16px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 36px 110px;
        border-radius: 12px;
        background: var(--Primary-500, #379BEC);
        color: var(--Secundarios-Blanco, #FFF);
    }

    .textoUno {
    width: 606px;
    color: var(--Secundarios-600, #000);
    text-align: center;
    /* Text/Large/Medium */
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.18px;
}
}
</style>