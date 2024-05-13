<template>
  <section id="about" class="section-contact">
    <app-container>
      <h1 id="section-contact-title">О нас</h1>

<!--      <canvas id="canvas3d" ref="canvas3d" />-->
    </app-container>
  </section>
</template>

<script setup>
const { $gsap } = useNuxtApp();

import { Application } from '@splinetool/runtime';

// const canvas3d = ref()

onMounted(() => {
  $gsap.to(".section-contact", {
    scrollTrigger:  {
      trigger: ".section-contact",
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
    },
    backgroundColor: '#e3e3e3',
    color: '#333333'
  });

  $gsap.to("#section-contact-title", {
    scrollTrigger:  {
      trigger: "#section-contact-title",
      start: 'top 95%',
      end: 'top 15%',
      scrub: true,
    },
    x: 0,
  });

  // setTimeout(async () => {
  //   const app = new Application(canvas3d.value);
  //   app.load('https://prod.spline.design/RwCLYGRD28qBtsqC/scene.splinecode');
  //
  // }, 3000)
})
</script>

<style scoped lang="scss">
.section-contact {
  @apply h-screen pt-[96px] bg-dark text-white;
}

#section-contact-title {
  transform: translate(-400px, 0);
}
</style>
