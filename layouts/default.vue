<template>
  <div class="app">
    <video-frame />

    <the-header />
    <div class="flex-1">
      <slot />
    </div>
    <the-footer />
  </div>
</template>

<script>

</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
