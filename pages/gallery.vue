<template>
  <div class="gallery">
    <header class="gallery-header">
      <div class="flex items-center gap-8">
        <gallery-burger-button v-model="menuOpen" />
        <div class="location-title">
          {{ currentLocation.title }}
        </div>
      </div>
      <gallery-menu
        v-model="menuOpen"
        :active-key="currentLocation.key"
        @change-location="setLocation"
      />

      <div class="overlay" :class="{ shown: menuOpen }" />

      <button @click="onBack">
        <icon-close />
      </button>
    </header>

    <swiper
      :slides-per-view="1"
      :modules="[Autoplay]"
      :autoplay="{ delay: 5000 }"
      loop
      watch
      watch-slides-progress
      class="gallery-slider"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(imageSrc, i) in currentLocation.images"
        :key="imageSrc"
        class="slide"
        v-slot="{ isActive }"
        @click="play = !play"
      >
        <img
          :src="imageSrc"
          alt=""
          class="gallery-image"
          :class="{
            activeOdd: isActive && i % 2 !== 0,
            activeEven: isActive && i % 2 === 0,
            play: play
          }"
        />
        <!--        <div-->
        <!--          class="gallery-image"-->
        <!--          :class="{-->
        <!--            activeOdd: isActive && i % 2 !== 0,-->
        <!--            activeEven: isActive && i % 2 === 0,-->
        <!--            play: play-->
        <!--          }"-->
        <!--          :style="{ background: `url(${imageSrc}) center center/cover no-repeat` }"-->
        <!--        />-->
      </swiper-slide>
    </swiper>

    <footer class="gallery-footer">
      <div class="gallery-footer-content">
        <gallery-progress ref="progressElement" :value="totalProgress" :play="play" />
        <div class="slide-marks">
          <button
            v-for="(imageSrc, i) in currentLocation.images"
            :key="imageSrc"
            class="slide-mark"
            :class="{
              active: i === currentIndex
            }"
            :style="{
              left: `calc(calc(calc(${width}px / ${currentLocation.images.length}) * ${i}) - 8px)`
            }"
            @click="setCurrentSlide(i)"
          >
            {{ i + 1 }}
            <!--            <icon-image class="w-[16px] h-[16x]" />-->
          </button>
        </div>

        <div class="player-btn-container">
          <button class="player-btn" @click="play = !play">
            <icon-stop v-show="play" />
            <icon-play v-show="!play" />
          </button>
          <button class="player-btn" @click="setNextLocation">
            <icon-skip />
          </button>
          <button class="player-btn" @click="mute = !mute">
            <icon-mute v-show="!mute" />
            <icon-unmute v-show="mute" />
          </button>
          <button class="player-btn" @click="fullscreen = !fullscreen">
            <icon-fullscreen />
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import IconPlay from '~/components/icons/icon-play.vue'
import IconStop from '~/components/icons/icon-stop.vue'
import IconMute from '~/components/icons/icon-mute.vue'
import IconUnmute from '~/components/icons/icon-unmute.vue'
import IconSkip from '~/components/icons/icon-skip.vue'
import IconFullscreen from '~/components/icons/icon-fullscreen.vue'
import IconImage from '~/components/icons/icon-image.vue'
import IconClose from '~/components/icons/icon-close.vue'

import AppButton from '~/components/ui/app-button.vue'

import { locations } from '~/pages/gallery.data'

import 'swiper/css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

/* TODO:
 * анимация переключения слайдов
 * анимация при нажатии на кнопки
 * progress
 * анимация элементов списка
 * анимация скрытия оверлэя
 * */

const route = useRoute()
const router = useRouter()

const swiperInstance = ref()

const currentLocation = ref(
  locations.find((location) => location.key === (route.query.location || locations[0].key))
)
const setLocation = (key) => {
  currentLocation.value = locations.find((location) => location.key === key)
}
const setNextLocation = () => {
  const currentIndex = locations.findIndex((location) => location.key === currentLocation.value.key)
  currentLocation.value = locations[currentIndex + 1 > locations.length - 1 ? 0 : currentIndex + 1]
  console.log(currentLocation.value.key, swiperInstance.value)
  router.push({ name: 'gallery', query: { location: currentLocation.value.key } })
  // swiperInstance.value.start()

  currentSlideProgress.value = 0
  currentSlideStartTime.value = 0
}

const onSwiper = (swiper) => {
  console.log('SET', swiper)
  swiperInstance.value = swiper

  // setTimeout(() => {
  requestAnimationFrame(animateProgress)
  // }, 10000)
}
const onSlideChange = (event) => {
  console.log('slide change', event.realIndex)
  currentIndex.value = event.realIndex
  currentSlideProgress.value = 0
  currentSlideStartTime.value = 0 //performance.now()
  animateProgress()
  console.log('onSlideChange', totalProgress.value)
}

const menuOpen = ref(false)

const currentIndex = ref(0)
const currentSlideStartProgress = computed(() => {
  return (100 / currentLocation.value.images.length) * currentIndex.value
})

const setCurrentSlide = (index) => {
  console.log('before', index, swiperInstance.value.activeIndex, swiperInstance.value.realIndex)
  currentIndex.value = index
  swiperInstance.value.slideTo(index)
  console.log('after', swiperInstance.value.activeIndex, swiperInstance.value.realIndex)
}

const currentSlideProgress = ref(0)
const currentSlideStartTime = ref(0)
const timeLeftPaused = ref(0)
const animateProgress = (timestamp) => {
  if (!currentSlideStartTime.value) currentSlideStartTime.value = timestamp

  const timeLeft = timestamp - currentSlideStartTime.value || 0

  currentSlideProgress.value = (timeLeft / 5200) * 100 // Math.min((timeLeft / 5000) * 100, 100)

  if (play.value && currentSlideProgress.value < 100) {
    requestAnimationFrame(animateProgress)
  } else {
    timeLeftPaused.value = timeLeft
  }
}

const progressElement = ref()
const { width } = useElementBounding(progressElement)
const totalProgress = computed(() => {
  const currentSlideProgressNormalized =
    currentSlideProgress.value / currentLocation.value.images.length
  return (currentSlideStartProgress.value + currentSlideProgressNormalized).toFixed(2)
})

const { $gsap } = useNuxtApp()

const { audio, play: playAudio, pause: pauseAudio, initAudioPlayer } = useAudio($gsap)
initAudioPlayer()

const play = ref(true)
const mute = ref(false)
const fullscreen = ref(false)

const togglePlay = () => {
  if (play.value) {
    swiperInstance.value.autoplay.resume()
    if (!mute.value) playAudio()
    // animateProgress()
  } else {
    swiperInstance.value.autoplay.pause()
    pauseAudio()
    console.log('time progress', timeLeftPaused.value, currentSlideProgress.value)
  }
}

const toggleAudio = () => {
  if (mute.value) pauseAudio()
  else playAudio()
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

let prevPlayState = play.value
watch(menuOpen, (value) => {
  if (value) {
    prevPlayState = play.value
  }

  if (value && play.value) {
    play.value = false
  }

  if (!value && prevPlayState) {
    play.value = true
  }
})
watch(play, togglePlay)
watch(mute, toggleAudio)
watch(fullscreen, toggleFullScreen)

const { showEnterOverlay, showLeaveOverlay } = usePageOverlay()

onMounted(() => {
  showEnterOverlay.value = true
  playAudio()

  document.body.addEventListener('keypress', (val) => {
    console.log('key', val.code)
  })
})

onBeforeRouteLeave(() => {
  pauseAudio()
})

const { showVideo } = useVideo()
const onBack = () => {
  showLeaveOverlay.value = true
  setTimeout(() => {
    showVideo('7')
    router.go(-1)
  }, 2500)
  setTimeout(() => {
    showLeaveOverlay.value = false
    showEnterOverlay.value = true
  }, 2700)
}
</script>

<style scoped lang="scss">
.gallery {
  position: relative;
  z-index: 1;
  background-color: black;
}

.gallery-image {
  //  min-width: 100%;
  //  min-height: 100%;
  height: 100vh;
  position: absolute;
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
    height: 100vh;
    //background-size: 100%;
  }
  100% {
    height: 104vh;
    //background-size: 105%;
  }
}
@keyframes scaleOut {
  0% {
    height: 104vh;
    //background-size: 105%;
  }
  100% {
    height: 100vh;

    //background-size: 100%;
  }
}

.slide {
  position: relative;
  cursor: pointer;
  width: 100vw;
  height: 100vh;
}

////
.gallery-header,
.gallery-footer {
  background-color: black;
  position: absolute;
  height: calc(100vh * 0.125);
  z-index: 2;
}

.gallery-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  z-index: 4;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  transition: 0.5s opacity;

  &.shown {
    bottom: 0;
    opacity: 1;
    z-index: 3;
  }
}

.gallery-footer {
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0 48px;
}

.gallery-footer-content {
  position: relative;
  flex-grow: 1;
}

.slide-marks {
  position: absolute;
  width: calc(100% - 48px * 2);
  display: flex;
}
.slide-mark {
  position: absolute;
  padding: 4px 0px;
  font-size: 16px;
  font-weight: 500;
  font-family: MontserratAltMedium;
  color: #757575;
  transition: color 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #fff;
  }

  &.active {
    color: white;

    &::before {
      background-color: #fff;
    }
  }
}

.player-btn-container {
  @apply flex gap-6 items-center justify-end;
  height: 100%;
}

.player-btn {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    height: 14px;
  }
}

.location-title {
  font-size: 24px;
}
</style>
