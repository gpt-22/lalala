<template>
  <div ref="root">
    <the-header />

    <div class="hero-section">
      <app-container>
        <h1 class="title">
          «ArchiGrade» - команда опытных специалистов, за нашими плечами более 15 лет успешной
          разработки и реализации проектов любой сложности. Мы просто знаем свое дело!
        </h1>
      </app-container>

      <canvas id="canvas3d" ref="canvas3d" />
    </div>

    <div class="wrapper">
      <div class="video-wrapper">
        <video
          id="video1"
          src="/videos/01_03.mov"
          preload="auto"
          muted
          loop
          autoplay
          disablePictureInPicture
          class="video-kek"
          :class="{ play: video1play }"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        />
        <span class="project-name">Оазиз</span>
      </div>
      <div class="video-wrapper">
        <video
          id="video2"
          src="/videos/01_09.mov"
          preload="auto"
          muted
          loop
          autoplay
          disablePictureInPicture
          class="video-kek"
          :class="{ play: video2play }"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        />
        <span class="project-name">Современник</span>
      </div>
    </div>

    <section class="image-section">
      <img :src="imageInteriors" alt="" />
      <h2>Интерьеры</h2>
    </section>

    <section class="image-section">
      <img :src="imageExteriors" alt="" />
      <h2>Экстерьеры</h2>
    </section>

    <app-container>
      <div class="text-section">
        <h2>Продвижение проекта</h2>
        <p>
          Нужно заинтересовать инвесторов? Привлечь покупателя? Не проблема! Мы предлагаем
          концептуально новый подход к продвижению проектов. Скажем «нет» скучным, статичным кадрам
          и безжизненным картинкам. Подчеркнем уникальность вашего проекта профессиональными
          анимациями, создадим необходимое настроение с помощью качественного смонтированных
          видеороликов. Для нас нет ограничений, при необходимости, даже можем создать
          краткометражный фильм со своим сценарием и живыми актерами, еще на этапе разработки. Что в
          совокупности сделает ваш проект максимально привлекательным для покупателя как можно
          раньше.
        </p>
        <p>
          И как вишенка на торте, создадим полноценный, современный сайт для продвижения проекта.
          Вся информация по вашему проекту для покупателя в один клик: видео, визуализации, рум-
          туры, панорамы 360 градусов, планировочные решения, вся необходимая инфографика, цены,
          этапы реализации, реклама других ваших объектов и отзывы, даже если их нет.
        </p>

        <h2>Дизайн</h2>
        <p>
          Создадим красивые и функциональные пространства, отражающие вашу уникальность. Воплотим
          проекты с учетом трендов, новейших технологий и персональных запросов независимо от
          статуса помещения.
        </p>

        <p>
          Разработаем дизайн-проект и рабочую документацию интерьеров, уделяя внимание деталям и
          пожеланиям заказчика. Вы получите эксклюзивный проект, в котором учтены технические и
          строительные нормы, личные вкусы и образ жизни, продуман каждый нюанс. Ограничений нет. Мы
          можем оформить объект в любом стиле: от классики до модного «лофта».
        </p>

        <p>
          Хотите обновить морально устаревший облик существующего здания или создать с нуля стильный
          фасад? Разработаем дизайн-проект фасадов.
        </p>

        <p>Ландшафтное проектирование</p>
        <p>Авторский надзор</p>
      </div>
    </app-container>

    <the-footer />
  </div>
</template>

<script setup>
import Lenis from 'lenis'
// import { Application } from '@splinetool/runtime'
import imageInteriors from '~/assets/images/projects/int_05_02.jpg'
import imageExteriors from '~/assets/images/projects/ext_03_01.jpg'

const { $gsap, $ScrollTrigger } = useNuxtApp()

definePageMeta({
  layout: 'video'
})

const video1play = ref(false)
const video2play = ref(false)
const onEnter = (event) => {
  console.log('enter', event.target.id)
  if (event.target.id === 'video1') video1play.value = true
  if (event.target.id === 'video2') video2play.value = true
  // event.target.play()
}
const onLeave = (event) => {
  console.log('leave', event)
  if (event.target.id === 'video1') video1play.value = false
  if (event.target.id === 'video2') video2play.value = false
  // event.target.pause()
}

const root = ref()

const canvas3d = ref()

onMounted(() => {
  const lenis = new Lenis({
    duration: 2
  })
  lenis.on('scroll', $ScrollTrigger.update)
  $gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  $gsap.ticker.lagSmoothing(0)

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

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;
}

.video-wrapper {
  position: relative;
  cursor: pointer;

  &:hover {
    .video-kek {
      filter: saturate(100%);
    }

    .project-name {
      opacity: 1;
    }
  }
}

.video-kek {
  min-height: 100%;
  object-fit: cover;
  filter: saturate(40%);
  transition: 0.3s filter;

  &.play {
    filter: saturate(100%);
  }
}

.project-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  text-transform: uppercase;
  font-family: MontserratBold;
  font-weight: 700;
  opacity: 0;
  transition: 0.5s opacity;
}

.text-section {
  padding: 100px 0;
}

.image-section {
  position: relative;
  width: 100vw;
  cursor: pointer;

  &:hover {
    img {
      filter: saturate(100%);
    }

    h2 {
      opacity: 1;
    }
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(40%);
    transition: 0.5s filter;
  }

  & h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 64px;
    text-transform: uppercase;
    font-family: MontserratBold;
    font-weight: 700;
    opacity: 0;
    transition: 0.5s opacity;
    backdrop-filter: blur(2px);
    border-radius: 16px;
    padding: 8px 20px;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
