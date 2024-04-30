<template>
  <div id="aura" ref="aura" :class="{ hidden: isOut }" />
</template>

<script setup>
import { gsap } from 'gsap'

const aura = ref(null)
const isOut = ref(false)

// After update OptimizedHTML5
let cx, cy, mouseX, mouseY, posX, posY

onMounted(() => {
  const body = document.querySelector('body')

  body.addEventListener('mousemove', e => {
    mouseCoords(e)
    isOut.value = false
    // aura.value.classList.remove('hidden')
  })
  body.addEventListener('mouseout', () => {
    isOut.value = true
    // aura.value.classList.add('hidden')
  })

  mouseX = 0, mouseY = 0, posX = 0, posY = 0

  function mouseCoords(e) {
    mouseX = e.pageX
    mouseY = e.pageY
  }

  gsap.to({}, .01, {
    repeat: -1,
    onRepeat: () => {
      posX += (mouseX - posX) / 5
      posY += (mouseY - posY) / 5
      gsap.set(aura.value, {
        css: {
          left: posX - 28,
          top: posY - 28
        }
      })
    }
  })

})
</script>

<style scoped lang="scss">
#aura {
  position: absolute;
  border-radius: 100%;
  transition: .5s cubic-bezier(.75, -1.27, .3, 2.33) transform, .2s cubic-bezier(.75, -1.27, .3, 2.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 10000;

  width: 46px;
  height: 46px;
  border: 1px solid rgba(#fff, .3);
  background-color: rgba(#fff, .1);
  transform: translate(5px, 5px);

  &.dark {
    border: 1px solid rgba(#000, .1);
    background-color: rgba(#000, .02);
  }

  &.active {
    border: 1.2px solid rgba(#fff, .33);
    transform: scale(1.3);
  }
}
</style>
