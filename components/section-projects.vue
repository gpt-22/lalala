<template>
 <section id="projects" ref="projectsRef" class="section-projects">
   <app-container>
     <h1 id="section-projects-title">Наши проекты</h1>

     <div class="slider">
        <div class="slide" v-for="i in 10" :key="i" :class="`div${i}`">
          slide {{i}}
        </div>
     </div>

   </app-container>
 </section>
</template>


<script setup>
const { $gsap, $Observer } = useNuxtApp();

onMounted(() => {
  $gsap.to("#section-projects-title", {
    scrollTrigger: {
      trigger: "#section-projects-title",
      start: 'top 95%',
      end: 'top 65%',
      scrub: true,
    },
    x: 0,
  });
})
</script>

<style scoped lang="scss">
.section-projects {
  @apply h-screen pt-[96px] bg-dark text-white;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

#section-projects-title {
  transform: translate(-400px, 0);
}

.slider {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  //overflow-x: auto;
  //scroll-snap-type: x mandatory;
}

.slider {
  height: 500px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  //grid-column-gap: 0px;
  //grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 4 / 2;
  background-color: #9ca3af;
}
.div2 {
  grid-area: 1 / 2 / 3 / 3;
  background-color: #00dc82;
}
.div3 {
  grid-area: 1 / 3 / 4 / 4;
  background-color: #9ca3af;
}
.div4 {
  grid-area: 1 / 4 / 3 / 5;
  background-color: #00dc82;
}
.div5 {
  grid-area: 1 / 5 / 4 / 6;
  background-color: #9ca3af;
}
.div6 {
  grid-area: 4 / 1 / 6 / 2;
  background-color: #00dc82;
}
.div7 {
  grid-area: 3 / 2 / 6 / 3;
  background-color: #9ca3af;
}
.div8 {
  grid-area: 4 / 3 / 6 / 4;
  background-color: #00dc82;
}
.div9 {
  grid-area: 3 / 4 / 6 / 5;
  background-color: #9ca3af;
}
.div10 {
  grid-area: 4 / 5 / 6 / 6;
  background-color: #00dc82;
}

.slide {
  //@apply bg-gray;
  flex-shrink: 0;
  //width: 300px;
  //height: 400px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}
</style>
