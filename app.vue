<script setup lang="ts">
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
html, body {
  background: #232323;
  margin: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: 'TTDrugs-Thin';
  src: url('@/assets/fonts/TTDrugs-Thin.eot');
  src: url('@/assets/fonts/TTDrugs-Thin.eot?#iefix') format('embedded-opentype'),
  url('@/assets/fonts/TTDrugs-Thin.woff2') format('woff2'),
  url('@/assets/fonts/TTDrugs-Thin.woff') format('woff'),
  url('@/assets/fonts/TTDrugs-Thin.ttf') format('truetype'),
  url('@/assets/fonts/TTDrugs-Thin.svg#TTDrugs-Thin') format('svg');
  font-weight: 100;
  font-style: normal;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  @font-face {
    font-family: 'TTDrugs-Thin';
    src: url('@/assets/fonts/TTDrugs-Thin.svg#TTDrugs-Thin') format('svg');
  }
}

body {
  font-family: Roboto, sans-serif;
  font-weight: 100;
}
</style>
