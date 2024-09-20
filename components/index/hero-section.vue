<template>
  <div class="hero-section">
    <app-container>
      <h1 class="title">
        «ArchiGrade» - команда опытных специалистов, за нашими плечами более 15 лет успешной
        разработки и реализации проектов любой сложности. Мы просто знаем свое дело!
      </h1>
    </app-container>

    <canvas id="canvas3d" ref="canvas3d" />
  </div>
</template>

<script setup lang="ts">
// import { Application } from '@splinetool/runtime'

const canvas3d = ref()

onMounted(() => {
  // const app = new Application(canvas3d.value)
  // app.load('https://my.spline.design/boxeshover-f1d1216848670b8a4a4344b995e5fbee/')
})
</script>

<style scoped lang="scss">
.hero-section {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}
.title {
  font-size: 56px;
}
</style>
