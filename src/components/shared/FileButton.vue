<template>
  <v-btn type="file"  class="btn" @click="onClickButtonInternal" :disabled="IsDisabled">
    <img v-if="ImageIcon != undefined" :src="ImageIcon" :alt="Text" class="pb-1" />
    {{ Text }}
    <img v-if="ImageIconRight != undefined" :src="ImageIconRight" :alt="Text" class="pb-1" />
  </v-btn>
</template>
  
<script>
import convertFileToBase64 from "@/core/utils/fileToBase64";
export default {
  name: "filebuttonComp",
  data() {
    return {};
  },
  props: {
    Text: { type: String, required: true },
    OnChangeFile: { type: Function, default: null },
    ImageIcon: { type: String, required: false },
    IsDisabled: { type: Boolean, default: false },
    ImageIconRight: { type: String, required: false },
    FileType: { type: String, required: true },
  },
  methods: {
    onClickButtonInternal() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept =
        "image/jpg, image/jpeg, image/JPG, image/JPEG;capture=camera";
      input.capture = "capture";
      input.onchange = async (e) => {
        if (this.OnChangeFile !== null) {
          const file = e.target.files[0];
          let newFile = await convertFileToBase64(file);
          const result = { file: newFile, filename: file.name, size: file.size, email: '', filetype: this.FileType };
          this.OnChangeFile(result);
        }
      };
      input.click();
    },
  },
};
</script>
  
<style scoped lang="scss">


.btn {
  height: 56px;
  text-transform: none;
  display: flex;
  width: 230px;
  padding: 18px 16px;
  gap: 10px;
  color: var(--secundarios-blanco, #FFF);
  border-radius: 12px;
  background: var(--primary-500, #379BEC);
  /* Text/Regular/Medium */
  font-family: Barlow;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  /* 125% */
  letter-spacing: -0.16px;
}
</style>