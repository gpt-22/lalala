<template>
<!--  <the-cursor />-->
  <the-loader />

  <div class="app">
    <the-header />
    <NuxtPage />
    <the-footer />
  </div>
</template>

<script setup>
import Lenis from "lenis";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,
  })

  lenis.on('scroll', $ScrollTrigger.update)
  $gsap.ticker.add((time)=> {
    lenis.raf(time * 1000)
  })
  $gsap.ticker.lagSmoothing(0)
}

onMounted(() => {
  initLenis()
})
</script>

<style lang="scss">
.app {
  position: relative;
}
</style>
