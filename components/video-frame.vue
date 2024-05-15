<template>
  <div class="section-intro-media">
    <video v-show="show1" :src="video1" preload="auto" autoplay muted loop class="video" controlslist="nodownload nofullscreen" disablepictureinpicture playsinline webkit-playsinline />
    <video v-show="show3" :src="video3" preload="auto" autoplay muted loop class="video" controlslist="nodownload nofullscreen" disablepictureinpicture playsinline webkit-playsinline />
    <video v-show="show2" :src="video2" preload="auto" autoplay muted loop class="video" controlslist="nodownload nofullscreen" disablepictureinpicture playsinline webkit-playsinline />
    <video v-show="show4" :src="video4" preload="auto" autoplay muted loop class="video" controlslist="nodownload nofullscreen" disablepictureinpicture playsinline webkit-playsinline />
  </div>
</template>

<script setup>
import { useVideoFrame } from "../composables/useVideoFrame"

import video1 from '~/public/video/test_01.mp4'
import video2 from '~/public/video/test_02.mp4'
import video3 from '~/public/video/test_03.mp4'
import video4 from '~/public/video/test_04.mp4'

const { show1, show2, show3, show4 } = useVideoFrame()

// watchEffect(() => {
//   console.log('here', show1.value)
// })
</script>

<style scoped lang="scss">


.section-intro-media {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  overflow: hidden;
  background: url("~/public/video/placeholder.jpeg") no-repeat center center;
  background-size: cover;
  z-index: -1;
  opacity: .9;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
  }
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
