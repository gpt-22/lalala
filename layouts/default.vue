<template>
  <div class="app">
    <video-frame />

    <the-header v-if="!startLoading" />
    <div class="flex-1">
      <slot />
    </div>
<!--    <the-footer />-->
  </div>
</template>

<script setup>
const { startLoading } = useVideoFrame()
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
