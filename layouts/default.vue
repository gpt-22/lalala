<template>
  <div class="app">
    <the-loader />
    <video-background />

    <template v-if="!startLoading">
      <the-header />
      <div class="flex-1">
        <nuxt-page />
      </div>
    </template>

    <transition-overlay />
  </div>
</template>

<script setup>
// import { sectionToVideoKey } from '~/composables/useVideo.data'

const { showVideo, currentVideo, startLoading, load1 } = useVideo()
const { $gsap } = useNuxtApp()

const route = useRoute()

load1()

// if (route.name === 'index') {
showVideo('1', { playNext: false })
// } else {
//   const videoKey = sectionToVideoKey[route.path.slice(1)]
//   console.log('route', route.path.slice(1), videoKey || '1')
//   if (videoKey) {
//     showVideo(videoKey)
//   } else {
//     showVideo('1', { playNext: true, playTime: 1500 })
//   }
// }

// const onKeydown = (event) => {
//   if (event.key === 'ArrowLeft') showVideo(currentVideo.value.prevKey)
//   if (event.key === 'ArrowRight') showVideo(currentVideo.value.nextKey)
// }
//
// onMounted(() => {
//   document.addEventListener('keydown', onKeydown)
// })

onMounted(() => {
  $gsap.to('.app', {
    opacity: 1,
    duration: 2
  })
})
</script>

<style scoped>
.app {
  opacity: 0;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.btn {
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 200px;
  height: 40px;
}
.btn-1 {
  left: 0;
}
.btn-2 {
  right: 0;
}
</style>
