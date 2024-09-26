<script setup lang="ts">

const {title, description, list, slider} = defineProps(['title', 'description', 'list', 'slider']);

</script>

<template>
  <div class="section">
    <div class="colored-line"/>
    <h2 v-if="title" class="section_title header1">{{ title }}</h2>
    <div class="colored-line"/>
    <p v-if="description" class="p-default section_title2">
      {{ description }}
    </p>
    <div v-if="slider" class="screenshots">
      <div class="container full-width">
        <Slider class="slider" :slider-data="slider" />
      </div>
    </div>
    <div class="row top-margin60">
      <div class="first-part">
        <div v-for="(item, index) in list.slice(0, 2)" :key="`item-${index}`" class="feature">
          <div class="color-round" :style="`background: ${item.color}`"></div>
          <div class="feature-details">
            <h4 class="title header2">
              {{ item.title }}
            </h4>
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="list.slice(2, 4)?.length" class="last-part">
        <div v-for="(item, index) in list.slice(2, 4)" :key="`item-${index}`" class="feature">
          <div class="color-round" :style="`background: ${item.color}`"></div>
          <div class="feature-details">
            <h4 class="title header2">
              {{ item.title }}
            </h4>
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .section {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 45px 0;
    width: 80%;
    text-align: center;

    @media (min-width: 1200px) {
      max-width: 80%;
    }

    .section_title {
      text-decoration: none;
    }

    .section_title2 {
      padding: 0 8vw;
    }

    .colored-line {
      margin: auto;
      z-index: 1;
      width: 165px;
      height: 1px;
      background: #b5894a;
    }

    .top-margin60 {
      margin-top: 60px;
    }

    .row {
      display: flex;
      justify-content: center;
      flex-direction: row;

      @media (max-width: 1199px) {
        flex-direction: column;
      }

      .first-part, .last-part {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50%;

        @media (max-width: 1199px) {
          width: 100%;
        }

        .feature {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          height: 50%;

          .color-round {
            height: 55px;
            width: 55px;
            border-radius: 50%;
            border: 0;
            margin: 15px;
          }

          .feature-details {
            @media (max-width: 1199px) {
              width: 100%;
              text-align: center;
            }
          }

          .title {
            color: #b5894a;
            text-transform: none;
          }

          @media (min-width: 1200px) {
            &.first-part {
              flex-direction: row-reverse;
              text-align: right;
            }

            &.last-part {
              text-align: left;
            }
          }
        }
      }
    }

    .more-details {
      color: #b5894a;
      font-size: 80%;
    }
  }
</style>
