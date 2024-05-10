<template>
  <div class="section-intro">
    <div class="section-intro-media">
      <video v-show="show1" :src="video1" autoplay muted loop class="video" />
      <video v-show="show2" :src="video2" autoplay muted loop class="video" />
      <video v-show="show3" :src="video3" autoplay muted loop class="video" />
      <video v-show="show4" :src="video4" autoplay muted loop class="video" />
    </div>

    <div class="section-intro-content" ref="main">
      <app-container>
        <div ref="screen1">
          <section-video-info class="h-screen"/>
        </div>

        <div ref="screen2" class="h-screen end">
          <h1 id="h1" class="h1 kek">Select your house 2</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur distinctio fugiat incidunt labore, nihil nisi possimus quo sit ut? Accusamus architecto assumenda consectetur distinctio earum error exercitationem explicabo fugit, harum inventore magni modi nesciunt, nisi pariatur porro quisquam quo quos repellendus rerum soluta, temporibus totam ullam voluptas! Dolorem ipsa, magnam minima molestiae, molestias natus, officia quos repudiandae similique temporibus totam voluptatibus voluptatum! Accusamus accusantium at corporis deleniti dolor dolore ducimus ea eaque eius eligendi enim error est, eveniet ex expedita fuga fugit ipsum laborum maiores nemo non obcaecati omnis quaerat quas quibusdam quis saepe sed, similique, sint velit vero voluptas.
          </p>
        </div>

        <div ref="screen3" class="h-screen end">
          <h1 id="h2" class="h1 kek">Select your house 4</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur distinctio fugiat incidunt labore, nihil nisi possimus quo sit ut? Accusamus architecto assumenda consectetur distinctio earum error exercitationem explicabo fugit, harum inventore magni modi nesciunt, nisi pariatur porro quisquam quo quos repellendus rerum soluta, temporibus totam ullam voluptas! Dolorem ipsa, magnam minima molestiae, molestias natus, officia quos repudiandae similique temporibus totam voluptatibus voluptatum! Accusamus accusantium at corporis deleniti dolor dolore ducimus ea eaque eius eligendi enim error est, eveniet ex expedita fuga fugit ipsum laborum maiores nemo non obcaecati omnis quaerat quas quibusdam quis saepe sed, similique, sint velit vero voluptas.
          </p>
        </div>
      </app-container>
    </div>
  </div>
</template>

<script setup>
import video1 from '~/public/video/test_01.mp4'
import video2 from '~/public/video/test_02.mp4'
import video3 from '~/public/video/test_03.mp4'
import video4 from '~/public/video/test_04.mp4'

const { $gsap, $ScrollTrigger } = useNuxtApp();

const screen1 = ref()
const screen2 = ref()
const screen3 = ref()

const show1 = ref(true)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

const toEnd = () => {
  show2.value = true
  setTimeout(() => {
    show3.value = true
    show4.value = false
    show2.value = false
    show1.value = false
  }, 200)
}
const toEndDebounced = debounce(toEnd, 50)

const toStart = () => {
  show4.value = true
  setTimeout(() => {
    show1.value = true
    show2.value = false
    show3.value = false
    show4.value = false
  }, 200)
}
const toStartDebounced = debounce(toStart, 50)


const main = ref();

onMounted(() => {
  $ScrollTrigger.create({
    trigger: screen2.value,
    start: 'top 50%',
    // markers: true,
    // endTrigger: "#otherID",
    // end: "bottom 50%+=100px",
    onToggle: (self) => {
      if (self.isActive) {
        toEndDebounced()
      } else {
        toStartDebounced()
      }

      console.log("toggled, isActive:", self.isActive)
    }
  })

  // $gsap.to(screen2.value, {
  //   scrollTrigger: {
  //     trigger: screen2.value,
  //     start: 'top 50%',
  //     // end: 'top 20%',
  //     scrub: true,
  //     markers: true
  //   },
  //   onStart: () => {
  //     console.log('start 2')
  //     toEnd()
  //   },
  // });
  //
  // $gsap.to(screen1.value, {
  //   scrollTrigger: {
  //     trigger: screen1.value,
  //     start: 'bottom 20%',
  //     end: 'top 20%',
  //     scrub: false,
  //     // markers: true
  //   },
  //   onStart: () => {
  //     console.log('start 1')
  //     // toEnd()
  //   },
  //   onEnter: () => {
  //     console.log('onEnter')
  //   },
  //   onEnterBack: () => {
  //     console.log('onEnterBack')
  //   },
  //   onLeave: () => {
  //     console.log('onLeave')
  //   },
  //   onLeaveBack: () => {
  //     console.log('onLeaveBack')
  //   },
    // onEnd: () => {
    //   console.log('end')
    // },
    // onStop: () => {
    //   console.log('stop')
    // },
    // onUpdate: () => {
    //   console.log("onUpdate");
    // },
  // });
});
</script>

<style lang="scss">
.section-intro {
  //position: relative;
  //width: 100vw;
  //height: 100vh;
}

.section-intro-media {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  overflow: hidden;
  background: url("~/public/video/placeholder.jpeg") no-repeat center center;
  background-size: cover;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.section-intro-content {
  position: relative;
  //z-index: 1;
  //height: 100vh;
  //overflow-y: scroll;
  color: #fff;
}
</style>
