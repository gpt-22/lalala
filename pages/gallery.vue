<template>
  <div class="gallery">
    <header class="gallery-header"></header>

    <swiper
      :slides-per-view="1"
      :modules="[Parallax, Autoplay]"
      :autoplay="{ delay: 5000 }"
      loop
      watch
      watch-slides-progress
      class="gallery-slider"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="i in 10" :key="i" class="slide" v-slot="{ isActive }">
        <div
          class="gallery-image"
          :class="{ activeOdd: isActive && i % 2 !== 0, activeEven: isActive && i % 2 === 0 }"
          :style="{ background: `url(/images/render_${i}.jpg) center center/cover no-repeat` }"
        />
        <!--        <img :src="`/images/render_${i}.jpg`" alt="Slide 1" class="gallery-image" />-->
      </swiper-slide>
    </swiper>

    <footer class="gallery-footer">
      <progress
        class="progress"
        max="100"
        :value="progress"
        :style="{ animationPlayState: play ? 'running' : 'paused' }"
      />

      <div class="gallery-footer-content">
        <div class="slide-marks">
          <!--          <div v-for="slide in slides" :key="" class=""></div>-->
        </div>
        <div class="player-btn-container">
          <button class="player-btn" @click="play = !play">
            <icon-play v-show="play" />
            <icon-stop v-show="!play" />
          </button>
          <button class="player-btn">
            <icon-skip />
          </button>
          <!--          <button class="player-btn" @click="mute = !mute">-->
          <!--            <icon-mute v-show="mute" />-->
          <!--            <icon-unmute v-show="!mute" />-->
          <!--          </button>-->
          <button class="player-btn">
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

definePageMeta({
  layout: 'gallery'
})

/* TODO:
 * добавить слайдер +
 * иконки футер (play, )
 * бургер
 * меню бургер
 * progress
 *
 * проигрывание / остановка
 * переключение слайдов
 * фуллскрин
 *
 * */

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, EffectFade, Autoplay, Parallax } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
const onSwiper = (swiper) => {
  console.log(swiper)
}
const onSlideChange = (event) => {
  console.log('slide change', event)
  currentIndex.value = event.activeIndex
}

const currentIndex = ref(0)
const totalSlides = ref(10)
const progress = computed(() => {
  return Math.round(((currentIndex.value + 1) / totalSlides.value) * 100)
})

const play = ref(true)
const mute = ref(false)
</script>

<style scoped lang="scss">
.gallery {
  position: relative;
}

.gallery-image {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;

  &.activeOdd {
    animation: 6s scaleIn;
  }
  &.activeEven {
    animation: 6s scaleOut;
  }
}

@keyframes scaleIn {
  0% {
    background-size: 100%;
    //transform: scale(1);
  }
  100% {
    background-size: 110%;
    //transform: scale(1.25);
  }
}
@keyframes scaleOut {
  0% {
    background-size: 110%;
    //transform: scale(1.25);
  }
  100% {
    background-size: 100%;
    //transform: scale(1);
  }
}

.gallery-slider {
  //min-width: 100%;
  //min-height: 100%;

  &:deep(.swiper-wrapper) {
    //min-width: 100%;
    //min-height: 100%;
  }
}

.slide {
  width: 100vw;
  height: 100vh;
}

////
.gallery-header,
.gallery-footer {
  @apply bg-dark;
  position: absolute;
  height: calc(100vh * 0.125);
  z-index: 2;
}

.gallery-header {
  top: 0;
  left: 0;
  right: 0;
}

.gallery-footer {
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.gallery-footer-content {
  flex-grow: 1;
  padding: 0 48px;
}

.progress {
  width: 100%;
  height: 4px;

  &::-webkit-progress-value {
    background: linear-gradient(90deg, #b3a2c2 0%, #fff 100%);
    transition: width 5s linear;
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
</style>
