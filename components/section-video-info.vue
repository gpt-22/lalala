<template>
  <div id="start" class="section-video-info">
    <h1 class="appear-from-right kek">3D Визуализация</h1>

    <p class="appear-from-right text-[18px] text-[#d1d1d1] max-w-[400px] mt-5">
      A quiet place in a great neighborhood. Enjoy
      unlimited nature and the charms of city life in
      Józefów.
    </p>

    <div class="mt-5">
      <button type="button" class="appear-from-right text-text-dark leading-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold rounded-full uppercase px-7 py-4 bg-white">Pick a house</button>
    </div>
  </div>
</template>

<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
  const timeline = $gsap.timeline({ delay: 0.6 });

  timeline.to(".appear-from-right", {
    stagger: 0.2,
    x: 0,
    opacity: 1,
    duration: 0.4,
    delay: 1.9
  });
})
</script>

<style scoped lang="scss">
.section-video-info {
  @apply max-w-[500px] flex flex-col pt-[200px];
}

.appear-from-right {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
