<template>
  <div id="site-loader" class="site-loader">
    <div class="loader text-white">
    </div>
  </div>
</template>

<script setup>

const { $gsap } = useNuxtApp();

onMounted(() => {
  $gsap.to("#site-loader", {
    opacity: 0,
    duration: 0.5,
    delay: 1.5,
    display: 'none'
  });
  $gsap.to(".loader", {
    // opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    delay: 1.5,
    width: '1500px',
    height: '1500px',
    background: 'white'
  });
})
</script>

<style scoped lang="scss">
.site-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1000000;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  @apply bg-dark;
  animation: fadeOut 1.5s linear;
}

.loader {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  animation: fadeIn .5s linear;

  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: .3em;
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 5px solid #FFF;
  animation: prixClipFix 1s linear;
}

@keyframes fadeIn {
  0%   {
    opacity: 0;
  }
  100%   {
    opacity: 1;
  }
}

@keyframes prixClipFix {
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {
    clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0);
    transform: rotate(235deg);
  }
}
</style>
