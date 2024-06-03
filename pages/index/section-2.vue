<template>
  <section
    v-show="showButtons"
    id="section-2"
    class="section section-2"
    ref="section2"
    @wheel="onWheel"
  >
    <div :class="{ hide: hideMask }" class="project-overview-overlay">
      <app-button
        v-for="(highlight, idx) in highlights"
        :key="idx"
        class="!font-bold section-btn"
        :class="[`section-btn-${idx + 1}`]"
        size="s"
        @click="highlight.onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        {{ highlight.text }}
      </app-button>

      <img
        :src="`${IMAGE_BASE_URL}/01_01.png`"
        alt=""
        class="mask mask-1"
        :class="{ hide: hideMask }"
      />
      <img
        :src="`${IMAGE_BASE_URL}/01_02.png`"
        alt=""
        class="mask mask-2"
        :class="{ hide: hideMask }"
      />
    </div>

    <teleport to="#scroll-btns">
      <scroll-buttons class="scroll-btns" :down="true" @down="goDown" />
    </teleport>
  </section>
</template>

<script setup>
// TODO квадрат с едздящим текстом
import AppButton from '~/components/ui/app-button.vue'
import { IMAGE_BASE_URL } from '~/utils/constants'
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'

const { showVideo, isTransition, videoSaturated, currentVideoKey } = useVideo()

const section2 = ref()

const onMouseEnter = () => {
  videoSaturated.value = true
}
const onMouseLeave = () => {
  videoSaturated.value = false
}

const goDown = throttle((deltaY) => {
  console.log('2 SCROLL UP', deltaY)
  showVideo('4r')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY > 20) {
    showButtons.value = false
    console.log('hide')
    goDown(e.deltaY)
  }
}

const showButtons = ref(true)
const hideMask = computed(() => currentVideoKey.value !== '5')

const highlights = [
  {
    text: 'Пляж',
    to: '/section-4',
    onClick: () => {
      showButtons.value = false
      videoSaturated.value = false
      showVideo('6')
    }
  },
  {
    text: 'Резиденция',
    to: '/section-3',
    onClick: () => {
      showButtons.value = false
      videoSaturated.value = false
      showVideo('8')
    }
  }
]
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
  grid-template-columns: repeat(2, 250px);
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 3;
}

:deep(.section-btn) {
  margin-top: 80vh;
  z-index: 20;
  position: relative;

  &::before {
    content: 'перейти';
    position: absolute;
    bottom: -34px;
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

.section-btn-1 {
  &:hover {
    ~ .mask-2 {
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

:deep(.section-btn-1) {
  position: relative;

  &::after {
    content: 'Выберите зону';
    position: absolute;
    top: -36px;
    left: 0;
    width: calc(200% + 20px);
    border-bottom: 3px solid #b19280;
    text-align: right;
    font-size: 14px;
    line-height: 24px;
    color: #b19280;
  }
}
</style>
