<template>
  <swiper
    :key="currentLocation.key"
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
      @click="onSlideClick"
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

const { preloader } = useLoader()
const { showEnterOverlay, showLeaveOverlay } = usePageOverlay()
const {
  swiperInstance,
  currentLocation,
  currentIndex,
  currentSlideProgress,
  progressIntervals,
  play,
  togglePlay,
  animateProgress2,
  setNextLocation
} = useGallery()
const { playAudio, pauseAudio } = useAudio()

document.body.addEventListener('keydown', (event) => {
  console.log('key', event)
  if (event.code === 'Space') {
    togglePlay()
    if (play.value) playAudio()
    else pauseAudio()
  }
  if (event.code === 'ArrowLeft') {
    swiperInstance.value.slidePrev()
  }
  if (event.code === 'ArrowRight') {
    swiperInstance.value.slideNext()
  }
})

const onLoad = (index) => {
  // ENTRY POINT
  if (index === 0 && !preloader.value) {
    enterGallery()
  }
}

const onSlideClick = () => {
  togglePlay()
  if (play.value) playAudio()
  else pauseAudio()
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
  // animateProgress2(100, { duration: swiperInstance.value.autoplay.timeLeft })
  playAudio()
}

const imageElements = ref()

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onSlideChange = (event) => {
  // console.log('slide change', event.realIndex, event.previousIndex)

  if (event.realIndex === 0 && event.previousIndex === currentLocation.value?.images.length - 1) {
    setNextLocation()
    return
  }

  currentIndex.value = event.realIndex
  currentSlideProgress.value = 0

  // requestAnimationFrame(() => animateProgress2(100, { duration: 5000 }))
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
