<template>
 <section id="projects" ref="projectsRef" class="section-projects">
   <app-container>
     <h1 id="section-projects-title">Наши проекты</h1>

     <div class="slider">
        <div class="slide" v-for="i in 26" :key="i" :class="`item${i % 8 + 1}`">
<!--          slide {{i}}-->
        </div>
     </div>

<!--     <div class="mt-6 flex justify-between">-->
<!--       <button class="arrow-btn">-->
<!--         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--           <path d="M15.54 11.2895L9.87998 5.63955C9.78702 5.54582 9.67642 5.47143 9.55456 5.42066C9.4327 5.36989 9.30199 5.34375 9.16998 5.34375C9.03797 5.34375 8.90726 5.36989 8.78541 5.42066C8.66355 5.47143 8.55294 5.54582 8.45998 5.63955C8.27373 5.82691 8.16919 6.08036 8.16919 6.34455C8.16919 6.60873 8.27373 6.86219 8.45998 7.04955L13.41 12.0495L8.45998 16.9995C8.27373 17.1869 8.16919 17.4404 8.16919 17.7045C8.16919 17.9687 8.27373 18.2222 8.45998 18.4095C8.5526 18.504 8.66304 18.5792 8.78492 18.6307C8.90679 18.6822 9.03767 18.709 9.16998 18.7095C9.30229 18.709 9.43317 18.6822 9.55505 18.6307C9.67692 18.5792 9.78737 18.504 9.87998 18.4095L15.54 12.7595C15.6415 12.6659 15.7225 12.5523 15.7779 12.4258C15.8333 12.2993 15.8619 12.1627 15.8619 12.0245C15.8619 11.8864 15.8333 11.7498 15.7779 11.6233C15.7225 11.4968 15.6415 11.3832 15.54 11.2895Z" fill="currentColor"/>-->
<!--         </svg>-->
<!--       </button>-->

<!--       <button class="arrow-btn">-->
<!--         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--           <path d="M15.54 11.2895L9.87998 5.63955C9.78702 5.54582 9.67642 5.47143 9.55456 5.42066C9.4327 5.36989 9.30199 5.34375 9.16998 5.34375C9.03797 5.34375 8.90726 5.36989 8.78541 5.42066C8.66355 5.47143 8.55294 5.54582 8.45998 5.63955C8.27373 5.82691 8.16919 6.08036 8.16919 6.34455C8.16919 6.60873 8.27373 6.86219 8.45998 7.04955L13.41 12.0495L8.45998 16.9995C8.27373 17.1869 8.16919 17.4404 8.16919 17.7045C8.16919 17.9687 8.27373 18.2222 8.45998 18.4095C8.5526 18.504 8.66304 18.5792 8.78492 18.6307C8.90679 18.6822 9.03767 18.709 9.16998 18.7095C9.30229 18.709 9.43317 18.6822 9.55505 18.6307C9.67692 18.5792 9.78737 18.504 9.87998 18.4095L15.54 12.7595C15.6415 12.6659 15.7225 12.5523 15.7779 12.4258C15.8333 12.2993 15.8619 12.1627 15.8619 12.0245C15.8619 11.8864 15.8333 11.7498 15.7779 11.6233C15.7225 11.4968 15.6415 11.3832 15.54 11.2895Z" fill="currentColor"/>-->
<!--         </svg>-->
<!--       </button>-->
<!--     </div>-->

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
      end: 'top 40%',
      scrub: true,
    },
    // x: 0,
    color: '#ffffff'
  });
})
</script>

<style scoped lang="scss">
.section-projects {
  @apply py-[96px] bg-dark text-white;

  min-height: 200vh;
  //scroll-snap-align: start;
  //scroll-snap-stop: always;
}

#section-projects-title {
  color: #0f0f0f;
  //transform: translate(-600px, 0);
}

.slider {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slider {
  position: relative;
  //height: 500px;
  display: flex;
  //display: grid;
  gap: 40px;
  //grid-template-areas:
  //    "a b b"
  //    "a c d"
  //    "e e f"
  //    "g h f";
}


.item1 {
  grid-area: a;
}
.item2 {
  grid-area: b;
}
.item3 {
  grid-area: c;
}
.item4 {
  grid-area: d;
}
.item5 {
  grid-area: e;
}
.item6 {
  grid-area: f;
}
.item7 {
  grid-area: g;
}
.item8 {
  grid-area: h;
}

.slide {
  border-radius: 8px;
  border: 1px solid #00dc82;
  //min-width: 400px;
  min-height: 300px;

  scroll-snap-align: start;

  //transform: translateX(100vw);
  //animation: ticker 8.5s linear infinite;
}
@media (max-width: 640px) {
  .slider {
    gap: 24px;
  }
  .slide {
    min-width: calc(100vw - 32px);
    scroll-snap-align: center;
  }
}


@keyframes ticker {
  from {
    transform: translateX(93vw);
  }
  to {
    transform: translateX(-17vw);
  }
}

.arrow-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #00dc82;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child svg {
    transform: rotate(180deg);
  }
}
</style>
