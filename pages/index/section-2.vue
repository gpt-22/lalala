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

const goUp = throttle((deltaY) => {
  console.log('2 SCROLL UP', deltaY)
  showVideo('4r')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY < -20) {
    showButtons.value = false
    console.log('hide')
    goUp(e.deltaY)
  }
}

const showButtons = ref(true)
const hideMask = computed(() => currentVideoKey.value !== '5')

const highlights = [
  {
    text: 'Зона 1',
    to: '/section-3',
    onClick: () => {
      showButtons.value = false
      videoSaturated.value = false
      showVideo('8')
    }
  },
  {
    text: 'Зона 2',
    to: '/section-4',
    onClick: () => {
      showButtons.value = false
      videoSaturated.value = false
      showVideo('6')
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
  grid-template-columns: repeat(2, 200px);
  justify-content: center;
  align-items: center;
  gap: 1px;
  z-index: 3;
}

:deep(.section-btn) {
  margin-top: 80vh;
  z-index: 20;
}

.section-btn-1 {
  &:hover {
    ~ .mask-1 {
      opacity: 1;
    }
  }
}
.section-btn-2 {
  &:hover {
    ~ .mask-2 {
      opacity: 1;
    }
  }
}
</style>
