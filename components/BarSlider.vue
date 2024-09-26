<script setup lang="ts">
import { ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore from 'swiper/core';
import { Autoplay, Pagination } from 'swiper/modules';
import type { SliderItem } from '@/types'
import 'swiper/swiper-bundle.css';
import { listAlt } from "~/data/content";

SwiperCore.use([Autoplay,Pagination]);

const lightboxVisible = ref(false);
const lightboxIndex = ref(0);
const { sliderData } = defineProps(['sliderData'])
const images: string[] = sliderData.map((data:SliderItem) => data.image);
const swiperReady = ref(false);

const onSwiperInit = () => {
  swiperReady.value = true;
};

const getAlt = (number: number) => {
  return listAlt[number % listAlt.length];
};

const openLightbox = (image: string) => {
  lightboxIndex.value = images.indexOf(image);
  lightboxVisible.value = true;
};
</script>

<template>
  <div v-if="sliderData" class="bar-slider">
    <swiper
        :auto-height="false"
        :free-mode="true"
        :space-between="1"
        :loop=true
        loading="lazy"
        :autoplay="{
              delay: 3000,
              disableOnInteraction: false
            }"
        :breakpoints="{
              1024: { slidesPerView: 2.1 },
              900: { slidesPerView: 2.1 },
              600: { slidesPerView: 2.1 },
              300: { slidesPerView: 1.1 }
            }"
        :lazy="{
            loadPrevNext: true,
            loadOnTransitionStart: true
          }"
        :pagination='{
              "clickable": true
            }'
        @init="onSwiperInit"
    >
      <swiper-slide
          v-for="({image, title, description}, index) in sliderData"
          :key="index"
          @click="openLightbox(image)"
      >
        <template v-if="swiperReady">
          <img :src="image" loading="lazy" :alt="getAlt(index)" />
        </template>
        <div v-if="title || description" class="screenshots-descr">
          <div v-if="title" class="name">{{ index + 1 }}. {{ title }}</div>
          <template v-if="description">
            <div class="white-line"></div>
            <div class="message">{{ description }}</div>
          </template>
        </div>
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
    </swiper>
    <vue-easy-lightbox
        :visible="lightboxVisible"
        :imgs="images"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
    />
  </div>
</template>

<style scoped>
.bar-slider {
  :deep(.swiper-wrapper) {
    padding-bottom: 70px;
  }
  .swiper-slide {
    display: block;
    background: #232323;
    padding: 10px;
    margin: 13px;
    border-radius: 4px;
    -webkit-box-shadow: none;
    box-shadow: none;
    img {
      vertical-align: middle;
      border-radius: 4px;
      border: 0;
      object-fit: cover;
      width: 100%;
      max-width: 100%;
    }
  }
  :deep(.swiper-pagination) {
    .swiper-pagination-bullet {
      background: #b5894a;
      &-active {
        background: #d9a757;
      }
    }
  }
}
</style>
