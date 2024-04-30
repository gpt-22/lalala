<template>
  <section class="h-[750px] pt-[96px] bg-gray section-technology">
   <app-container>
     <h1 id="section-technology-title">Construction technology</h1>
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
}


#section-technology-title {
  transform: translate(-400px, 0);
}
</style>
