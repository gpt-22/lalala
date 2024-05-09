<template>
  <header id="header" class="header">
    <app-container class="h-full">
      <div class="h-full flex item-center justify-between">
        <div class="flex flex-col uppercase leading-4">
          <span class="">Groshev</span>
          <span class="font-bold">real estate</span>
        </div>

        <nav class="flex gap-8 items-center uppercase text-sm font-medium">
          <nuxt-link to="#">Segments</nuxt-link>
          <nuxt-link to="/">Map</nuxt-link>
          <nuxt-link to="/">Technology</nuxt-link>
        </nav>


        <div class="flex gap-4">
          <button type="button" class="text-white leading-3 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5">
            Язык: Русский
          </button>
          <button type="button" class="text-text-dark leading-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 bg-white">
            Связаться с нами
          </button>
        </div>
      </div>
    </app-container>
  </header>
</template>


<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
  $gsap.to("#header", {
    y: 0,
    opacity: 1,
    duration: 0.3,
    delay: 0.3
  });
})
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  color: #fff;
  backdrop-filter: blur(10px);
  padding: 1em;

  // animation
  opacity: 0;
  transform: translate(0, -60px);
}
</style>
