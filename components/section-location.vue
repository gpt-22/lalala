<template>
 <section class="section-location">
   <app-container>
     <h1 id="section-location-title">3D визуализация</h1>
   </app-container>
 </section>
</template>


<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
  $gsap.to("#section-location-title", {
    scrollTrigger:  {
      trigger: "#section-location-title",
      start: 'top 95%',
      end: 'top 65%',
      scrub: true,
    },
    x: 0,
  });
})
</script>

<style scoped lang="scss">
.section-location {
  @apply h-[750px] pt-[96px] bg-dark text-white;
}

#section-location-title {
  transform: translate(-400px, 0);
}
</style>
