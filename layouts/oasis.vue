<template>
  <div class="default-layout">
    <the-loader />

    <video-background />

    <transition-overlay />

    <the-header v-show="showHeader" />
    <div v-show="!showAbout" class="flex-1">
      <slot />
    </div>

    <about />

    <the-preloader />

    <div id="scroll-btns"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TheLoader from '~/components/oasis/the-loader.vue'
import VideoBackground from '~/components/oasis/video-background.vue'
import TransitionOverlay from '~/components/oasis/transition-overlay.vue'
import TheHeader from '~/components/oasis/the-header.vue'
import About from '~/components/oasis/about.vue'
import ThePreloader from '~/components/oasis/the-preloader.vue'

const { preloader, startView } = useLoader()
const { showVideo, currentVideo, load1, videos } = useVideo()
const { showAbout } = useShow()
const { $gsap } = useNuxtApp()
onMounted(() => {
  $gsap.to('.default-layout', {
    opacity: 1,
    duration: 2
  })
})

const route = useRoute()
const showHeader = computed(() => !['index', 'gallery'].includes(route.name) && !startView.value)

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
  console.log('DEFAULT LAYOUT: section, video -', section, videoKey, route.name)

  if (['index', 'cinematic'].includes(route.name)) {
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

<style scoped lang="scss">
.default-layout {
  opacity: 0;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

#scroll-btns {
  position: absolute;
  bottom: 5%;
  right: 5%;
}
/*.pages {*/
/*  opacity: 0;*/
/*}*/
/*.pages.show {*/
/*  opacity: 1;*/
/*}*/
</style>
