<template>
  <div v-show="startView" id="site-loader" class="site-loader">
    <div class="loader-content">
      <h1 id="loader-title" class="title">
        <span class="everybody">Каждый</span>
        <span class="title-mid">
          <span class="own">свой</span>
          <span class="find">найдет</span>
        </span>
        <span class="oasis">оазиз</span>
      </h1>
      <div id="loader-shadow-title" class="title title-shadow">
        <span class="everybody">Каждый</span>
        <span class="title-mid">
          <span class="own">свой</span>
          <span class="find">найдет</span>
        </span>
        <span class="oasis">оазиз</span>
      </div>

      <div id="loader-buttons" class="buttons-container">
        <app-button theme="dark" class="loader-btn" to="cinematic" @click="onGoToCinematic">
          Синематик
        </app-button>
        <app-button theme="dark" class="loader-btn" to="/" @click="onGoToSite">
          Перейти на сайт
        </app-button>
        <!--        <app-button theme="dark" class="loader-btn loader-btn-last" @click="sound = !sound">-->
        <!--          Звук: {{ sound ? 'Включен' : 'Выключен' }}-->
        <!--        </app-button>-->
      </div>

      <logo class="loader-logo self-end" />
    </div>
  </div>
</template>

<script setup>
import AppButton from '~/components/ui/app-button.vue'
const { $gsap } = useNuxtApp()
const { startView } = useLoader()
const { showVideo } = useVideo()

const onGoToCinematic = () => {
  console.log('onGoToCinematic')
  startView.value = false
  setPageLayout('video')
}
const onGoToSite = () => {
  startView.value = false
  console.log('onGoToSite')
  showVideo('2')
}

const sound = ref(false)

let loaderTimeline = null
onMounted(() => {
  $gsap.fromTo(
    '.site-loader',
    {
      opacity: 0
    },
    {
      opacity: 0.7,
      duration: 3
    }
  )

  const tl = $gsap.timeline({ delay: 5 })
  tl.fromTo(
    '#loader-title',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 1
    }
  )
  tl.fromTo(
    '#loader-shadow-title',
    {
      opacity: 0
    },
    {
      opacity: 0.2,
      duration: 1
    }
  )
  tl.fromTo(
    '#loader-buttons',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 1
    }
  )
  tl.fromTo(
    '.loader-logo',
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 1
    }
  )

  // loaderTimeline = $gsap.timeline({ delay: 6 })
  // loaderTimeline.fromTo(
  //   '.loader-animation-item',
  //   {
  //     opacity: 0
  //   },
  //   {
  //     stagger: 1,
  //     // x: 0,
  //     opacity: 0.6,
  //     duration: 5
  //   }
  // )
  // $gsap.fromTo(
  //   '#loader-buttons',
  //   {
  //     opacity: 0
  //   },
  //   {
  //     delay: 6,
  //     opacity: 1,
  //     duration: 3
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
  //background-color: transparent; // #fff;
  background-color: rgba(15, 15, 15, 0.3);
  //animation: fadeOut 3s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes fadeOut {
  0% {
    opacity: 0;
    //background-color: rgba(15, 15, 15, 0);
  }
  100% {
    opacity: 1;
    border: 50px solid red;
    //background-color: rgba(15, 15, 15, 0.2);
  }
}
.loader-content {
  position: relative;
  bottom: -14%;
  display: flex;
  flex-direction: column;
  //TODO
  animation: 3s oncoming;

  @media (min-width: 1920px) {
    bottom: -9%;
  }
}

@keyframes oncoming {
  0% {
    transform: scale(0.9, 0.9);
  }
  100% {
    transform: scale(1, 1);
  }
}
//.loader-animation-item {
//  opacity: 0;
//}

.title {
  display: flex;
  font-size: 7.8vw;
  line-height: 7.2vw;
  letter-spacing: 0.1vw;
  //transform: scale(0.5, 1);
  font-family: MontserratAlt;
  font-weight: 500;
  text-transform: uppercase;

  opacity: 0.7;
}
.title-mid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.own {
  font-size: 3.9vw;
  line-height: 3.9vw;
  letter-spacing: 0.1em;
}
.find {
  font-size: 2.6vw;
  line-height: 2.6vw;
}
.oasis {
  position: relative;
  color: #b19280;
}

.title-shadow {
  opacity: 0.2;
}

.buttons-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 20px;
  padding: 40px 2px;

  //border-top: 3px solid rgba(255, 255, 255, 0.7);
  //border-right: 2px solid rgba(255, 255, 255, 0.7);
  //border-bottom: 3px solid rgba(255, 255, 255, 0.7);
  border-radius: 6px;

  &:before {
    content: '';
    width: 50%;
    background-color: transparent;
    z-index: 1;
    position: absolute;
    top: -2px;
    left: 0;
    bottom: -2px;
  }
}

svg {
  position: absolute;
  right: -2px;
  width: 100%;
  height: 200%;
}

:deep(.loader-btn) {
  transition: 0.3s width;
  width: 240px;

  &:hover {
    width: 300px;
  }
}
//
//:deep(.loader-btn-last) {
//  //border: 1px solid red;
//  position: relative;
//
//  &::before {
//    content: '';
//    position: absolute;
//    bottom: -22px;
//    left: 2px;
//    width: 100%;
//    height: 2px;
//    background-color: rgba(255, 255, 255, 0.7);
//  }
//}
</style>
