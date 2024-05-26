<template>
  <section id="section-3" class="section" ref="section3" @wheel="onWheel">
    <div :class="{ hide: hideMask }" class="project-overview-overlay">
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

    <!--    <div-->
    <!--      v-show="showTransitionOverlay"-->
    <!--      class="transition-overlay"-->
    <!--      :class="{ shown: showTransitionOverlay }"-->
    <!--    />-->
  </section>
</template>

<script setup>
import { IMAGE_BASE_URL } from '~/utils/constants'
import { throttle } from '~/utils/decorators'
import { useVideo } from '~/composables/useVideo'
import AppButton from '~/components/ui/app-button.vue'

const { showVideo, isTransition, currentVideoKey, videoSaturated } = useVideo()

const hideMask = computed(() => currentVideoKey.value !== '7')

const goUp = throttle((deltaY) => {
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
    text: 'Бассейная группа',
    to: '/gallery'
  },
  {
    text: 'Лежаки',
    to: '/gallery'
  },
  {
    text: 'Зона отдыха',
    to: '/gallery'
  },
  {
    text: 'Зона с яхтами',
    to: '/gallery'
  }
]

const showTransitionOverlay = ref(true)

const onClickHighlight = () => {
  showTransitionOverlay.value = true
}
</script>

<style scoped lang="scss">
.mask {
  opacity: 0;
  transition: opacity 0.5s;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
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
  //left: 50%;
  //transform: translateX(-50%);
  right: 0;
  bottom: 0;
  //bottom: 10%;
  opacity: 1;
  display: grid;
  grid-template-columns: repeat(4, 200px);
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
.section-btn-3 {
  &:hover {
    ~ .mask-3 {
      opacity: 1;
    }
  }
}
.section-btn-4 {
  &:hover {
    ~ .mask-4 {
      opacity: 1;
    }
  }
}

/////
.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  animation: 0.3s fadeOut ease;

  &::before,
  &::after {
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    background-color: black;
    height: calc(100vh * 0.125);
  }

  &::before {
    top: 0;
    transform: translateY(-100%);
    animation: 0.4s slideTop ease-in-out;
  }

  &::after {
    bottom: 0;
    transform: translateY(100%);
    animation: 0.4s slideBottom ease-in-out;
  }
}

@keyframes slideTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes slideBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes slideBottom {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>
