<template>
  <div v-if="preloader" class="preloader">
    <div class="flex flex-col gap-1 items-center">
      <div class="progress" />
      <div class="counter" />
    </div>
  </div>
</template>

<script setup>
const { preloader } = useLoader()
preloader.value = true
const { $gsap } = useNuxtApp()
setTimeout(() => {
  $gsap.to('.preloader', {
    opacity: 0,
    duration: 1,
    onEnded: () => {
      setTimeout(() => (preloader.value = false), 1000)
    }
  })
}, 5000)
</script>

<style scoped lang="scss">
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
}

@property --num {
  syntax: '<integer>';
  initial-value: 100;
  inherits: false;
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
    //transition: width 0.1s;
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
  font-size: 100px;
  font-weight: 900;
}

.counter {
  animation: counter 4s ease-in-out;
  counter-reset: num var(--num);
  font: 800 40px system-ui;
}
.counter::after {
  content: counter(num);
}

@keyframes counter {
  from {
    --num: 0;
  }
  to {
    --num: 100;
  }
}
</style>
