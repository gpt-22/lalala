<template>
  <section id="section-3" class="section" ref="section3" @wheel="onWheel">
    <canvas class="canvas" ref="canvasElement"></canvas>
    <!--    <img :src="image1" alt="" class="mask mask-1" :class="{ hide: hideMask }" />-->
    <!--    <img :src="image2" alt="" class="mask mask-2" :class="{ hide: hideMask }" />-->
    <!--    <img :src="image3" alt="" class="mask mask-3" :class="{ hide: hideMask }" />-->
    <!--    <img :src="image4" alt="" class="mask mask-4" :class="{ hide: hideMask }" />-->

    <div :class="{ hide: hideMask }" class="project-overview-overlay">
      <text-highlight top="76%" left="50%" to="/pool"> Бассейная группа</text-highlight>
      <text-highlight top="40%" left="50%" to="/elevator"> Лежаки </text-highlight>
      <text-highlight top="20%" left="40%" to="/elevator"> Зона отдыха </text-highlight>
      <text-highlight top="70%" left="15%" to="/elevator"> Зона с яхтами </text-highlight>
      <text-highlight top="70%" left="85%" to="/elevator"> Зона с яхтами </text-highlight>
    </div>
  </section>
</template>

<script setup>
import { throttle } from '~/utils/decorators'
import { useVideoFrame } from '~/composables/useVideoFrame'

import image1 from '~/public/images/02_01.png'
import image2 from '~/public/images/02_02.png'
import image3 from '~/public/images/02_03.png'
import image4 from '~/public/images/02_04.png'

const { showFrame, isTransition, currentVideoKey } = useVideoFrame()

const hideMask = computed(() => currentVideoKey.value !== '7')

const goUp = throttle((deltaY) => {
  console.log('3 SCROLL UP', deltaY)
  showFrame('6r')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY < -20) {
    goUp(e.deltaY)
  }
}

const canvasElement = ref()
function draw() {
  const ctx = canvasElement.value.getContext('2d')
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
    ctx.beginPath()
    ctx.moveTo(30, 96)
    ctx.lineTo(70, 66)
    ctx.lineTo(103, 76)
    ctx.lineTo(170, 15)
    ctx.stroke()
  }
  img.src = '~/public/images/02_01.png'
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.mask {
  //opacity: 0;
  transition: opacity 0.5s;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.hide {
  display: none;
}

.project-overview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
}

.canvas {
  position: fixed;
  height: 100vh;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
