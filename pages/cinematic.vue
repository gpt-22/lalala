<template>
  <div class="video-container">
    <!--        <app-button to="/" class="back-btn" @click="goBack"> Назад </app-button>-->
    <nuxt-link to="/" class="back-btn" :class="{ visible: homeVisible }" @click="goBack">
      <icon-house />
    </nuxt-link>

    <video
      ref="videoElement"
      :src="`${VIDEO_BASE_URL}/cinematic.mp4`"
      preload="auto"
      autoplay
      controls
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
      class="video"
      @mousemove="onMouseMove"
      @pointermove="onMouseMove"
      @pause="homeVisible = true"
      @play="onMouseMove"
    />
  </div>
</template>

<script setup>
import { VIDEO_BASE_URL } from '~/utils/constants'
import AppButton from '~/components/ui/app-button.vue'
import IconHouse from '~/components/icon-house.vue'

definePageMeta({
  layout: 'video'
})

const router = useRouter()
const { startLoading } = useLoader()

const goBack = () => {
  startLoading.value = true
  // router.go(-1)
}

const homeVisible = ref(false)

const setMouseActive = debounce(() => {
  homeVisible.value = false
}, 2500)

const onMouseMove = () => {
  homeVisible.value = true
  setMouseActive()
}
</script>

<style lang="scss">
.back-btn {
  position: fixed;
  top: 24px;
  left: 24px;

  //svg {
  //  width: 20px;
  //  height: 20px;
  //}

  z-index: 2;

  button {
    border: 1px solid white;
    background-color: black;
    color: white;
    font-size: 14px;
    font-weight: 500;
  }

  opacity: 0;
  transition: 0.3s opacity ease;
  &.visible {
    opacity: 1;
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
