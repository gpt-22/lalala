<template>
  <div class="w-[500px] start flex flex-col justify-center">
    <h1 class="appear-from-right kek">Groshev <br> housing estate</h1>

    <p class="appear-from-right text-[18px] text-[#d1d1d1] w-[400px] mt-5">
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
    duration: 0.4
  });
})
</script>

<style lang="scss">
.appear-from-right {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
