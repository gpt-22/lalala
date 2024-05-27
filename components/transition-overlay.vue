<template>
  <!--  <div v-show="showEnterOverlay" class="enter-page-overlay" :class="{ shown: showEnterOverlay }" />-->
  <!--  <div v-show="showLeaveOverlay" class="leave-page-overlay" :class="{ shown: showLeaveOverlay }" />-->
</template>

<script setup>
const { showEnterOverlay, showLeaveOverlay } = usePageOverlay()

const { $gsap } = useNuxtApp()

watch(showEnterOverlay, (value) => {
  if (!value) return

  $gsap.fromTo(
    '.enter-page-overlay',
    {
      opacity: 1
    },
    {
      display: 'none',
      opacity: 0,
      duration: 1.5,
      ease: 'power1.in'
    }
  )
})

// const animateOverlay = () => {
//   $gsap.to('.leave-page-overlay', {
//     background: ''
//     delay: 1
//   })
// }
</script>

<style scoped lang="scss">
.enter-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: black;
}

.leave-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  opacity: 1;
  background-color: rgba(0, 0, 0, 1);
  //transition: background-color 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  animation: 5s fadeOut linear;

  &::before,
  &::after {
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    background-color: black;
    height: calc(100vh * 0.125);
  }

  &::before {
    top: 0;
    animation: 1s slideTop ease-in-out;
  }

  &::after {
    bottom: 0;
    animation: 1s slideBottom ease-in-out;
  }
}

@keyframes slideTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes slideBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes fadeOut {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  20% {
    background-color: rgba(0, 0, 0, 0);
  }
  40% {
    background-color: rgba(0, 0, 0, 1);
  }
  100% {
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>
