<template>
  <div class="video-container">
    <app-button to="/" class="back-btn" @click="startLoading = true"> Назад </app-button>
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
import AppButton from '~/components/ui/app-button.vue'

definePageMeta({
  layout: 'video'
})

const { startLoading } = useVideo()
</script>

<style lang="scss">
.back-btn {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 2;

  button {
    border: 1px solid white;
    background-color: black;
    color: white;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>

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
