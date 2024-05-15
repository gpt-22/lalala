<template>
  <section id="section-2" class="section section-2" ref="section2">
<!--    <button class="section-2-btn section-2-btn-top"></button>-->
<!--    <button class="section-2-btn section-2-btn-bottom"></button>-->

    <app-container>
      <h1>Обзор проекта</h1>
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
const { $gsap, $ScrollTrigger, } = useNuxtApp();
const { showFrame } = useVideoFrame()

const section2 = ref()
const setGsapAnimations = () => {
  $ScrollTrigger.create({
    trigger: section2.value,
    // markers: true,
    start: 'top 60%',
    // markers: true,
    // endTrigger: "#otherID",
    // end: "bottom 50%+=100px",
    onToggle: (self) => {
      console.log('here', self.direction, self.isActive)
      if (self.isActive && self.direction === 1) {
        showFrame(4)
      }
      if (!self.isActive && self.direction === -1) {
        showFrame(3)
      }
      // else {
      //   toStart()
      // }

      // console.log("toggled, isActive:", self.isActive)
    }
  })
}

onMounted(() => {
  setGsapAnimations()
});

</script>

<style scoped lang="scss">
.section-2 {
  position: relative;
}

.section-2-btn {
  position: absolute;
  opacity: 0;
  transition: opacity .3s;
}

.section-2-btn-top {
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;

  &:hover {
    opacity: 1;
    background: linear-gradient(to top, rgba(255,255,255,0), rgba(15,15,15,1));
  }
}

.section-2-btn-bottom {
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;

  &:hover {
    opacity: 1;
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(15,15,15,1));
  }
}
</style>
