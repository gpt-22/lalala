<template>
  <!--  <the-cursor />-->
  <the-loader />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { sectionToVideoKey } from '~/composables/useVideo.data'

const { currentVideo, showVideo } = useVideo()

const route = useRoute()

if (route.name === 'index') {
  showVideo('1', { playNext: true, playTime: 1500 })
} else {
  const videoKey = sectionToVideoKey[route.path.slice(1)]
  console.log('route', route.path.slice(1), videoKey || '1')
  if (videoKey) {
    showVideo(videoKey)
  } else {
    showVideo('1', { playNext: true, playTime: 1500 })
  }
}

const onKeydown = (event) => {
  if (event.key === 'ArrowLeft') showVideo(currentVideo.value.prevKey)
  if (event.key === 'ArrowRight') showVideo(currentVideo.value.nextKey)
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})
</script>

<style lang="scss">
.app {
  position: relative;
}
</style>
