<template>
  <div class="default-layout">
    <the-loader />

    <video-background />

    <transition-overlay />

    <the-header v-show="showHeader" />
    <div class="flex-1">
      <slot />
    </div>

    <about />

    <the-preloader />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { preloader, startView } = useLoader()
const { showVideo, currentVideo, load1 } = useVideo()
const { $gsap } = useNuxtApp()
onMounted(() => {
  $gsap.to('.default-layout', {
    opacity: 1,
    duration: 2
  })
})

const route = useRoute()
const showHeader = computed(() => route.name !== 'gallery' && !startView.value)

if (route.name === 'gallery') {
  startView.value = false
}

preloader.value = true
// }
watch(preloader, (value) => {
  if (!value && route.name === 'index') {
    console.log('here')
    startView.value = true
  }
})

// на любой странице показывать прелоадер
// если это не страт - не показывать

const setFirstVideo = () => {
  const section = route.path.replaceAll('/', '')
  const videoKey = sectionToVideoKey[section]
  console.log('DEFAULT LAYOUT: section, video -', section, videoKey)

  if (route.name === 'index') {
    showVideo('1', { playNext: false })
  } else {
    if (videoKey) {
      startView.value = false
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
.default-layout {
  opacity: 0;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
