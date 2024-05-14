<template>
  <section id="about" class="section-about">
    <app-container>
      <h1 id="section-about-title" class="text-right text-uppercase pr-8">О нас</h1>

<!--      <canvas id="canvas3d" ref="canvas3d" />-->
    </app-container>
  </section>
</template>

<script setup>
const { $gsap } = useNuxtApp();

import { Application } from '@splinetool/runtime';

// const canvas3d = ref()

onMounted(() => {
  $gsap.to(".section-about", {
    scrollTrigger:  {
      trigger: ".section-about",
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
    },
    backgroundColor: '#e3e3e3',
    color: '#333333'
  });

  $gsap.to("#section-about-title", {
    scrollTrigger:  {
      trigger: "#section-about-title",
      start: 'top 95%',
      end: 'top 15%',
      scrub: true,
    },
    // x: 0,
  });

  // setTimeout(async () => {
  //   const app = new Application(canvas3d.value);
  //   app.load('https://prod.spline.design/RwCLYGRD28qBtsqC/scene.splinecode');
  //
  // }, 3000)
})
</script>

<style scoped lang="scss">
.section-about {
  @apply h-screen pt-[96px] bg-dark text-white;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    /*display: block;*/
    border-right: 100vw solid transparent;
    border-top: 10vh solid #eaeaea;
    border-left: 0;
    border-bottom: 0;
  }
}

#section-about-title {
  //transform: translate(-400px, 0);
}
</style>
