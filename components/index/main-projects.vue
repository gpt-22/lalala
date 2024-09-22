<template>
  <!-- Вариант 1 -->
  <!--  <div class="wrapper">-->
  <!--    <router-link to="oasis" target="_blank">-->
  <!--    <div class="video-wrapper">-->
  <!--      <video-->
  <!--        id="video1"-->
  <!--        src="/videos/01_03.mov"-->
  <!--        preload="auto"-->
  <!--        muted-->
  <!--        loop-->
  <!--        autoplay-->
  <!--        disablePictureInPicture-->
  <!--        class="video-kek"-->
  <!--        :class="{ play: video1play }"-->
  <!--        @mouseenter="onEnter"-->
  <!--        @mouseleave="onLeave"-->
  <!--      />-->
  <!--      <span class="project-name">Оазиз</span>-->
  <!--    </div>-->
  <!--    </router-link>-->
  <!--    <router-link to="novocherkassk" target="_blank">-->
  <!--    <div class="video-wrapper">-->
  <!--      <video-->
  <!--        id="video2"-->
  <!--        src="/videos/01_09.mov"-->
  <!--        preload="auto"-->
  <!--        muted-->
  <!--        loop-->
  <!--        autoplay-->
  <!--        disablePictureInPicture-->
  <!--        class="video-kek"-->
  <!--        :class="{ play: video2play }"-->
  <!--        @mouseenter="onEnter"-->
  <!--        @mouseleave="onLeave"-->
  <!--      />-->
  <!--      <span class="project-name">Современник</span>-->
  <!--    </div>-->
  <!--    </router-link>-->
  <!--  </div>-->

  <!-- Вариант 2 - слайдер -->
  <swiper
    :modules="modules"
    :autoplay="{ delay: 5000 }"
    pagination
    watch
    class="mySwiper"
    @swiper="onSwiper"
  >
    <swiper-slide class="slide">
      <router-link to="oasis" target="_blank">
        <div class="video-wrapper">
          <video
            id="video1"
            src="/videos/01_03.mov"
            preload="auto"
            muted
            loop
            autoplay
            disablePictureInPicture
            class="video-kek"
            :class="{ play: video1play }"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
          />
          <span class="project-name">Оазиз</span>
        </div>
      </router-link>
    </swiper-slide>
    <swiper-slide class="slide">
      <router-link to="novocherkassk" target="_blank">
        <div class="video-wrapper">
          <video
            id="video2"
            src="/videos/01_09.mov"
            preload="auto"
            muted
            loop
            autoplay
            disablePictureInPicture
            class="video-kek"
            :class="{ play: video2play }"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
          />
          <span class="project-name">Современник</span>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
const video1play = ref(false)
const video2play = ref(false)
const onEnter = (event) => {
  console.log('enter', event.target.id)
  if (event.target.id === 'video1') video1play.value = true
  if (event.target.id === 'video2') video2play.value = true
  // event.target.play()
}
const onLeave = (event: any) => {
  console.log('leave', event)
  if (event.target.id === 'video1') video1play.value = false
  if (event.target.id === 'video2') video2play.value = false
  // event.target.pause()
}

/* Вариант 2 */
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/scss'
import 'swiper/scss/pagination'
const modules = [Autoplay, Pagination]

const swiperInstance = ref()
const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}
</script>

<style lang="scss" scoped>
//.wrapper {
//  display: grid;
//  grid-template-columns: 1fr 1fr;
//  grid-template-rows: 100vh;
//}
//
//.video-wrapper {
//  position: relative;
//  cursor: pointer;
//
//  &:hover {
//    .video-kek {
//      filter: saturate(100%);
//    }
//
//    .project-name {
//      opacity: 1;
//    }
//  }
//}
//
//.project-name {
//  position: absolute;
//  top: 50%;
//  left: 50%;
//  transform: translate(-50%, -50%);
//  font-size: 64px;
//  text-transform: uppercase;
//  font-family: MontserratBold;
//  font-weight: 700;
//  opacity: 0;
//  transition: 0.5s opacity;
//}
//
//.video-kek {
//  min-height: 100%;
//  object-fit: cover;
//  filter: saturate(40%);
//  transition: 0.3s filter;
//
//  &.play {
//    filter: saturate(100%);
//  }
//}

.video-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  cursor: pointer;
}

.project-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  text-transform: uppercase;
  font-family: MontserratBold;
  font-weight: 700;
  transition: 0.5s opacity;

  @media (max-width: 1023px) {
    font-size: 36px;
  }
}

.video-kek {
  min-height: 100%;
  object-fit: cover;
  transition: 0.3s filter;

  &.play {
    filter: saturate(100%);
  }
}

.slide {
  position: relative;
  cursor: pointer;
  width: 100vw;
  height: 100vh;
}

:deep(.swiper-pagination-bullet) {
  height: 10px !important;
  width: 10px !important;
  margin: 0 8px !important;
  background-color: #f0f0f0;
}
</style>
