<template>
  <div :class="`${offer_style ? 'tp-product-offer-item' : 'mb-25'} tp-product-item transition-3`">
    <div class="tp-product-thumb p-relative fix m-img">
      <v-link :href="`/product-details/${item.id}`">
        <img :src="item.img" alt="product-electronic" />
      </v-link>

      <!-- product badge -->
      <div class="tp-product-badge">
        <span v-if="item.status === 'out-of-stock'" class="product-hot">out-of-stock</span>
      </div>

      <!-- product action -->
      <div class="tp-product-action">
        <div class="tp-product-action-item d-flex flex-column">

            <svg-add-cart />
            <span class="tp-product-tooltip">Add to Cart</span>

         
            <svg-add-cart />
            <span class="tp-product-tooltip">View Cart</span>


            <svg-wishlist />
            <span class="tp-product-tooltip">Add To Wishlist</span>

        </div>
      </div>
    </div>
    <!-- product content -->
    <div class="tp-product-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.id}`">{{ item.category.name }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.id}`">
          {{ item.title }}
        </nuxt-link>
      </h3>
      <div class="tp-product-rating d-flex align-items-center">
        <div class="tp-product-rating-icon">
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star-half-stroke"></i></span>
        </div>
        <div class="tp-product-rating-text">
          <span>({{item.reviews?.length}} Review)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <div v-if="item.discount > 0">
          <span class="tp-product-price old-price">${{ item.price }}</span>
          <span class="tp-product-price new-price">
            ${{(Number(item.price) - (Number(item.price) * Number(item.discount)) / 100).toFixed(2)}}
          </span>
        </div>
        <span v-else class="tp-product-price new-price">${{ item.price.toFixed(2) }}</span>
      </div>

      <div class="tp-product-countdown" v-if="offer_style">
        <div class="tp-product-countdown-inner">
          <ul>
            <li>
              <span>{{ timer.days }}</span> Day
            </li>
            <li>
              <span>{{ timer.hours }}</span> Hrs
            </li>
            <li>
              <span>{{ timer.minutes }}</span> Min
            </li>
            <li>
              <span>{{ timer.seconds }}</span> Sec
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { IProduct } from "@/core/types/product-type";
import { useTimer, UseTimer } from "vue-timer-hook";

const props = defineProps<{ item: IProduct; offer_style?: boolean }>();


let timer: UseTimer;
if (props.item.offerDate) {
  const endTime = new Date(props.item.offerDate.endDate);
  const endTimeMs = endTime.getTime();
  timer = useTimer(endTimeMs);
}
</script>
