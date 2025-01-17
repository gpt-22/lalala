<template>
  <footer class="gallery-footer">
    <slider-progress ref="progressElement" :value="totalProgress" :play="play" />

    <div class="gallery-footer-content">
      <div class="slide-marks">
        <button
          v-for="(imageSrc, i) in currentLocation?.images"
          :key="imageSrc"
          class="slide-mark"
          :class="{
            active: i === currentIndex
          }"
          :style="{
            left: `calc(calc(${width - 96}px / ${currentLocation?.images.length}) * ${i})`
          }"
          @click="setCurrentSlide(i)"
        >
          {{ i + 1 }}
        </button>
      </div>

      <div class="player-btn-container">
        <div class="player-btn-wrapper">
          <button class="player-btn" @click="onPlayClick">
            <icon-stop v-show="play" />
            <icon-play v-show="!play" />
          </button>
        </div>
        <div class="player-btn-wrapper">
          <button class="player-btn" @click="setNextLocation">
            <icon-skip />
          </button>
        </div>
        <div class="player-btn-wrapper">
          <button class="player-btn" @click="onMuteClick">
            <icon-mute v-show="!mute" />
            <icon-unmute v-show="mute" />
          </button>
          <div class="volume-wrapper">
            <input
              id="volume"
              type="range"
              ref="volumeInput"
              :value="audio.volume"
              min="0"
              max=".5"
              step="0.005"
              class="volume"
              @input="onVolumeInput"
            />
          </div>
        </div>
        <div class="player-btn-wrapper">
          <button class="player-btn" @click="toggleFullscreen">
            <icon-fullscreen />
          </button>
        </div>
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
  totalProgress,
  play,
  togglePlay,
  mute,
  toggleMute,
  fullscreen,
  toggleFullscreen,
  setCurrentSlide,
  setNextLocation,
  animateProgress2
} = useGallery()

const progressElement = ref()
const { width } = useElementBounding(progressElement)

const volumeInput = ref()
const onVolumeInput = throttle(function (e) {
  console.log('INPUT', e.target.value)
  const value = volumeInput.value.value
  if (value === audio.value.volume) return

  if (value > 0 && mute.value) {
    mute.value = false
  }
  console.log('val', value)
  audio.value.volume = value
}, 100)

const { audio, volumeChanging, playAudio, pauseAudio, initAudioPlayer } = useAudio()
initAudioPlayer()

const onPlayClick = () => {
  togglePlay()
  if (play.value) playAudio()
  else pauseAudio()
}
const onMuteClick = () => {
  if (volumeChanging.value) return
  console.log('MUTE')
  mute.value = !mute.value
}

const onTogglePlay = () => {
  if (play.value) {
    swiperInstance.value.autoplay?.resume()
    if (!mute.value) playAudio()
    animateProgress2(100, { duration: swiperInstance.value.autoplay.timeLeft })
  } else {
    console.log('ON TOGGLE PLAY')
    // pauseAudio()
    swiperInstance.value.autoplay?.pause()
  }
}

const onToggleAudio = () => {
  if (mute.value) pauseAudio()
  else playAudio()
}

const onToggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

// EFFECTS
watch(play, onTogglePlay)
watch(mute, onToggleAudio)
watch(fullscreen, onToggleFullScreen)

onBeforeRouteLeave(() => {
  console.log('LEAVE')
  pauseAudio()
})
</script>

<style scoped lang="scss">
.gallery-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100vh * 0.125);
  z-index: 2;
  display: flex;
  flex-direction: column;
  background-color: black;
}

.gallery-footer-content {
  position: relative;
  flex-grow: 1;
}

.slide-marks {
  margin: 0 48px;
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
  transform: translateX(-50%);
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
  padding: 0 48px;
}

.player-btn-wrapper {
  position: relative;
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

/// Sound btn
.player-btn-wrapper {
  &:hover .volume {
    opacity: 1;
  }
}

.volume-wrapper {
  position: absolute;
  top: -70px;
  left: -36px;
  height: 16px;
  width: 100px;
  z-index: 10;
}

.volume {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.3s opacity;
  transform: rotate(-90deg);
  cursor: pointer;
}

.slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
