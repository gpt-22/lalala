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
const { showVideo, currentVideo, startLoading, load1 } = useVideo()
const { $gsap } = useNuxtApp()
onMounted(() => {
  $gsap.to('.app', {
    opacity: 1,
    duration: 2
  })
})

const route = useRoute()
const setFirstVideo = () => {
  const section = route.path.replaceAll('/', '')
  const videoKey = sectionToVideoKey[section]
  console.log('DEFAULT LAYOUT: section, video -', section, videoKey)

  if (route.name === 'index') {
    showVideo('1', { playNext: false })
  } else {
    if (videoKey) {
      startLoading.value = false
      showVideo(videoKey, { playNext: true })
    } else {
      showVideo('1', { playNext: true, playTime: 1500 })
    }
  }
}

load1()
setFirstVideo()
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
