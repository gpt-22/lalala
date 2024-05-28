<template>
  <div v-show="showAbout" class="about">
    <div class="about-container">
      <app-container>
        <div class="overlay" />

        <button class="close-btn" @click="onClick">
          <icon-close />
        </button>

        <div class="about-info">
          <h2 class="about-title">
            «ArchiGrade» - команда опытных специалистов, за нашими плечами более 15 лет успешной
            разработки и реализации проектов любой сложности. Мы просто знаем свое дело!
          </h2>

          <div class="mt-8 grid grid-cols-2 gap-12">
            <div class="about-col about-col-1">
              <h3 class="title-1 col1-text">Продвижение проекта</h3>
              <p class="col1-text">
                Нужно заинтересовать инвесторов? Привлечь покупателя? Не проблема! Мы предлагаем
                концептуально новый подход к продвижению проектов. Скажем «нет» скучным, статичным
                кадрам и безжизненным картинкам. Подчеркнем уникальность вашего проекта
                профессиональными анимациями, создадим необходимое настроение с помощью
                качественного смонтированных видеороликов. Для нас нет ограничений, при
                необходимости, даже можем создать краткометражный фильм со своим сценарием и живыми
                актерами, еще на этапе разработки. Что в совокупности сделает ваш проект максимально
                привлекательным для покупателя как можно раньше.
              </p>
              <p class="col1-text">
                И как вишенка на торте, создадим полноценный, современный сайт для продвижения
                проекта. Вся информация по вашему проекту для покупателя в один клик: видео,
                визуализации, рум- туры, панорамы 360 градусов, планировочные решения, вся
                необходимая инфографика, цены, этапы реализации, реклама других ваших объектов и
                отзывы, даже если их нет.
              </p>
            </div>

            <div class="about-col about-col-2">
              <h3 class="title-2 col2-text">Дизайн</h3>
              <p class="col2-text">
                Создадим красивые и функциональные пространства, отражающие вашу уникальность.
                Воплотим проекты с учетом трендов, новейших технологий и персональных запросов
                независимо от статуса помещения.
              </p>
              <p class="col2-text">
                Разработаем дизайн-проект и рабочую документацию интерьеров, уделяя внимание деталям
                и пожеланиям заказчика. Вы получите эксклюзивный проект, в котором учтены
                технические и строительные нормы, личные вкусы и образ жизни, продуман каждый нюанс.
                Ограничений нет. Мы можем оформить объект в любом стиле: от классики до модного
                «лофта».
              </p>
              <p class="col2-text">
                Хотите обновить морально устаревший облик существующего здания или создать с нуля
                стильный фасад? Разработаем дизайн-проект фасадов.
              </p>
              <p class="col2-text">Ландшафтное проектирование</p>
              <p class="col2-text">Авторский надзор</p>
            </div>
          </div>
        </div>
      </app-container>
    </div>
  </div>
</template>

<script setup>
import IconClose from '~/components/icons/icon-close.vue'

const { showAbout } = useShow()
const { $gsap } = useNuxtApp()
const { videoSaturated } = useVideo()

const onClick = () => {
  showAbout.value = false
  videoSaturated.value = false
}

watch(showAbout, (value) => {
  if (!value) return

  const timeline = $gsap.timeline()
  timeline.fromTo(
    '.overlay',
    {
      opacity: 0
    },
    {
      opacity: 0.3,
      duration: 0.5
    }
  )
  timeline.fromTo(
    '.about-title',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.3
    }
  )
  timeline.fromTo(
    '.col1-text',
    {
      x: '-50vw',
      opacity: 0
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.3
    }
  )
  timeline.fromTo(
    '.col2-text',
    {
      x: '50vw',
      opacity: 0
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.3
    }
  )
})
</script>

<style scoped lang="scss">
.about {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120vh;
  z-index: 34;
  overflow-y: auto;

  &::before {
    //.overlay {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: #000000;
    opacity: 0.4;
    z-index: 1;
    //}
  }
}

.about-container {
  height: 100%;
  width: 100%;
  position: relative;

  padding: 80px 20px 80px 0;
}

.about-info {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 20px;
}

.about-col {
  @apply flex flex-col gap-5;
}

.close-btn {
  //color: white;
  position: absolute;
  top: 40px;
  right: 2vw;
  height: 40px;
  width: 40px;
  z-index: 5000;

  &:deep(svg) {
    height: 32px;
    width: 32px;
  }
}

.about-title {
  font-size: 1.5em;
  line-height: 1.2em;
  font-weight: 700;
  font-family: MontserratExtraBold;
}
.title-1,
.title-2 {
  font-size: 1.2em;
  font-weight: 700;
  font-family: MontserratExtraBold;
}

@media (min-width: 1920px) {
  .close-btn:deep(svg) {
    height: 40px;
    width: 40px;
  }
  .about-title {
    font-size: 2.5em;
    line-height: 1.5em;
    font-weight: 700;
    font-family: MontserratExtraBold;
  }
  .col1-text,
  .col2-text {
    font-size: 1.5em;
  }
  .title-1,
  .title-2 {
    font-size: 2.2em;
    font-weight: 700;
    font-family: MontserratExtraBold;
  }
}
</style>
