<template>
    <div class="container-show">
      <div class="container-video">
        <video ref="videoElement" v-show="showVideo" autoplay></video>
        <div v-show="showVideo" class="photo-margin-tops"></div>
      </div>

      <ButtonPrimary
        Text="Tomar foto"
        :OnClickButton="takePhoto"
        v-show="showVideo"
      />
      <div v-show="!showVideo">
        <img :src="this.photo" alt="Foto tomada" class="preview-img" />
        <div class="container-buttons">
          <ButtonPrimary Text="Aceptar" :OnClickButton="acceptPhoto" />
          <div><br /></div>
          <ButtonSecundary Text="Cancelar" :OnClickButton="cancelPhoto" />
        </div>
      </div>
    </div>
  </template>
  <script>
  import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
  import ButtonSecundary from "@/components/common/ButtonSecondary.vue";
  import router from "@/router";
  import { mapMutations } from "vuex";
  export default {
    components: {
      ButtonPrimary,
      ButtonSecundary,
    },
    data() {
      return {
        showVideo: true,
        photoURL: null,
        mediaStream: null,
        side: null,
        dataFoto: null,
        devices: [],
        SelectDevice: null,
      };
    },
    mounted() {
      this.scrollToTop();
      // Acceder a la cámara y mostrar el video
      if (
        this.$route.params.side === "front" ||
        this.$route.params.side === "back"
      ) {
        this.side = this.$route.params.side;
      } else {
        this.$route.go(-1);
      }
      this.startCamera();
    },
    methods: {
      ...mapMutations(["SET_FOTO_CAMERA"]),
      takePhoto() {
        // Obtener el elemento de video y canvas
        const video = this.$refs.videoElement;
        const canvas = document.createElement("canvas");
  
        // Configurar el canvas con el mismo tamaño del video
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
  
        // Dibujar el video en el canvas
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, width, height);
        // Convertir el canvas a una imagen en formato base64
        this.photoURL = canvas.toDataURL("image/jpeg", 0.5);
  
        // Detener la cámara y mostrar el preview de la foto
        this.stopCamera();
        this.showVideo = false;
        // Armar el objeto para enviarlo
        this.dataFoto = {
          file: this.photoURL,
          filename: `credencial_${this.side}`,
          size: 0,
          email: "",
          filetype: this.side,
          cellphone: this.$store.cellphone,
        };
      },
      acceptPhoto() {
        // console.log('Foto aceptada:', this.photoURL);
        if (this.photoURL) {
          // this.$emit('ImageFile', this.photoURL);
          if (this.side === "front")
            this.SET_FOTO_CAMERA({ tipo: "frontal", foto: this.dataFoto });
          else if (this.side === "back")
            this.SET_FOTO_CAMERA({ tipo: "tracera", foto: this.dataFoto });
          // console.log(router)
          router.push({ name: "nda" });
        }
      },
      cancelPhoto() {
        // Reiniciar la aplicación para tomar una nueva foto
        this.showVideo = true;
        this.photoURL = null;
        this.startCamera();
      },
      startCamera() {
        this.devices = [];
        const constraints = {
          facingMode: "environment",
          // facingMode: { exact: 'environment' }
        };
  
        navigator.mediaDevices
          .getUserMedia({ video: constraints })
          .then((stream) => {
            // console.log(stream)
            this.$refs.videoElement.srcObject = stream;
            this.mediaStream = stream;
          })
          .catch((error) => {
            console.error("Error al acceder a la cámara:", error);
          });
      },
      stopCamera() {
        // Detener la cámara y liberar el recurso de video
        if (this.mediaStream) {
          const tracks = this.mediaStream.getTracks();
          tracks.forEach((track) => track.stop());
          this.mediaStream = null;
        }
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
    },
    computed: {
      photo() {
        return this.photoURL;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  video {
    width: 100%;
    // height: 540px;
    // display: block;
    // margin: 0 auto;
    // display: inline;
  }
  .container-video {
    padding: 10%;
    position: relative;
    // border: 1px blue solid;
  }
  .photo-base {
    // min-height: 215px !important;
    height: 200px;
    width: 300px;
    top: 13%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid red !important;
  }
  
  .photo-margin-tops {
    @extend .photo-base;
    left: 0;
    right: 0;
    margin: auto;
    // border-right: 2px solid red !important;
  }
  
  .photo-margin-sides {
    @extend .photo-base;
    left: 0;
    // bottom: 0;
    right: 0;
    margin: auto;
    border-top: 2px solid red !important;
    border-bottom: 2px solid red !important;
  }
  
  .container-show {
    min-width: 245px;
    background: grey;
    position: relative;
  }
  
  .preview-img {
    padding-top: 10px;
    width: 70%;
    display: block;
    margin: 0 auto;
  }
  
  .container-buttons {
    margin-top: 1rem;
  }
  
  @media screen and (orientation: landscape) {
    video {
      width: 60%;
    }
    .container-video {
      padding: 0%;
      position: relative;
    }
    .photo-base {
      height: 200px;
      width: 300px;
      top: 13%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 3px solid red !important;
    }
  
    .photo-margin-tops {
      @extend .photo-base;
      left: 0;
      right: 0;
      margin: auto;
      // border-right: 2px solid red !important;
    }
  
    .photo-margin-sides {
      @extend .photo-base;
      left: 0;
      // bottom: 0;
      right: 0;
      margin: auto;
      border-top: 2px solid red !important;
      border-bottom: 2px solid red !important;
    }
  
    .container-show {
      min-width: 245px;
      background: grey;
      position: relative;
    }
  
    .preview-img {
      padding-top: 10px;
      width: 70%;
      display: block;
      margin: 0 auto;
    }
  
    .container-buttons {
      margin-top: 1rem;
    }
  }
  </style>
  