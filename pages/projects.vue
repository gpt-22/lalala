<template>
  <div ref="sectionElement" class="section">
    <app-container>
      <!--      <h1>Проекты</h1>-->

      <div ref="root" class="container">
        <a
          v-for="(item, i) in items"
          :key="item.key"
          :id="item.key"
          ref="itemRefs"
          class="image"
          v-intersection-observer="[onIntersectionObserver, { sectionElement }]"
        >
          <img :src="item.img" alt="" />
          <span class="image-text">{{ item.key }}</span>
        </a>
      </div>
    </app-container>
  </div>
</template>

<script setup>
/*
 * бесконечный скролл
 * + плавный скролл
 * анимация карточек
 * сетка карточек
 * + сатурация при наведении
 *
 * */
import { useIntersectionObserver } from '@vueuse/core'
import { vIntersectionObserver } from '@vueuse/components'
import Lenis from 'lenis'
import { throttle } from '~/utils/decorators'

const { $gsap, $ScrollTrigger } = useNuxtApp()

const items = ref([
  {
    key: '1',
    text: '1 Burnt eggplant',
    isVisible: false,
    img: `${IMAGE_BASE_URL}/08/static_renders.0378.png`
  },
  {
    key: '2',
    text: '2 Balti chicken',
    isVisible: false,
    img: `${IMAGE_BASE_URL}/08/static_renders.0380.png`
  },
  {
    key: '3',
    text: '3 Fez Chickpea',
    isVisible: false,
    img: `${IMAGE_BASE_URL}/08/static_renders.0382.png`
  },
  {
    key: '4',
    text: '4 Chana aloo',
    isVisible: false,
    img: `${IMAGE_BASE_URL}/07/static_renders.2251.png`
  },
  {
    key: '5',
    text: '5 Burnt eggplant',
    isVisible: false,
    img: `${IMAGE_BASE_URL}/07/static_renders.2249.png`
  }
])

const itemRefs = ref([])
const root = ref(null)

const getIntersectingSide = () => {}

//[{ target, isIntersecting }]
const onIntersectionObserver = throttle((val) => {
  const v = val[0]
  if (v.isIntersecting) return

  const top = v.intersectionRect.top === 0
  console.log(top, v.target.id)
  if (top) {
    const item = items.value.find((item) => item.key === v.target.id)
    const itemIndex = items.value.indexOf(item)
    // items.value.splice(itemIndex, 1)
    // items.value.push(item)
    // items.value = [item, ...items.value.filter((item) => item.key !== v.target.id)]
  }
  // console.log(target, isIntersecting)
  // isVisible.value = isIntersecting
}, 300)

// const { stop } = useIntersectionObserver(root, ([{ isIntersecting }], observerElement) => {
//   console.log(root, observerElement, isIntersecting)
// targetIsVisible.value = isIntersecting
// })

const sectionElement = ref()

onMounted(() => {
  const lenis = new Lenis({
    wrapper: sectionElement.value,
    duration: 3,
    infinite: true
  })
  lenis.on('scroll', $ScrollTrigger.update)
  $gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  $gsap.ticker.lagSmoothing(0)
})
</script>

<style scoped lang="scss">
.section {
  background-color: #f0f0f0;
  overflow-y: auto;
}
.container {
  //height: fit-content;
  //height: 100%;
  width: 80%;
  margin: auto;
  display: grid;
  //grid-template-columns: 1fr 1fr;
  //grid-template-rows: 1fr;
  gap: 20vh;
  padding: 100px 0;
}

.image {
  position: relative;
  font-size: 60px;
  font-weight: 300;
  display: block;
  background-color: #f0f0f0;
  border-radius: 32px;
  //margin-top: 40px;
  //padding: 16px;
  min-height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: none;
    filter: saturate(0);
    transition: 1s filter ease;

    &:hover {
      filter: saturate(1);
    }
  }

  &-text {
    //color: black;
    position: absolute;
    top: 5%;
    left: 5%;
  }
}

h1 {
  margin-bottom: 100px;
}
</style>
