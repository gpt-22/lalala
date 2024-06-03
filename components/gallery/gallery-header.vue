<template>
  <header class="gallery-header">
    <div class="flex items-center gap-8">
      <burger-button v-model="menuOpen" />
      <div class="location-title">
        {{ currentLocation?.title }}
      </div>
    </div>
    <burger-menu
      v-model="menuOpen"
      :active-key="currentLocation?.key"
      @change-location="setLocation"
    />

    <div class="overlay" :class="{ shown: menuOpen }" />

    <button @click="onBack">
      <icon-close />
    </button>
  </header>
</template>

<script setup>
/* TODO:
 * анимация скрытия оверлэя
 * */

import BurgerButton from './burger-button.vue'
import BurgerMenu from './burger-menu.vue'
import IconClose from '~/components/icons/icon-close.vue'

const { play, currentLocation, setLocation } = useGallery()

const menuOpen = ref(false)
let prevPlayState = play.value
watch(menuOpen, (value) => {
  if (value) {
    prevPlayState = play.value
  }

  if (value && play.value) {
    play.value = false
  }

  if (!value && prevPlayState) {
    play.value = true
  }
})

const route = useRoute()
const router = useRouter()
const { showEnterOverlay, showLeaveOverlay } = usePageOverlay()
const { showVideo } = useVideo()
const onBack = () => {
  showLeaveOverlay.value = true

  setTimeout(() => {
    const toSection = route.query.fromPage || 'section-3'
    const toSectionVideo = toSection === 'section-4' ? '9' : '7'

    showVideo(toSectionVideo)
    router.push({ path: toSection })
  }, 2500)

  setTimeout(() => {
    showLeaveOverlay.value = false
    showEnterOverlay.value = true
  }, 2700)
}
</script>

<style scoped lang="scss">
.gallery-header {
  background-color: black;
  position: absolute;
  height: calc(100vh * 0.125);
  z-index: 34; //2;
}

.gallery-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  z-index: 4;
}

.location-title {
  font-size: 24px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  transition: 0.5s opacity;

  &.shown {
    bottom: 0;
    opacity: 1;
    z-index: 3;
  }
}
</style>
