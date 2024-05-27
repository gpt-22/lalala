<template>
  <div class="default-layout">
    <the-loader />

    <video-background />

    <transition-overlay />

    <the-header v-show="showHeader" />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { showVideo, currentVideo, startLoading, load1 } = useVideo()
const { $gsap } = useNuxtApp()
onMounted(() => {
  $gsap.to('.default-layout', {
    opacity: 1,
    duration: 2
  })
})

const route = useRoute()
const showHeader = computed(() => route.name !== 'gallery' && !startLoading.value)

if (route.name === 'gallery') {
  startLoading.value = false
}

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
.default-layout {
  opacity: 0;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
