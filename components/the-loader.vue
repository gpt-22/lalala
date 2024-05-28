<template>
  <div v-show="startLoading" id="site-loader" class="site-loader">
    <div class="loader-content">
      <h1 id="loader-title" class="title loader-animation-item">Наедине с природой</h1>
      <icon-logo id="loader-logo" class="loader-animation-item mt-3 self-end w-[147px] h-[20px]" />

      <div id="loader-buttons" class="pt-16 flex justify-center gap-5">
        <app-button theme="dark" class="loader-btn" to="cinematic" @click="onGoToCinematic">
          Видео
        </app-button>
        <app-button theme="dark" class="loader-btn" to="/" @click="onGoToSite"> Сайт </app-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconLogo from '~/components/icons/icon-logo.vue'
import AppButton from '~/components/ui/app-button.vue'
const { $gsap } = useNuxtApp()
const { startLoading } = useLoader()
const { showVideo } = useVideo()

/* TODO:
 * темный фон
 * градиент
 * текст
 * + 2 кнопки: видео и перейти на сайт
 * */

const onGoToCinematic = () => {
  console.log('onGoToCinematic')
  startLoading.value = false
  setPageLayout('video')
}
const onGoToSite = () => {
  startLoading.value = false
  console.log('onGoToSite')
  showVideo('2')
}

let loaderTimeline = null
onMounted(() => {
  loaderTimeline = $gsap.timeline({ delay: 1 })
  loaderTimeline.fromTo(
    '.loader-animation-item',
    {
      opacity: 0
    },
    {
      stagger: 1,
      // x: 0,
      opacity: 0.6,
      duration: 5
    }
  )
  $gsap.fromTo(
    '#loader-buttons',
    {
      opacity: 0
    },
    {
      delay: 2,
      // stagger: 1,
      // x: 0,
      opacity: 0.9,
      duration: 3
    }
  )

  // $gsap.fromTo(
  //   '.loader-content',
  //   {
  //     opacity: 0
  //   },
  //   {
  //     opacity: 1,
  //     duration: 3,
  //     delay: 1
  //   }
  // )
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
  //background-color: transparent; // #fff;
  background-color: rgba(15, 15, 15, 0.3);
  animation: fadeOut 3s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes fadeOut {
  0% {
    background-color: rgba(15, 15, 15, 1);
  }
  100% {
    background-color: rgba(15, 15, 15, 0.2);
  }
}

.loader-content {
  display: flex;
  flex-direction: column;
  animation: 3s oncoming;
}

@keyframes oncoming {
  0% {
    transform: scale(0.9, 0.9);
  }
  100% {
    transform: scale(1, 1);
  }
}
.loader-animation-item {
  opacity: 0;
}

.title {
  font-size: 84px;
  letter-spacing: 2px;
  //transform: scale(0.5, 1);
  font-family: Helvetica;
  font-weight: 500;
  text-transform: uppercase;
}

:deep(.loader-btn) {
  width: 180px;
  font-weight: bold;
}
</style>
