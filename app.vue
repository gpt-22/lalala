<template>
<!--  <the-cursor />-->
  <the-loader />

  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import {sectionToTransition} from "~/composables/useVideoFrame.data"

const { showFrame } = useVideoFrame()


const route = useRoute()

if (route.name === 'index') {
  showFrame('1', { playNext: true, playTime: 1500 })
} else {
  console.log('route', route.path.slice(1), sectionToTransition[route.path.slice(1)])
  showFrame(sectionToTransition[route.path.slice(1)])

}
</script>

<style lang="scss">
.app {
  position: relative;
}
</style>
