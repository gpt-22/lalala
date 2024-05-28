<template>
  <section id="section-1" class="section h-screen" ref="section1" @wheel="onWheel">
    <app-container class="flex h-full">
      <div v-show="showInfo" class="project-info">
        <h1 class="title">*****</h1>
        <img :src="imageBack" alt="" class="image-back" />

        <p class="sub-title">*********** ********* *****</p>
        <p class="text text-1">******** - ***** *****</p>
        <p class="text text-2">******* ****** - *****</p>
        <p class="text text-3">***** ****** - **** ***** *</p>
      </div>
    </app-container>
  </section>
</template>

<script setup>
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'
import imageBack from '~/assets/images/img.png'

const { $gsap } = useNuxtApp()
const { videos, isTransition, showVideo } = useVideo()

const section1 = ref()
const showInfo = ref(true)

const setGsapAnimations = () => {
  $gsap.fromTo(
    '.title',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.5,
      delay: 0.5
    }
  )

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
  timeline.to('.title', { duration: 1, text: 'Оазиз' })
  timeline.to('.sub-title', { duration: 1, text: 'Аппартаменты премиального класса' })
  timeline.to('.text-1', { duration: 1, text: 'Расположение - Сочи, Россия' })
  timeline.to('.text-2', { duration: 1, text: 'Общая площадь - 20 000 м2' })
  timeline.to('.text-3', { duration: 1, text: 'Площадь застройки - 10 000 м2' })
}

const goDown = throttle(() => {
  showInfo.value = false
  showVideo('4')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY > 20) {
    goDown(e.deltaY)
  }
}

onMounted(() => {
  setGsapAnimations()
})
</script>

<style scoped lang="scss">
.project-info {
  align-self: end;
  position: relative;
  margin-bottom: 64px;
  padding: 24px 48px;
}

.title {
  position: absolute;
  top: -80px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  opacity: 0;
  font-size: 90px;
  font-family: MontserratAltLight;
  font-weight: 300;
  z-index: 1;
}

.sub-title {
  position: relative;
  font-size: 32px;
  line-height: 48px;
  color: #ffffffe6;
  z-index: 1;
}

.text {
  position: relative;
  color: #ffffffe6;
  line-height: 36px;
  font-size: 24px;
  font-family: MontserratAltLight;
  font-weight: 300;
  z-index: 1;
}

.image-back {
  position: absolute;
  top: 0;
  left: 0;
  height: 208px;

  z-index: 0;
  background: linear-gradient(to right, #00000066 40%, #00000000 100%);
}
</style>
