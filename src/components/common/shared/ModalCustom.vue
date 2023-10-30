<template>
    <div>
      <div
        v-if="OpenClose"
        class="modal fade show"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
        style="display: block"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              {{ Title }}
              <button-secondary
                class="btn-close"
                :ImageIcon="require('@/assets/close_icon.svg')"
                :OnClickButton="OpenCloseFun"
              />
            </div>
            <div class="modal-body">
              <slot> </slot>
            </div>
            <div  class="modal-footer" 
                  v-if="TextButtonCancel!=''">
              <button-secondary
                
                :Text="TextButtonCancel"
                class=""
                :OnClickButton="OpenCloseFun"
              />
              <ButtonPrimary
                :Text="TextButtonConfirm"
                :OnClickButton="onClickAcceptButton"
              />
            </div>
            <div  class="modal-footer" 
                  v-else >
              <div class="row">
                <div class="col-md-12">
                  <ButtonPrimary
                    :Text="TextButtonConfirm"
                    :OnClickButton="onClickAcceptButton"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ButtonSecondary from "@/components/common/ButtonSecondary.vue";
  import ButtonPrimary from "@/components/common/ButtonPrimary.vue";
  export default {
    components: { ButtonSecondary, ButtonPrimary },
    name: "modalCustomComp",
    props: {
      Show: Boolean,
      OnCloseTittleButton: { type: Function, default: null },
      OnClickAcceptButton: { type: Function, default: null },
      Title: { type: String, default: "" },
      TextButtonCancel:String,
      TextButtonConfirm:String
    },
    data() {
      return {
        OpenClose: this.Show,
      };
    },
    methods: {
      OpenCloseFun() {
        if (this.OnCloseTittleButton != null) {
          this.OpenClose = false;
          this.OnCloseTittleButton(this.OpenClose);
        }
      },
      onClickAcceptButton() {
        if (this.OnClickAcceptButton != null) {
          this.OnClickAcceptButton();
        }
      },
    },
    watch: {
      Show: function (newVal) {
        this.OpenClose = newVal;
      },
    },
  };
  </script>
  
  <style scoped >
  .btn-close {
    background: 1px;
  }
  </style>