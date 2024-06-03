<template>
  <section id="section-4" class="section" ref="section4" @wheel="onWheel">
    <div v-show="showButtons" :class="{ hide: hideMask }" class="project-overview-overlay">
      <app-button
        v-for="(highlight, idx) in highlights"
        :key="idx"
        class="!font-bold section-btn"
        :class="[`section-btn-${idx + 1}`]"
        size="s"
        @click="onClickHighlight(highlight)"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        {{ highlight.text }}
      </app-button>

      <!--      <img-->
      <!--        :src="`${IMAGE_BASE_URL}/02_01.png`"-->
      <!--        alt=""-->
      <!--        class="mask mask-1"-->
      <!--        :class="{ hide: hideMask }"-->
      <!--      />-->
      <!--      <img-->
      <!--        :src="`${IMAGE_BASE_URL}/02_02.png`"-->
      <!--        alt=""-->
      <!--        class="mask mask-2"-->
      <!--        :class="{ hide: hideMask }"-->
      <!--      />-->
      <!--      <img-->
      <!--        :src="`${IMAGE_BASE_URL}/02_03.png`"-->
      <!--        alt=""-->
      <!--        class="mask mask-3"-->
      <!--        :class="{ hide: hideMask }"-->
      <!--      />-->
      <!--      <img-->
      <!--        :src="`${IMAGE_BASE_URL}/02_04.png`"-->
      <!--        alt=""-->
      <!--        class="mask mask-4"-->
      <!--        :class="{ hide: hideMask }"-->
      <!--      />-->
    </div>

    <teleport to="#scroll-btns">
      <scroll-buttons v-show="showButtons" class="scroll-btns" :down="true" @down="goDown" />
    </teleport>
  </section>
</template>

<script setup>
import { IMAGE_BASE_URL } from '~/utils/constants'
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'
import AppButton from '~/components/ui/app-button.vue'

const { startView } = useLoader()
const { showVideo, isTransition, currentVideoKey, videoSaturated } = useVideo()

const showButtons = ref(true)
const hideMask = computed(() => currentVideoKey.value !== '7')

const goDown = throttle((deltaY) => {
  showButtons.value = false
  console.log('3 SCROLL UP', deltaY)
  showVideo('8r')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY > 20) {
    goDown(e.deltaY)
  }
}
const onMouseEnter = () => {
  // videoSaturated.value = true
}
const onMouseLeave = () => {
  // videoSaturated.value = false
}

const highlights = [
  {
    text: 'Смотровая площадка и лифты',
    to: '/gallery?location=watch-area&fromPage=section-4'
  },
  {
    text: 'Въездная группа и аквариум',
    to: '/gallery?location=aquarium&fromPage=section-4'
  },
  {
    text: 'Многофункциональные помещения',
    to: '/gallery?location=multifunctional-rooms&fromPage=section-4'
  },
  {
    text: 'Летняя эстрада',
    to: '/gallery?location=summer-stage&fromPage=section-4'
  },
  {
    text: 'Ресторан "Hoft" с бассейном',
    to: '/gallery?location=restaurant&fromPage=section-4'
  },
  {
    text: 'Общие',
    to: '/gallery?location=common&fromPage=section-4'
  }
]

const { showLeaveOverlay } = usePageOverlay()
const router = useRouter()
const onClickHighlight = (highlight) => {
  showButtons.value = false
  videoSaturated.value = false
  showLeaveOverlay.value = true
  setTimeout(() => {
    router.push(highlight.to)
  }, 2500)
}
</script>

<style scoped lang="scss">
.mask {
  opacity: 0;
  transition: opacity 0.5s;
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  object-fit: cover;
  z-index: 1;
}

.hide {
  display: none;
}

.project-overview-overlay {
  position: relative;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  display: inline-grid;
  grid-template-columns: repeat(3, 250px);
  justify-content: center;
  align-items: center;
  grid-column-gap: 24px;
  grid-row-gap: 28px;
  z-index: 3;
  //background: linear-gradient(to bottom, #00000066 40%, #00000000 100%);

  &:before {
    content: 'Выберите зону';
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    width: 798px;
    border-bottom: 3px solid #b19280;
    text-align: right;
    font-size: 14px;
    line-height: 24px;
    color: #b19280;
  }
}

:deep(.section-btn) {
  z-index: 20;

  &::before {
    content: 'перейти';
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
    border-top: 3px solid #b19280;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    color: #b19280;
    transform: translateY(-50%);
    opacity: 0;
    transition:
      0.4s transform,
      0.1s opacity;
  }

  &:hover::before {
    opacity: 1;
    transform: translateY(0%);
  }

  &:not(:hover)::before {
    animation: 0.3s slide-top ease-in-out;
  }

  @keyframes slide-top {
    0% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 0;
      transform: translateY(-50%);
    }
  }
}

//.section-btn-1 {
//  &:hover {
//    ~ .mask-4 {
//      opacity: 1;
//    }
//  }
//}
//.section-btn-2 {
//  &:hover {
//    ~ .mask-1 {
//      opacity: 1;
//    }
//  }
//}
//.section-btn-3 {
//  &:hover {
//    ~ .mask-2 {
//      opacity: 1;
//    }
//  }
//}
//.section-btn-4 {
//  &:hover {
//    ~ .mask-3 {
//      opacity: 1;
//    }
//  }
//}
</style>
