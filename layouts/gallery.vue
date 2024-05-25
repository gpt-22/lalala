<template>
  <div class="gallery-layout">
    <slot />
  </div>
</template>

<script setup>
console.log('gallery layout setup')
</script>

<style scoped lang="scss">
.gallery-layout {
  position: relative;
}
</style>
