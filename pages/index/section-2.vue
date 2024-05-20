<template>
  <section id="section-2" class="section section-2" ref="section2" @wheel="onWheel">
    <!--      <button class="section-2-btn section-2-btn-top" @click="showZone1">-->
    <!--        <span>Зона 1</span>-->
    <!--      </button>-->
    <!--      <button class="section-2-btn section-2-btn-bottom"  @click="showZone2">-->
    <!--        <span>Зона 2</span>-->
    <!--      </button>-->


    <!--      <text-highlight top="76%" left="50%" to="/elevator">-->
    <!--        Бассейная группа-->
    <!--      </text-highlight>-->

    <!--      <img :src="img1" alt="" class="mask mask-1">-->
    <!--      <img :src="img2" alt="" class="mask mask-2">-->

    <app-container>
      <!--            <h1>Обзор проекта</h1>-->

      <!--            <div class="project-overview-overlay">-->
      <!--              <text-highlight top="76%" left="50%" to="/elevator">-->
      <!--                Бассейная группа-->
      <!--              </text-highlight>-->
      <!--              <text-highlight top="40%" left="50%" to="/elevator">-->
      <!--                Зона с яхтами-->
      <!--              </text-highlight>-->
      <!--              <text-highlight top="30%" left="50%" to="/elevator">-->
      <!--                Лифтовая зона-->
      <!--              </text-highlight>-->
      <!--              <text-highlight top="20%" left="40%" to="/elevator">-->
      <!--                Аквариум-->
      <!--              </text-highlight>-->
      <!--            </div>-->
    </app-container>
  </section>
</template>

<script setup>
import { throttle } from "~/utils/decorators"
import { useVideoFrame } from "~/composables/useVideoFrame"

import image1 from '~/public/video/01_01.png'
import image2 from '~/public/video/01_02.png'


import img from '~/public/video/01_01.png'

const { $gsap, $ScrollTrigger, } = useNuxtApp();
const { showFrame, isTransition } = useVideoFrame()

const section2 = ref()

const goUp = throttle((deltaY) => {
  console.log("2 SCROLL UP", deltaY)
  showFrame('4r')
}, 1000)
const goDown = throttle((deltaY) => {
  console.log("2 SCROLL DOWN", deltaY)
  showFrame('6')
}, 1000)

const onWheel = (e) => {
  if (isTransition.value) {
    return
  }

  if (e.deltaY > 20) {
    goDown(e.deltaY)
  }
  if (e.deltaY < -20) {
    goUp(e.deltaY)
  }
}

// const setGsapAnimations = () => {
//   $ScrollTrigger.create({
//     trigger: section2.value,
//     start: 'top 60%',
//     onToggle: (self) => {
//       console.log('here', self.direction, self.isActive)
//       if (self.isActive && self.direction === 1) {
//         showFrame('4')
//       }
//       if (!self.isActive && self.direction === -1) {
//         showFrame('3')
//       }
//     }
//   })
// }
//
onMounted(() => {
//   setGsapAnimations()
});

</script>

<style scoped lang="scss">
.section-2 {
  position: relative;
}

//.project-overview-overlay {
//  position: fixed;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//  opacity: 1;
//}

.section-2-btn {
  position: absolute;
  opacity: 0;
  transition: opacity .3s;
  color: #fff;
  font-size: 32px;
  //background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.section-2-btn span {
  opacity: 0;
  transition: opacity .5s;
}

.section-2-btn-top {
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;

  &:hover {
    opacity: 1;
    //background-color: none;
    //background-color: rgba(0, 0, 0, 0);
    //background: linear-gradient(to top, rgba(255,255,255,0), rgba(15,15,15,1));

    ~ .mask-1 {
      opacity: 1;
      //border: 1px solid red;
    }

    span {
      display: initial;
      opacity: 1;
    }
  }
}

.section-2-btn-bottom {
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;

  &:hover {
    opacity: 1;
    //background-color: none;
    //background-color: rgba(0, 0, 0, 0);
    //background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(15,15,15,1));

    ~ .mask-2 {
      display: initial;
      opacity: 1;
      //border: 1px solid red;
    }

    span {
      opacity: 1;
    }
  }
}

.mask {
  //display: none;
  //opacity: 0;
  transition: opacity .5s;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  //  background: url("/video/01_01.png") no-repeat center center;
  //z-index: 1;
}
</style>
