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

  //     const timeline = $gsap.timeline({ delay: 0.6 });
  //
  //   timeline.to(".appear-from-right", {
  //     stagger: 0.2,
  //     x: 0,
  //     opacity: 1,
  //     duration: 0.4,
  //     delay: 1.9
  //   });
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

//.project-overview-overlay {
//  position: fixed;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//  opacity: 1;
//}
</style>
