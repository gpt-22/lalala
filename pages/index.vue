<template>
  <div class="parent">
    <section-1 />
    <section-2 />
    <section-3 />
    <section-4 />
    <section-5 />
    <section-6 />

    <!--    <section-video />-->
<!--    <section-projects class="item" />-->
<!--    <section-interiors class="item" />-->
<!--    <section-about class="item" />-->
  </div>
</template>

<script setup>
import {useVideoFrame} from "~/composables/useVideoFrame"

const { $gsap, $ScrollTrigger } = useNuxtApp();
const { showFrame } = useVideoFrame()

const setGsapAnimations = () => {
  $ScrollTrigger.create({
    trigger: '.section',
    // markers: true,
    start: 'top 60%',
    // markers: true,
    // endTrigger: "#otherID",
    // end: "bottom 50%+=100px",
    onToggle: (self) => {
      if (self.isActive) {
        // toEnd()
      } else {
        // toStart()
      }

      // console.log("toggled, isActive:", self.isActive)
    }
  })
}
</script>


<style lang="scss">
.parent {
  display: contents;
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
