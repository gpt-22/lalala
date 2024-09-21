<template>
  <section class="image-section">
    <img :src="`${MEDIA_BASE_URL}/landing/images/int_05_02.jpg`" alt="" />
    <h2>Интерьеры</h2>
  </section>

  <section class="image-section">
    <img :src="`${MEDIA_BASE_URL}/landing/images/ext_03_01.jpg`" alt="" />
    <h2>Экстерьеры</h2>
  </section>
</template>

<script setup lang="ts">
import { MEDIA_BASE_URL } from '~/utils/constants'
</script>

<style scoped lang="scss">
.image-section {
  position: relative;
  width: 100vw;
  cursor: pointer;

  &:hover {
    img {
      filter: saturate(100%);
    }

    h2 {
      opacity: 1;
    }
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(40%);
    transition: 0.5s filter;
  }

  & h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 64px;
    text-transform: uppercase;
    font-family: MontserratBold;
    font-weight: 700;
    opacity: 0;
    transition: 0.5s opacity;
    backdrop-filter: blur(2px);
    border-radius: 16px;
    padding: 8px 20px;

    &:hover {
      opacity: 1;
    }

    @media (max-width: 600px) {
      font-size: 36px;
      backdrop-filter: initial;
      opacity: 1;
    }
  }
}
</style>
