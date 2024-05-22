<template>
  <section id="section-1" class="section h-[1200px]" ref="section1" @wheel="onWheel">
    <app-container>
      <h1 class="title">Оазиз</h1>
    </app-container>
  </section>
</template>

<script setup>
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'

const { $gsap } = useNuxtApp()
const { videos, isTransition, showVideo } = useVideo()

const section1 = ref()

const setGsapAnimations = () => {
  $gsap.to('.title', {
    opacity: 1,
    duration: 0.5,
    delay: 0.5
  })

  //   const timeline = $gsap.timeline({ delay: 0.6 });
  //
  //   timeline.to(".appear-from-right", {
  //     stagger: 0.2,
  //     x: 0,
  //     opacity: 1,
  //     duration: 0.4,
  //     delay: 1.9
  //   });
}

const goDown = throttle(() => {
  showVideo('4')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY > 20) {
    goDown(e.deltaY)
  }
}

onMounted(() => {
  setGsapAnimations()
})
</script>

<style scoped lang="scss">
.title {
  padding-top: 50px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  opacity: 0;
}
</style>
