<template>
  <div class="parent">
    <section-video />
    <section-projects class="item" />
<!--    <section-techonology class="item" />-->
    <section-about class="item" />
  </div>
</template>

<script setup>
// const { $gsap, $Observer } = useNuxtApp();
//
// console.log('Observer', $Observer)
// // onMounted(() => {
// //   console.log($Observer, $gsap)
// // })
//
// $Observer.create({
//   target: window, // can be any element (selector text is fine)
//   type: "wheel,touch", // comma-delimited list of what to listen for
//   onUp: () => {
//     console.log('go to prev')
//   },
//   onDown: () => {
//     console.log('go to next')
//   },
// });
</script>


<style lang="scss">
.parent {
//  display: contents;
//  height: 100%;
//  overflow-y: auto;
//  scroll-snap-type: y mandatory;
}
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
