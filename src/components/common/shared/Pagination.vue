
<template>
  <v-container>
    <nav aria-label="..." style="display: flex; justify-content: center;">
      <ul class="pagination" style="display: flex; align-items: center;">
        <!-- <v-btn :disabled="isInFirstPage" :icon="isInFirstPage" @click="onClickPreviousPage" color="secondary">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
        <ButtonSecondaryVue :disabled="isInFirstPage" Icon="mdi-chevron-left" @click="onClickPreviousPage" color="secondary" />
        <li class="page-item active">
          <select class="form-select" v-model="perPage" @change="onChangePageSize($event.target.value)">
            <option value="9">9</option>
            <option value="18">18</option>
            <option value="27">27</option>
            <option value="36">36</option>
            <option value="45">45</option>
          </select>
        </li>
        <!-- <v-btn :disabled="isInLastPage" :icon="isInLastPage" @click="onClickNextPage" color="secondary">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn> -->
        <ButtonSecondaryVue :disabled="isInLastPage" Icon="mdi-chevron-right" @click="onClickNextPage" color="secondary" />
      </ul>
      
    </nav>
    <div style="text-align: center;">
        {{ currentProperties }} de {{ propTotalItems }}
      </div>
  </v-container>
</template>
  
<script>
import ButtonSecondaryVue from '../ButtonSecondary.vue';

export default {
  name: "paginationComp",
  components: {
    ButtonSecondaryVue,

  },
  data() {
    return {
      totalItems: this.propTotalItems,
      currentPage: this.propCurrentPage,
      perPage: this.propPerPage,
    };
  },
  props: {
    propItemSource: {
      type: Number,
      required: true,
    },
    propTotalItems: Number,//"",
    propCurrentPage: Number,//1,
    propPerPage: Number//"9"
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
    totalPages() {
      let result = Math.ceil(this.propTotalItems / this.perPage);

      return result > 0 ? result : this.currentPage;
    },
    currentProperties() {
      let tot = this.currentPage * this.perPage;

      return tot > this.propTotalItems ? this.propTotalItems : tot;
    }
  },
  methods: {
    onClickPreviousPage() {
      this.scrollToTop();
      this.currentPage--;
      //this.totalItems = this.calculateItemsPerPage;

      this.$emit("pagechanged", {
        page: 1,
        pagesize: this.perPage,
        pages: this.totalItems,
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalItems: this.propTotalItems
      });

      this.emitData();


    },
    onClickNextPage() {
      this.scrollToTop();
      this.currentPage++;
      //this.totalItems = this.calculateItemsPerPage;

      this.$emit("pagechanged", {
        page: 1,
        pagesize: this.perPage,
        pages: this.totalItems,
        currentPage: this.currentPage,
        perPage: this.perPage,
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
        perPage: this.perPage,
        totalItems: this.propTotalItems
      });
    },
    emitData() {
      this.$emit('setTotalItems', this.totalItems);
      this.$emit('setPerPage', this.perPage);
      this.$emit("setCurrentPage", this.currentPage);

    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
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
        perPage: this.perPage,
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

  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 24px 24px;
}
</style>