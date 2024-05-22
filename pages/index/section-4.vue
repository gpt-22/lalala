<template>
  <section id="section-4" class="section" ref="section4" @wheel="onWheel">
    <app-container>4</app-container>
  </section>
</template>

<script setup>
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'

const { showVideo, isTransition } = useVideo()

const goUp = throttle((deltaY) => {
  console.log('4 SCROLL UP', deltaY)
  showVideo('8r')
}, 10000)

console.log('setup 4')
const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY < -20) {
    goUp(e.deltaY)
  }
}
</script>

<style scoped lang="scss">
//
</style>
