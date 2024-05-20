<template>
  <section id="section-3" class="section" ref="section3" @wheel="onWheel">
    <app-container>
      <h1>Еще описание</h1>
    </app-container>
  </section>
</template>

<script setup>
import { throttle } from "~/utils/decorators"
import { useVideoFrame } from "~/composables/useVideoFrame"

const { showFrame, isTransition } = useVideoFrame()

const goUp = throttle((deltaY) => {
  console.log("3 SCROLL UP", deltaY)
  showFrame('6r')
}, 1000)
// const goDown = throttle((deltaY) => {
//   console.log("3 SCROLL DOWN", deltaY)
//   showFrame('6r')
// }, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY > 20) {
    // goDown(e.deltaY)
  }
  if (e.deltaY < -20) {
    goUp(e.deltaY)
  }
}

onMounted(() => {
  console.log('SECTION 3 onMounted')
})
</script>

<style scoped lang="scss">
//
</style>
