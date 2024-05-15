<template>
  <div class="section-intro">
    <div class="section-intro-content" ref="main">
      <app-container>
        <div class="parent">
          <div id="start" ref="screen1" data-scroll-section class="section">
            <section-start />
          </div>

          <div id="roadmap" data-scroll-section ref="roadmapElement" class="section project-overview">
            <h1 id="h1" class="h1 kek">Обзор проекта</h1>
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

          </div>

          <div id="screen3" ref="screen3" data-scroll-section class="section screen-3 h-screen end">
            <h1 id="h2" class="h1 kek">Еще описание</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur distinctio fugiat incidunt labore, nihil nisi possimus quo sit ut? Accusamus architecto assumenda consectetur distinctio earum error exercitationem explicabo fugit, harum inventore magni modi nesciunt, nisi pariatur porro quisquam quo quos repellendus rerum soluta, temporibus totam ullam voluptas!
            </p>
          </div>
        </div>
      </app-container>
    </div>
  </div>
</template>

<script setup>
import { useVideoFrame } from "../composables/useVideoFrame"
import { useSectionScroll } from "../composables/useSectionScroll"

const { $gsap, $ScrollTrigger, $lenis } = useNuxtApp();
const { toStart, toEnd } = useVideoFrame()

const screen1 = ref()
const roadmapElement = ref()
const screen3 = ref()

const main = ref();

const { startScrollObserver } = useSectionScroll($lenis)


const sections = computed(() => [screen1.value, roadmapElement.value, screen3.value])


const setGsapAnimations = () => {
  $ScrollTrigger.create({
    trigger: roadmapElement.value,
    // markers: true,
    start: 'top 60%',
    // markers: true,
    // endTrigger: "#otherID",
    // end: "bottom 50%+=100px",
    onToggle: (self) => {
      if (self.isActive) {
        toEnd()
      } else {
        toStart()
      }

      // console.log("toggled, isActive:", self.isActive)
    }
  })
}

onMounted(() => {
  setGsapAnimations()
  startScrollObserver(sections.value)
});
</script>

<style lang="scss">
.section-intro {
  //position: relative;
  //width: 100vw;
  //height: 100vh;
}

.section-intro-content {
  position: relative;
  color: #fff;
}

.project-overview,
.screen-3 {
  position: relative;
}

.project-overview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
}

.section {
  height: 100vh;
  box-sizing: border-box;
  padding-top: 100px;
}
</style>
