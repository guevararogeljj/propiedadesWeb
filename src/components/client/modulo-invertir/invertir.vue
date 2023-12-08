<template>
    <v-card class="banner">

        <v-card-title>
            <v-card-title>
                <div class="cardTitle" style="justify-content: center;">¿Deseas invertir?</div>
            </v-card-title>
            <v-card-text style="justify-content: center;">
                <br />
                <div class="subtitle">Contamos con asesoría especializada y gratuita
                </div>
            </v-card-text>
            <v-card-actions style="justify-content: center;">
             
                <v-btn variant="flat" v-if="!isLogin" @click="navigateLogin()" class="btnColor">Quiero invertir</v-btn>
                <v-btn variant="flat" v-else class="btnColorLogin">Quiero invertirs</v-btn>
            </v-card-actions>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    methods: {
        navigateLogin() {
            this.$router.push({ name: "login" });
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
            state() {
                return this.$store.state;
            },
        },
    }
}
</script>

<style lang="scss" scoped>
.subtitle {
    color: #FFF;
    text-align: center;
    /* Text/Regular/Regular */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 125% */
}

.banner {
    max-width: 500px;
    height: 180px;
    flex-shrink: 0;
    border-radius: 26px;
    background: var(--primary-500, #379BEC);

}

.btnColorLogin {
    margin: 0;
    display: flex;
    width: 169px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    color: var(--primary-300, #379BEC );
    background: var(--primary-500, #E3F1FC);
    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.btnColor {
    margin: 0;
    display: flex;
    width: 169px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: var(--primary-300, #E3F1FC);
    color: var(--primary-500, #379BEC);
    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.cardTitle {
    color: #FFF;
    text-align: center;
    font-family: Barlow;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: -0.5px;
    display: flex;
    justify-content: center;
}</style>