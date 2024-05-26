<template>
  <div class="inappropriate-device">
    <h1 class="title text-center">Cайт доступен только на больших разрешениях экрана.</h1>

    <app-button
      :size="btnSize"
      theme="dark"
      class="loader-btn mt-10"
      to="cinematic"
      @click="onGoToCinematic"
    >
      Смотреть видео
    </app-button>
  </div>
</template>

<script setup>
import AppButton from '~/components/ui/app-button.vue'

const onGoToCinematic = () => {
  setPageLayout('video')
}

const { width } = useWindowSize()

const btnSize = computed(() => {
  if (width.value < 426) return 'l'

  return 'xl'
})
</script>

<style scoped lang="scss">
.inappropriate-device {
  width: 100vw;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  @media (max-width: 425px) {
    font-size: 24px;
  }

  //font-size: 48px;
}
</style>
