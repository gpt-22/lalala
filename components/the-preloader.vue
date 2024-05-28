<template>
  <div v-if="preloader" class="preloader">
    <div class="flex flex-col gap-1 items-center">
      <div class="progress" />
      <div class="counter">100</div>
    </div>
  </div>
</template>

<script setup>
import { Power2 } from 'gsap'

const { preloader } = useLoader()

const { $gsap } = useNuxtApp()
onMounted(() => {
  const timeline = $gsap.timeline()

  timeline.from('.counter', {
    delay: 0.2,
    duration: 4,
    textContent: 0,
    snap: { textContent: 1 },
    ease: Power2.easeInOut,
    stagger: 1
  })
  timeline.to('.preloader', {
    delay: 0.5,
    duration: 1,
    opacity: 0,
    onEnded: () => {
      console.log('end preloader')
      preloader.value = false
    }
  })
})
</script>

<style scoped lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 100000;

  display: flex;
  justify-content: center;
  align-items: center;
}

.progress {
  position: relative;
  width: 300px;
  height: 4px;
  background-color: #1d1d1d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #f9d0b8 0%, #fff 100%);
    transition: width 0.1s;
    animation: progress 4s ease-in-out;
  }
}

@keyframes progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.counter {
  font: 900 5em system-ui;
  color: #b19280;
}
</style>
