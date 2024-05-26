<template>
  <section id="section-2" class="section section-2" ref="section2" @wheel="onWheel">
    <button
      class="section-2-btn section-2-btn-top"
      :class="{ hide: hideMask }"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="showVideo('8')"
    >
      <span>Зона 1</span>
    </button>
    <button
      class="section-2-btn section-2-btn-bottom"
      :class="{ hide: hideMask }"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="showVideo('6')"
    >
      <span>Зона 2</span>
    </button>

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
  </section>
</template>

<script setup>
// TODO квадрат с едздящим текстом
import { IMAGE_BASE_URL } from '~/utils/constants'
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'

const { showVideo, isTransition, videoSaturated, currentVideoKey } = useVideo()

const section2 = ref()

const onMouseEnter = () => {
  // setTimeout(() => (videoSaturated.value = true), 500)
}
const onMouseLeave = () => {
  //  videoSaturated.value = false
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
    goUp(e.deltaY)
  }
}

const hideMask = computed(() => currentVideoKey.value !== '5')
</script>

<style scoped lang="scss">
.section-2 {
  position: relative;
}

.section-2-btn {
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  font-size: 32px;
  z-index: 2;
}

.section-2-btn span {
  opacity: 0;
  transition: opacity 0.5s;
}

.section-2-btn-top {
  top: 20%;
  bottom: 55%;
  left: 0;
  right: 0;

  &:hover {
    opacity: 1;

    ~ .mask-1 {
      opacity: 1;
    }

    span {
      display: initial;
      opacity: 1;
    }
  }
}

.section-2-btn-bottom {
  top: 45%;
  bottom: 25%;
  left: 0;
  right: 0;

  &:hover {
    opacity: 1;

    ~ .mask-2 {
      opacity: 1;
    }

    span {
      opacity: 1;
    }
  }
}

.mask {
  opacity: 0;
  transition: opacity 0.5s;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.hide {
  display: none;
}
</style>
