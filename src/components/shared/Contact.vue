<template>
  <div class="content">
    <v-row>
      <h1 class="center">Contáctenos</h1>
    </v-row>
    <v-col cols="6" class="center">
      <v-text-field
        density="compact"
        variant="outlined"
        label="Nombre completo"
        v-model="data.fullname"
      ></v-text-field>
    </v-col>
    <v-row>
      <v-col cols="6" class="center">
        <v-text-field
          density="compact"
          variant="outlined"
          label="Teléfono"
          v-model="data.cellphone"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="center">
        <v-text-field
          density="compact"
          variant="outlined"
          label="correo electrónico"
          v-model="data.email"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="center">
        <v-text-field
          density="compact"
          variant="outlined"
          label="Mensaje"
          v-model="data.message"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="center">
        <div class="row mt-3 pb-3">
        <div class="col-1"></div>
        <div class="col-lg-3 col-sm-12">
          <div class="form-check">
            <v-checkbox
              v-model="this.data.terms"
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Acepto el
              <a :href="DataPrivacityUrl" target="_blank" > Aviso de privacidad</a>.
            </label>
          </div>
        </div>
        <div class="col-4"></div>
        <div class="col-lg-4 col-sm-12 container-button">
          <button-secondary
            Text="ENVIAR MENSAJE"
            class=""
            :IsDisabled="sendActive"
            :OnClickButton="onClickButtonSend"
          />
        </div>
      </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
import utils from "@/core/utils/utils";
export default {
  components: { ButtonSecondary },
  name: "contactComp",
  data() {
    return {
      data: {
        fullname: "",
        email: "",
        cellphone: "",
        message: "",
        terms: false,
      },
    };
  },
  props: {
    OnClickSendData: { type: Function, default: null },
    DataPrivacityUrl: {
      type: String,
      default:
        "https://www.finastrategy.mx/wp-content/themes/finastrategy/assets/aviso-de-privacidad.pdf",
    },
  },
  methods: {
    onClickButtonSend() {
      if (this.OnClickSendData !== null) {
        this.OnClickSendData(this.data);
        utils.setAllPropsObject(this.data);
      }
    },
  },
  computed: {
    sendActive() {
      let active = false;
      if (!this.data.fullname) {
        active = true;
      }
      if (!this.data.email) {
        active = true;
      }
      if (!this.data.cellphone) {
        active = true;
      }
      if (!this.data.message) {
        active = true;
      }
      if (!this.data.terms) {
        active = true;
      }

      return active;
    },
  },
};
</script>

<style scoped lang="scss">
.center {
  margin: auto;
  padding: 10px;
}
</style>
