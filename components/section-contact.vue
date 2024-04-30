<template>
  <section class="section-contact">
    <app-container>
      <h1 id="section-contact-title">Let's talk!</h1>
    </app-container>
  </section>
</template>

<script setup>
const { $gsap } = useNuxtApp();

onMounted(() => {
  $gsap.to(".section-contact", {
    scrollTrigger:  {
      trigger: ".section-contact",
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
    },
    backgroundColor: '#e3e3e3',
    color: '#333333'
  });

  $gsap.to("#section-contact-title", {
    scrollTrigger:  {
      trigger: "#section-contact-title",
      start: 'top 95%',
      end: 'top 65%',
      scrub: true,
    },
    x: 0,
  });
})
</script>

<style scoped lang="scss">
.section-contact {
  @apply h-[750px] pt-[96px] bg-dark text-white;
}

#section-contact-title {
  transform: translate(-400px, 0);
}
</style>
