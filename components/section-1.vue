<template>
  <section id="section-1" class="section">
    <app-container>
      <h1 class="title">Оазиз</h1>
    </app-container>
  </section>
</template>

<script setup>
import { useVideoFrame } from "../composables/useVideoFrame"

const { frames } = useVideoFrame()

const { $gsap } = useNuxtApp();

watch(() => frames.value['3'].playing, (value) => {
  console.log('v', value)
  $gsap.to(".title", {
    opacity: 1,
    duration: 0.5,
    delay: 0.5
  });
})
</script>

<style scoped lang="scss">
.title {
  padding-top: 50px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  opacity: 0;
}
</style>
