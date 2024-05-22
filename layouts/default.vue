<template>
  <div class="app">
    <video-background />

    <the-header v-if="!startLoading" />
    <div class="flex-1">
      <slot />
    </div>
    <!--    <the-footer />-->

    <button class="btn btn-1 bg-dark color-white" @click="showVideo(currentVideo.nextKey)">
      Вперед
    </button>
    <button class="btn btn-2 bg-dark color-white" @click="showVideo(currentVideo.prevKey)">
      Назад
    </button>
  </div>
</template>

<script setup>
const { showVideo, currentVideo, startLoading } = useVideo()
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.btn {
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 200px;
  height: 40px;
}
.btn-1 {
  left: 0;
}
.btn-2 {
  right: 0;
}
</style>
