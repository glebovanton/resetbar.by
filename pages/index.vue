<script setup>
import { ref } from 'vue';
import { useHead } from 'nuxt/app'
import FlipCountdown from '../components/FlipCountdown.vue';
import PresentationSection from '../components/PresentationSection.vue';
import CustomFooter from '../components/CustomFooter.vue';

const deadline = '2024-12-31 00:00:00';
const showCountdown = ref(false);

useSeoMeta({
  articleModifiedTime: new Date().toISOString()
})

useHead({
  title: 'Resetbar - Премиальный выездной коктейль бар, бармен шоу и пирамида из бокалов для вашего мероприятия',
  meta: [
    {
      name: 'description',
      content: 'Resetbar предлагает премиальный барный кейтеринг с классическими барными стойками из натуральных материалов, светлыми пиджаками барменов и стильными бокалами. Наслаждайтесь коктейлями из натуральных ингредиентов и высококачественного алкоголя на вашем мероприятии в Минске.'
    },
    {
      name: 'keywords',
      content: 'премиальный коктейль бар Минск, бармен шоу, пирамида из бокалов, выездной бар, классический бар, барный кейтеринг, натуральные ингредиенты, премиальные бокалы'
    }
  ]
})
</script>

<template>
  <div class="flex flex-center flex-col">
    <div class="bgimg">
      <div
        class="middle"
      >
        <div>Страница находится в разработке</div>
        <div class="count-wrap">
          <template v-if="showCountdown">
            <hr>
            <h6>
              Осталось:
            </h6>
          </template>
          <Suspense>
            <template #default>
              <FlipCountdown
                  class="flip-countdown"
                  :deadline="deadline"
                  @on-show="isShowed => showCountdown = isShowed"
              />
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
    <PresentationSection />
    <CustomFooter />
  </div>
</template>

<style lang="scss" scoped>
//$primary: #232323;
$spacer: 30px;
$primary   : #fff;
$secondary : #785025;
$accent    : #38312a;

$dark      : #1D1D1D;

$positive  : #21BA45;
$negative  : #cf9d50;
$info      : #31CCEC;
$warning   : #F2C037;
$break--xs: 23.4375rem; // Triggers at 375px
$break--base: 47.9375rem; // Triggers at 767px
$break--small: 63.75rem; // Triggers at 1020px
$break--medium: 79.9375rem; // Triggers at 1279px
$break--large: 100rem; // Triggers at 1600px
$break--extra: 125rem; // Triggers at 2000px
// Example: @include at-break(breakpoint-variable)
@mixin at-break($viewportWidth) {
  @media only screen and (min-width: $viewportWidth) {
    @content;
  }
}
// Example: @include under-break(breakpoint-variable)
@mixin under-break($viewportWidth) {
  @media only screen and (max-width: ($viewportWidth - 0.0625rem)) {
    @content;
  }
}

body {
  min-width: 100px;
  min-height: 100%;
  font-family: Roboto, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  line-height: 1.5;
  font-size: 14px;
}

html, body, #__nuxt {
  width: 100%;
  direction: ltr;
}

.background {
  background-color: $primary;
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translateX(-50%) translateY(-50%);
  @media only screen and (min-width: $break--base) {
    display: block;
  }
}

.bgimg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #111111db;
  width: 100%;
  min-height: 400px;
  color: white;
  font-size: 25px;

  .count-wrap {
    min-height: 400px;
  }
}

.topleft {
  position: absolute;
  top: 0;
  left: 16px;
  @include under-break($break--base) {
    font-size: 40px;
    left: 0;
  }

  img {
    font-size: 15rem;
    @include under-break($break--base) {
      font-size: 11rem;
    }
  }
}

.bottomleft {
  position: absolute;
  bottom: 0;
  left: 16px;
}

.middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

h1 {
  margin-top: $spacer;
}

h6 {
  margin-top: calc($spacer / 4);
  margin-bottom: calc($spacer / 4);
}

hr {
  margin: auto;
  width: 20%;
}
</style>
