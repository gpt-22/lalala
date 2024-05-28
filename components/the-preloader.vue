<template>
  <div v-if="preloader" class="preloader">
    <!--    <div v-if="!quality.length" class="quality-container">-->
    <!--      <app-button @click="quality = 'h'">Высокое</app-button>-->
    <!--      <app-button @click="quality = 'm'">Среднее</app-button>-->
    <!--    </div>-->
    <!---->
    <!--    <app-button @click="quality = 'm'">Продолжить</app-button>-->
    <!--    <app-checkbox></app-checkbox>-->

    <div v-if="quality.length" class="flex flex-col gap-1 items-end">
      <div class="progress" />
      <div class="counter">100</div>
    </div>

    <!--      <div class="sound-container">-->
    <!--        <app-button size="s" :active="sound">Включен</app-button>-->
    <!--        <app-button size="s" :active="!sound">Выключен</app-button>-->
    <!--      </div>-->
  </div>
</template>

<script setup>
import { Power2 } from 'gsap'
import AppButton from '~/components/ui/app-button.vue'
import AppCheckbox from '~/components/ui/app-checkbox.vue'

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

const quality = ref('h')
const sound = ref(false)
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
  min-width: 300px;
  width: 100%;
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
  font-style: italic;
  font: 600 1.2em system-ui;
  color: #b19280;
  text-align: right;
}

.quality-container,
.sound-container {
  margin-top: 60px;
  position: relative;
  display: flex;
  gap: 16px;

  &:before {
    content: 'Выберите качество';
    position: absolute;
    top: -48px;
    left: 0;
    width: 100%;
    border-bottom: 3px solid #f9d0b8;
    text-align: left;
    font-size: 16px;
    line-height: 30px;
    color: #f9d0b8;
  }
}

.sound-container {
  &:before {
    content: 'Звук';
  }
}
</style>
