<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <div class="titleOne">
                    Confirma tu identidad
                </div>
                <br />
                <div class="subtitleOne">
                    Hemos validado tu Identidad a través de tu INE.
                </div>
                <div class="subtitleOne">
                    Para continuar por favor confirma que los datos detectados son correctos.
                </div>
                <br />
                <v-card class="card">
                    <v-card-title>
                    </v-card-title>
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Nombre
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ data.names  }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Apellido Paterno
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ data.lastname }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Apellido Materno
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ data.lastname2 }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Fecha de Nacimiento
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ data.birthday }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Entidad de Registro
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                {{ data.birthplace }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="6" class="labels">
                                Género
                            </v-col>
                            <v-col cols="12" sm="8" md="6" class="labels-info">
                                <input id="men" v-model="data.gender" disabled class="form-radio form-control-custom"
                                    type="radio" value="HOMBRE" />
                                    Hombre
                                <input id="women" v-model="data.gender" disabled class="form-radio form-control-custom ms-4"
                                    type="radio" value="MUJER" />
                                    Mujer
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn class="btnEditar" @click="onClickNextButton">Confirmar</v-btn>
                    </v-card-actions>
                </v-card>
                <br />

            </v-col>
        </v-row>
    </v-container>
    <!-- <div class="main-container">
      <div class="container wrapper-container pt-3 pb-4 mt-3">
        <div class="row mb-2">
          <div class="col-12 title justify-content-center">Validar Datos</div>
          <div class="col-12 subtitle mt-1">Validar la siguiente información</div>
        </div>
  
        <form method="post">
          <div class="row justify-content-center">
            <input type="hidden" name="csrf" :value="true" />
            <div class="col-12 d-flex justify-content-center w-95">
              <input
                v-model="data.names"
                disabled
                class="form-control form-control-custom"
                type="text"
                placeholder="Nombre(s)"
              />
            </div>
            <div class="col-12 d-flex justify-content-center w-95">
              <input
                v-model="data.lastname"
                disabled
                class="form-control form-control-custom disable"
                type="text"
                placeholder="Apellido Paterno"
              />
            </div>
            <div class="col-12 d-flex justify-content-center w-95">
              <input
                v-model="data.lastname2"
                disabled
                class="form-control form-control-custom"
                type="text"
                placeholder="Apellido Materno"
              />
            </div>
            <div class="col-12 d-flex justify-content-center w-95">
              <input
                v-model="data.birthday"
                disabled
                class="form-control form-control-custom"
                type="text"
                placeholder="Fecha de nacimiento"
              />
            </div>
            <div class="col-12 d-flex justify-content-center w-95">
              <input
                v-model="data.birthplace"
                disabled
                class="form-control form-control-custom"
                type="text"
                placeholder="Lugar de nacimiento"
              />
            </div>
            <label>Sexo</label>
            <div class="col-12 d-flex justify-content-center w-95">
              <input
                id="men"
                v-model="data.gender"
                disabled
                class="form-radio form-control-custom"
                type="radio"
                value="HOMBRE"
              />
              <label class="form-radio-label check-confirm" for="men">
                Hombre
              </label>
  
              <input
                id="women"
                v-model="data.gender"
                disabled
                class="form-radio form-control-custom ms-4"
                type="radio"
                value="MUJER"
              />
              <label class="form-radio-label check-confirm" for="women">
                Mujer
              </label>
            </div>
  
            <div class="col-12 d-flex justify-content-center">
              <br />
              <br />
              <br />
              <br />
  
              <div class="form-check w-95 mt-5">
                <input
                  v-model="terms"
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <label
                  class="form-check-label check-confirm"
                  for="flexCheckDefault"
                >
                  Acepto que mis datos son correctos.
                </label>
              </div>
            </div>
  
            <div class="row w-95 mt-2">
              <div class="col-12">
                <button-primary
                  Text="Siguiente"
                  :OnClickButton="onClickNextButton"
                  :disabled="validateForm"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div> -->
</template>
  
<script>
import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
import userservice from "@/core/services/userservice";
import antiforgery from "@/core/services/antiforgery";
export default {
    components: {
        ButtonPrimary,
    },
    name: "validacionDatosComp",
    data() {
        return {
            data: {
                names: "",
                lastname: "",
                lastname2: "",
                birthday: "",
                birthplace: "",
                gender: "",
            },
            terms: false,
        };
    },
    props: {
        EnableNextButton: { type: Boolean, default: true },
    },
    methods: {
        Loading(value) {
            this.$store.state.isLoading = value;
        },
        async onClickNextButton() {
            this.Loading(true);

            //const data = { terms: this.terms, email: this.store.email };
            const data = { terms: this.terms, cellphone: this.store.cellphone };
            const result = await userservice.updatedata(data);

            if (result.success) {
                this.$store.state.email = "";
                this.$store.state.cellphone = "";
                //this.$router.push({ name: "registrationended" });
                this.$router.push({ name: "fiscaldata" });
            } else {
                // console.log(result);
                alert(result.message);
            }
            this.Loading(false);
        },
        onClickCalcelButton() { },
        async sendUserData() { },
    },
    computed: {
        validateForm() {
            let dontactive = false; // if is false, the button turns to active mode, false deactive the button

            if (!this.terms) {
                dontactive = true;
            }

            return dontactive;
        },
        store() {
            return this.$store.state;
        },
        isLogin() {
            return this.state.isLogin;
        },
        state() {
            return this.$store.state;
        },
    },
    async mounted() {
        this.Loading(true);
        const data = await userservice.validatedata({ cellphone: this.store.cellphone });
        // console.log(data);
        this.data = data.result;
        await antiforgery.get();
        this.Loading(false);
        const aft = await antiforgery.get();
        this.store.requesttoken = aft;
    },
};
</script>
<style scoped lang="scss" >
.titleOne {
    color: var(--secundarios-600, #000);
    text-align: center;

    /* Heading/Large2 */
    font-family: Barlow;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    /* 100% */
    letter-spacing: -1.2px;
}

.subtitleOne {
    color: var(--secundarios-600, #000);
    text-align: center;

    /* Text/Regular/Medium */
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 125% */
    letter-spacing: -0.16px;
}

.btnEditar {
    margin: auto;
    color: #FFF;
    display: flex;
    width: 336.467px;
    height: 54.83px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--primary-500, #379BEC);
}

.labels {
    text-indent: 4rem;
    flex-shrink: 0;
    color: var(--secundarios-500, #959DA4);
    /* Text/Small/Medium */
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    /* 142.857% */
    letter-spacing: -0.14px;
}

.labels-info {
    text-indent: 4rem;
    color: var(--secundarios-600, #000);
    /* Text/Small/Regular */
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 142.857% */
    letter-spacing: -0.14px;
}

.card {
    margin: auto;
    max-width: 537px;
    min-height: 400px;
    height: auto;
    flex-shrink: 0;
    border-radius: 23px;
    border: 1px solid var(--secundarios-400, #E0E2E4);
    background: var(--secundarios-blanco, #FFF);
}

.cardSecundary {
    margin: auto;
    max-width: 537px;
    flex-shrink: 0;
    border-radius: 23px;
    border: 1px solid var(--secundarios-400, #E0E2E4);
    background: var(--secundarios-blanco, #FFF);
}

.subtitle {
    color: var(--secundarios-600, #000);
    text-align: center;
    /* Heading/Medium 1 */
    font-family: Barlow;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
}
</style>