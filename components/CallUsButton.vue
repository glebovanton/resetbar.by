<script setup lang="ts">

</script>

<template>
  <a
      href="tel:+375293577726"
      class="btn btn-default btn-lg standard-button button-shadow-anim">
    <Icon name="simple-icons:viber" />
    <Icon name="clarity:mobile-solid" />
    +375293577726
  </a>
</template>

<style scoped lang="scss">
  .button-shadow-anim {
    animation: button-shadow-anim 3s ease-in-out infinite;
  }
  .standard-button, .standard-button2 {
    min-width: 210px;
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    background: #b5894a !important;
    font-size: 18px;
    font-weight: 400 !important;
    border-radius: 4px !important;
    text-shadow: none !important;
    color: #ffffff;
    border: none;
    padding: 16px 16px 16px 16px;
    transition: all ease 0.25s;
  }
</style>
