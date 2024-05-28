<template>
  <section id="section-3" class="section" ref="section3" @wheel="onWheel">
    <div v-show="showButtons" :class="{ hide: hideMask }" class="project-overview-overlay">
      <app-button
        v-for="(highlight, idx) in highlights"
        :key="idx"
        class="!font-bold section-btn"
        :class="[`section-btn-${idx + 1}`]"
        size="s"
        @click="onClickHighlight"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        {{ highlight.text }}
      </app-button>

      <img
        :src="`${IMAGE_BASE_URL}/02_01.png`"
        alt=""
        class="mask mask-1"
        :class="{ hide: hideMask }"
      />
      <img
        :src="`${IMAGE_BASE_URL}/02_02.png`"
        alt=""
        class="mask mask-2"
        :class="{ hide: hideMask }"
      />
      <img
        :src="`${IMAGE_BASE_URL}/02_03.png`"
        alt=""
        class="mask mask-3"
        :class="{ hide: hideMask }"
      />
      <img
        :src="`${IMAGE_BASE_URL}/02_04.png`"
        alt=""
        class="mask mask-4"
        :class="{ hide: hideMask }"
      />
    </div>
  </section>
</template>

<script setup>
import { IMAGE_BASE_URL } from '~/utils/constants'
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'
import AppButton from '~/components/ui/app-button.vue'

const { startLoading } = useLoader()
const { showVideo, isTransition, currentVideoKey, videoSaturated } = useVideo()

const showButtons = ref(true)
const hideMask = computed(() => currentVideoKey.value !== '7')

const goUp = throttle((deltaY) => {
  showButtons.value = false
  console.log('3 SCROLL UP', deltaY)
  showVideo('6r')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY < -20) {
    goUp(e.deltaY)
  }
}
const onMouseEnter = () => {
  videoSaturated.value = true
}
const onMouseLeave = () => {
  videoSaturated.value = false
}

const highlights = [
  {
    text: 'Пирс',
    to: '/gallery'
  },
  {
    text: 'Бассейн',
    to: '/gallery'
  },
  {
    text: 'Лежаки',
    to: '/gallery'
  },
  {
    text: 'Пляж',
    to: '/gallery'
  }
]

const { showLeaveOverlay } = usePageOverlay()
const router = useRouter()
const onClickHighlight = () => {
  showButtons.value = false
  videoSaturated.value = false
  showLeaveOverlay.value = true
  setTimeout(() => {
    router.push('/gallery')
  }, 2500)
  setTimeout(() => (showLeaveOverlay.value = false), 2700)
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  display: grid;
  grid-template-columns: repeat(4, 250px);
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 3;

  &:before {
    content: 'Выберите зону';
    position: absolute;
    top: 46px;
    left: 50%;
    transform: translateX(-50%);
    width: 1060px;
    margin-top: 80vh;
    border-bottom: 3px solid #f9d0b8;
    text-align: right;
    font-size: 14px;
    line-height: 24px;
    color: #f9d0b8;
  }
}

:deep(.section-btn) {
  margin-top: 80vh;
  z-index: 20;

  &::before {
    content: 'перейти';
    position: absolute;
    bottom: -34px;
    left: 0;
    width: 100%;
    border-top: 3px solid #f9d0b8;
    font-size: 14px;
    line-height: 24px;
    text-align: left;
    color: #f9d0b8;
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

.section-btn-1 {
  &:hover {
    ~ .mask-4 {
      opacity: 1;
    }
  }
}
.section-btn-2 {
  &:hover {
    ~ .mask-1 {
      opacity: 1;
    }
  }
}
.section-btn-3 {
  &:hover {
    ~ .mask-2 {
      opacity: 1;
    }
  }
}
.section-btn-4 {
  &:hover {
    ~ .mask-3 {
      opacity: 1;
    }
  }
}
</style>
