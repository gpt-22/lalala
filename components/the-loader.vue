<template>
  <div v-show="startLoading" id="site-loader" class="site-loader">
    <div class="loader-content">
      <h1 class="title">Наедине с природой</h1>
      <icon-logo class="mt-3 self-end w-[147px] h-[20px]" />

      <div class="pt-16 flex justify-center gap-5">
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
const { showVideo, startLoading } = useVideo()

/* TODO:
 * темный фон
 * градиент
 * текст
 * + 2 кнопки: видео и перейти на сайт
 * */

const onGoToCinematic = () => {
  startLoading.value = false
}
const onGoToSite = () => {
  startLoading.value = false
  showVideo('2')
}

onMounted(() => {
  $gsap.fromTo(
    '.loader-content',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 3,
      delay: 0.5
    }
  )
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
  background-color: rgba(15, 15, 15, 0.2);
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
}

.title {
  font-size: 84px;
  letter-spacing: -3px;
  //transform: scale(0.5, 1);
}

:deep(.loader-btn) {
  width: 180px;
  font-weight: bold;
}
</style>
