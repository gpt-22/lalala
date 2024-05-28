<template>
  <div class="section">
    <app-container>
      <h1>Проекты</h1>

      <div class="container">
        <a v-for="(item, i) in items" ref="itemRefs" class="recipe-link">
          {{ item }}
        </a>
      </div>
    </app-container>
  </div>
</template>

<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

const items = ref([
  'Burnt eggplant',
  'Balti chicken',
  'Fez Chickpea',
  'Chana aloo',
  'Burnt eggplant',
  'Balti chicken',
  'Fez Chickpea',
  'Chana aloo',
  'Burnt eggplant',
  'Balti chicken',
  'Fez Chickpea',
  'Chana aloo',
  'Burnt eggplant',
  'Balti chicken',
  'Fez Chickpea',
  'Chana aloo',
  'Burnt eggplant',
  'Balti chicken',
  'Fez Chickpea',
  'Chana aloo',
  'Burnt eggplant',
  'Balti chicken',
  'Fez Chickpea',
  'Chana aloo'
])

const itemRefs = ref([])

onMounted(() => {
  console.log('el', $ScrollTrigger)

  // $ScrollTrigger.create({
  //   start: 0,
  //   end: 'max',
  //   onLeave: (self) => {
  //     self.scroll(1)
  //     $ScrollTrigger.update()
  //   },
  //   onLeaveBack: (self) => {
  //     self.scroll($ScrollTrigger.maxScroll(window) - 1)
  //     $ScrollTrigger.update()
  //   }
  // })
  //
  // // Change opacity of link on scroll
  //
  // itemRefs.value.forEach((item, i) => {
  //   // console.log(item, i)
  //   $gsap.to(item, {
  //     opacity: 1,
  //     repeat: 1,
  //     yoyo: true,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: item,
  //       start: 'center bottom',
  //       end: 'center top',
  //       markers: true,
  //       scrub: true
  //     }
  //   })
  // })
})
</script>

<style scoped lang="scss">
a {
  min-height: 60px;
  font-size: 60px;
  font-weight: 300;
  display: block;
}

.recipe-link {
  //opacity: 0;
}

.container {
  height: fit-content;
  width: 80%;
  margin: auto;
}
</style>
