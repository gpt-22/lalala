<template>
  <div class="video-container">
    <video
      ref="videoElement"
      :src="`${VIDEO_BASE_URL}/cinematic.mp4`"
      preload="auto"
      autoplay
      controls
      class="video"
    />
  </div>
</template>

<script setup>
import { VIDEO_BASE_URL } from '~/utils/constants'

definePageMeta({
  layout: 'video'
})
</script>

<style scoped lang="scss">
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  overflow: hidden;
  background-size: cover;
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>
