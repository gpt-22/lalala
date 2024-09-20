<template>
  <section data-scroll-section class="h-screen pt-[96px] bg-gray section-technology">
   <app-container>
     <h1 id="section-technology-title">Еще проекты</h1>

     <p>Тестовый огромный текст</p>
   </app-container>
 </section>
</template>

<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
  $gsap.to("#section-technology-title", {
    scrollTrigger:  {
      trigger: "#section-technology-title",
      start: 'top 95%',
      end: 'top 65%',
      scrub: true,
    },
    x: 0,
  });
})
</script>

<style scoped>
.section-technology {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    /*display: block;*/
    border-left: 100vw solid transparent;
    border-top: 10vh solid #0f0f0f;
    border-right: 0;
    border-bottom: 0;
  }
}


#section-technology-title {
  transform: translate(-400px, 0);
}
</style>
