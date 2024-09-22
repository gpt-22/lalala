<template>
  <section id="section-1" class="section h-screen" ref="section1" @wheel="onWheel">
    <app-container class="flex h-full">
      <div v-show="showInfo" class="project-info w-full">
        <img :src="imageBack" alt="" class="image-back" />

        <h1 class="section-1-title"><span class="section-1-title-span">"ОАЗИС"</span></h1>
        <h2 class="section-1-subtitle">Комплекс апартаментов класса “Люкс”</h2>
        <br />
        <p class="text text-1">
          Добро пожаловать в эксклюзивное гостеприимство! Совершенно новое дыхание концепции
          отдыха... Прежде всего, мы посвятили особое внимание созданию резиденции с изысканным
          архитектурным стилем. <br />
          Наш выбор — фиброцементные плиты EQUITONE кремово-белого и благородного коричневого
          оттенка, чистые геометрические формы и выразительные детали фасада, придающие зданию
          элегантность и утонченность. <br />
          Мы стремимся к безупречности в каждой детали, чтобы создать идеальное визуальное
          впечатление.
        </p>
        <br />
        <p class="text text-2">
          Клубная резиденция «Оазис» - это комплекс на берегу моря в окружении дикой природы. Между
          двумя жилыми зданиями расположились уютный двор и главный подогреваемый бассейн, выходящий
          прямо в море.
        </p>
      </div>
    </app-container>

    <teleport to="#scroll-btns">
      <scroll-buttons v-show="showButtons" class="scroll-btns" :up="true" @up="goUp" />
    </teleport>
  </section>
</template>

<script setup>
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'
import imageBack from '~/assets/images/section1_1.png'

setPageLayout('oasis')

const { $gsap } = useNuxtApp()
const { videos, isTransition, showVideo } = useVideo()

const section1 = ref()
const showInfo = ref(true)
const showButtons = ref(true)

function makeid(length) {
  let result = ''
  const characters = '!@№#$%&*{}[]()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

const setGsapAnimations = () => {
  const timeline = $gsap.timeline({ delay: 0.6 })
  timeline.fromTo(
    '.project-info',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.5,
      delay: 0.5
    }
  )

  // timeline.to('.section-1-title-span', { duration: 1, text: '“ОАЗИС”' })
  // timeline.to('.section-1-subtitle', { duration: 1, text: 'Комплекс апартаментов класса “Люкс”' })
  timeline.fromTo('.section-1-title-span', { opacity: 0 }, { opacity: 1, duration: 0.5 })
  timeline.fromTo('.section-1-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5 })
  timeline.fromTo('.text-1', { opacity: 0 }, { opacity: 1, duration: 0.5 })
  timeline.fromTo('.text-2', { opacity: 0 }, { opacity: 1, duration: 0.5 })
}

const goUp = throttle(() => {
  showButtons.value = false
  showInfo.value = false
  showVideo('4')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY < -20) {
    goUp(e.deltaY)
  }
}

onMounted(() => {
  setGsapAnimations()
})
</script>

<style scoped lang="scss">
.section {
  padding: 0;
}

.project-info {
  align-self: center;
  position: relative;
  padding: 2.2vh 2.78vh 4vh;
  border-radius: 10px;
  overflow: hidden;
}

.image-back {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  aspect-ratio: 1 / 0.92;
  z-index: 0;
  background: linear-gradient(to right, #00000066 40%, #00000000 100%);
}

.section-1-title,
.section-1-subtitle,
.text {
  max-width: 55vh; // 600px;
  position: relative;
}

.section-1-title {
  color: #fff;
  //opacity: 0;
  line-height: 4.4vh; //48px;
  font-size: 2.9vh; //32px;
  font-family: MontserratAltMedium;
  font-weight: 500;
  z-index: 1;

  > span {
    font-size: 3.7vh; //40px;
    line-height: 5.5vh; //60px;
  }
}
.section-1-title-span {
  letter-spacing: 0.29vh;
}

.section-1-subtitle {
  font-size: 2.2vh; //24px;
  font-family: MontserratAltMedium;
  font-weight: 500;
  color: #ffffffe6;
  z-index: 1;
  white-space: nowrap;
}

.text {
  color: #ffffffe6;
  line-height: 2.2vh;
  font-size: 1.85vh; // 20px;
  font-family: MontserratAlt;
  font-weight: 400;
  z-index: 1;
}
</style>
