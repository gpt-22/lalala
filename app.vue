<template>
  <!--  <the-cursor />-->

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { width } = useWindowSize()

console.log(width.value)

if (width.value < 1024) {
  setPageLayout('inappropriate-device')
}
</script>

<style lang="scss">
.app {
  position: relative;
}
</style>
