<template>
  <the-cursor />

  <div class="app">
    <the-header />
    <NuxtPage />
    <the-footer />
  </div>
</template>

<script setup>
// TODO:
// video transitions
// custom cursor
// smooth scroll
// custom scroll

// menu burger

import Lenis from "lenis";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const initLenis = () => {
  const lenis = new Lenis({
    duration: 1,
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
