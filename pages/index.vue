<template>
  <div ref="root" class="index-page">
    <index-header />

    <!--    <hero-section />-->
    <main-projects />
    <rest-projects />
    <services />

    <index-footer />
  </div>
</template>

<script setup>
import IndexHeader from '~/components/index/header/index-header.vue'
import HeroSection from '~/components/index/hero-section.vue'
import MainProjects from '~/components/index/main-projects.vue'
import RestProjects from '~/components/index/rest-projects.vue'
import Services from '~/components/index/services.vue'
import IndexFooter from '~/components/index/index-footer.vue'

import Lenis from 'lenis'

//
// definePageMeta({
//   layout: 'video'
// })
//

const root = ref()

const { $gsap, $ScrollTrigger } = useNuxtApp()
onMounted(() => {
  const lenis = new Lenis({
    duration: 2
  })
  lenis.on('scroll', $ScrollTrigger.update)
  $gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  $gsap.ticker.lagSmoothing(0)
})
</script>

<style lang="scss">
.index-page {
  font-family: 'Montserrat', serif;
}
</style>
