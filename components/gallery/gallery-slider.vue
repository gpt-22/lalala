<template>
  <swiper
    :slides-per-view="1"
    :modules="[Autoplay]"
    :autoplay="{ delay: 5000 }"
    watch
    watch-slides-progress
    class="gallery-slider"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="(imageSrc, i) in currentLocation?.images"
      :key="imageSrc"
      class="slide"
      v-slot="{ isActive }"
      @click="play = !play"
    >
      <img
        :src="imageSrc"
        alt=""
        ref="imageElements"
        class="gallery-image"
        :class="{
          activeOdd: isActive && i % 2 !== 0,
          activeEven: isActive && i % 2 === 0,
          play: play
        }"
        @load="onLoad(i)"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
/* TODO:
 * анимация переключения слайдов distortion
 * */

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

const route = useRoute()
const { preloader } = useLoader()
const { showEnterOverlay, showLeaveOverlay } = usePageOverlay()
const {
  swiperInstance,
  currentLocation,
  currentIndex,
  currentSlideProgress,
  currentSlideStartTime,
  totalProgress,
  play,
  animateProgress,
  setNextLocation
} = useGallery()
const { playAudio } = useAudio()

const onLoad = (index) => {
  // ENTRY POINT
  if (index === 0 && !preloader.value) {
    console.log('LOAD', index, imageElements.value[index].complete)

    enterGallery()
  }
}

watch(preloader, (value) => {
  if (!value) enterGallery()
})

const pageEntered = ref(false)
const enterGallery = () => {
  if (!pageEntered.value) {
    showLeaveOverlay.value = false
    showEnterOverlay.value = true
  }
  pageEntered.value = true

  play.value = true
  swiperInstance.value.autoplay.start()
  requestAnimationFrame(animateProgress)
  playAudio()
}

const imageElements = ref()

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onSlideChange = (event) => {
  console.log('slide change', event.realIndex, event)

  if (event.realIndex === 0) {
    setNextLocation()
    return
  }

  currentIndex.value = event.realIndex
  currentSlideProgress.value = 0
  currentSlideStartTime.value = 0
  animateProgress()
  // console.log('onSlideChange', totalProgress.value)
}
</script>

<style scoped lang="scss">
.slide {
  position: relative;
  cursor: pointer;
  width: 100vw;
  height: 100vh;
}

.gallery-image {
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  aspect-ratio: 16 / 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  animation-play-state: paused;
  background-size: 100%;

  &.activeOdd {
    animation: 6s scaleIn;
  }
  &.activeEven {
    animation: 6s scaleOut;
  }
  &.play {
    animation-play-state: running;
  }
  &:not(.play) {
    animation-play-state: paused;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    transform: scale(1.02) translate(-50%, -50%);
  }
}
@keyframes scaleOut {
  0% {
    transform: scale(1.02) translate(-50%, -50%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
