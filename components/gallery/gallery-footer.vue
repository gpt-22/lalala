<template>
  <footer class="gallery-footer">
    <div class="gallery-footer-content">
      <slider-progress ref="progressElement" :value="totalProgress" :play="play" />
      <div class="slide-marks">
        <button
          v-for="(imageSrc, i) in currentLocation?.images"
          :key="imageSrc"
          class="slide-mark"
          :class="{
            active: i === currentIndex
          }"
          :style="{
            left: `calc(calc(calc(${width}px / ${currentLocation?.images.length}) * ${i}) - 8px)`
          }"
          @click="setCurrentSlide(i)"
        >
          {{ i + 1 }}
          <!--            <icon-image class="w-[16px] h-[16x]" />-->
        </button>
      </div>

      <div class="player-btn-container">
        <button class="player-btn" @click="onPlayClick">
          <icon-stop v-show="play" />
          <icon-play v-show="!play" />
        </button>
        <button class="player-btn" @click="setNextLocation">
          <icon-skip />
        </button>
        <button class="player-btn" @click="onMuteClick">
          <icon-mute v-show="!mute" />
          <icon-unmute v-show="mute" />
          <input
            id="volume"
            type="range"
            ref="volumeInput"
            min="0"
            max="100"
            value="10"
            step="1"
            class="volume"
            @mousemove="mouseMove"
          />
        </button>
        <button class="player-btn" @click="fullscreen = !fullscreen">
          <icon-fullscreen />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
/* TODO:
 * анимация при нажатии на кнопки
 * анимация элементов списка
 * анимация скрытия оверлэя
 * */
import { throttle } from '~/utils/decorators'

import SliderProgress from './slider-progress.vue'
import IconPlay from '~/components/icons/icon-play.vue'
import IconStop from '~/components/icons/icon-stop.vue'
import IconMute from '~/components/icons/icon-mute.vue'
import IconUnmute from '~/components/icons/icon-unmute.vue'
import IconSkip from '~/components/icons/icon-skip.vue'
import IconFullscreen from '~/components/icons/icon-fullscreen.vue'

const {
  swiperInstance,
  currentLocation,
  currentIndex,
  timeLeftPaused,
  currentSlideProgress,
  totalProgress,
  play,
  mute,
  fullscreen,
  setCurrentSlide,
  setNextLocation,
  animateProgress
} = useGallery()

const progressElement = ref()
const { width } = useElementBounding(progressElement)

onMounted(() => {
  console.log('PROG', totalProgress.value, currentSlideProgress.value)
})

const volumeInput = ref()
const mouseMove = throttle(function (e) {
  const value = volumeInput.value.value / 100
  if (value === audio.value.volume) return

  if (value > 0 && mute.value) {
    mute.value = false
  }
  console.log('val', value)
  audio.value.volume = value
}, 100)

// document.body.addEventListener('keypress', (val) => {
//   console.log('key', val.code)
// })

const { audio, playAudio, pauseAudio, initAudioPlayer } = useAudio()
initAudioPlayer()

const onPlayClick = () => {
  play.value = !play.value
  if (!play.value) pauseAudio()
}
const onMuteClick = () => {
  console.log('MUTE')
  mute.value = !mute.value
}

const togglePlay = () => {
  if (play.value) {
    swiperInstance.value.autoplay?.resume()
    if (!mute.value) playAudio()
    animateProgress()
  } else {
    swiperInstance.value.autoplay?.pause()
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

// EFFECTS
watch(play, togglePlay)
watch(mute, toggleAudio)
watch(fullscreen, toggleFullScreen)

onBeforeRouteLeave(() => {
  pauseAudio()
})
</script>

<style scoped lang="scss">
.gallery-footer {
  background-color: black;
  position: absolute;
  height: calc(100vh * 0.125);
  z-index: 2;
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
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    height: 14px;
  }
  &:hover .volume {
    opacity: 1;
  }
}

.volume {
  position: absolute;
  top: -70px;
  left: -36px;
  height: 16px;
  width: 100px;

  opacity: 0;
  transition: 0.3s opacity;
  transform: rotate(-90deg);
  z-index: 10;
  cursor: pointer;
}
</style>
