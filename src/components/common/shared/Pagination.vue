
<template>
    <div class="row justify-content-center d-flex col-sm-12 alig-items-center">
      <div class="col-lg-3">
        <p class="d-inline-block">Vista por página</p>
        <div class="d-inline-block ms-2">
          <select
            class="form-select"
            v-model="perPage"
            @change="onChangePageSize($event.target.value)"
          >
            <option value="9">9</option>
            <option value="18">18</option>
            <option value="27">27</option>
            <option value="36">36</option>
            <option value="45">45</option>
          </select>
        </div>
      </div>
      <div class="col-lg-2 col-sm-12">
        <!-- página {{ currentPage }} de {{ totalPages }} -->
  
        {{ currentProperties }}  de {{ propTotalItems }}
      </div>
  
      <div class="col-lg-1 col-sm-12">
        <button-flat
          :disabled="isInFirstPage"
          Text=""

          :OnClickButton="onClickPreviousPage"
        />
  
        <button-flat
          :disabled="isInLastPage"
          Text=""

          :OnClickButton="onClickNextPage"
        />
      </div>
    </div>
  </template>
  
  <script>
  import ButtonFlat from "@/components/common/ButtonPrimary.vue";
  export default {
    name: "paginationComp",
    components: {
      ButtonFlat,
      // customselect,
    },
    data() {
      return {
        totalItems:this.propTotalItems,
        currentPage:this.propCurrentPage,
        perPage:this.propPerPage,
      };
    },
    props: {
      propItemSource: {
        type: Number,
        required: true,
      },
      propTotalItems:Number,//"",
      propCurrentPage:Number,//1,
      propPerPage:Number//"9"
    },
  
    computed: {
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
  
        return (this.currentPage * this.perPage) >= this.propTotalItems;
      },
      positionPage() {
        return this.currentPage;
      },
      calculateItemsPerPage() {
        const pages = Math.ceil(this.ItemSource / this.perPage);
        return pages;
      },
      totalPages(){
        let result = Math.ceil(this.propTotalItems / this.perPage);
  
        return result>0?result:this.currentPage;
      },
      currentProperties(){
        let tot = this.currentPage * this.perPage;
  
        return tot>this.propTotalItems?this.propTotalItems:tot;
      }
    },
    methods: {
      onClickPreviousPage() {
        this.currentPage--;
        //this.totalItems = this.calculateItemsPerPage;
  
        this.$emit("pagechanged", {
          page: 1,
          pagesize: this.perPage,
          pages: this.totalItems,
          currentPage: this.currentPage,
          perPage:this.perPage,
          totalItems: this.propTotalItems
        });
  
        this.emitData();
  
  
      },
      onClickNextPage() {
        this.currentPage++;
        //this.totalItems = this.calculateItemsPerPage;
        
        this.$emit("pagechanged", {
          page: 1,
          pagesize: this.perPage,
          pages: this.totalItems,
          currentPage: this.currentPage,
          perPage:this.perPage,
          totalItems: this.propTotalItems
        });
  
        this.emitData();
      },
      onChangePageSize(value) {
        //console.log('onChangePageSize', value);
        
        //this.currentPage = 1;
        //this.totalItems = this.calculateItemsPerPage;
        this.emitData();
  
        this.$emit("pagechanged", {
          page: 1,
          pagesize: value,
          pages: this.totalItems,
          currentPage: this.currentPage,
          perPage:this.perPage,
          totalItems: this.propTotalItems
        });
      },
      emitData(){
        this.$emit('setTotalItems', this.totalItems);
        this.$emit('setPerPage', this.perPage);
        this.$emit("setCurrentPage", this.currentPage);
  
      }
    },
    mounted(){
      this.emitData();
    },
    watch: {
      ItemSource: function () {
        //this.totalItems = this.calculateItemsPerPage;
        this.$emit("pagechanged", {
          page: 1,
          pagesize: this.perPage,
          pages: this.totalItems,
          currentPage: this.currentPage,
          perPage:this.perPage,
          totalItems: this.propTotalItems
        });
      },
    },
  };
  </script>
  
  
  
  
  <style scoped lang="scss">
  .form-select {
    background: #ffffff;
    border-radius: 7px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    background-image: url("@/assets/select_icon.svg");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 24px 24px;
  }
  </style>