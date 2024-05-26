<template>
  <div class="gallery-layout">
    <slot />

    <div class="enter-transition" />
  </div>
</template>

<script setup>
console.log('gallery layout setup')

const { $gsap } = useNuxtApp()
onMounted(() => {
  $gsap.fromTo(
    '.enter-transition',
    {
      opacity: 1
    },
    {
      opacity: 0,
      duration: 1.5,
      ease: 'power1.in'
    }
  )
})
</script>

<style scoped lang="scss">
.gallery-layout {
  position: relative;
}

.enter-transition {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: black;
}
</style>
