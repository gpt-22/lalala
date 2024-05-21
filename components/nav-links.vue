<template>
  <nav class="flex items-center uppercase text-sm font-medium">
    <nuxt-link v-for="link in links" :to="link.to" class="link" @click="onClick(link.to)">
      <span class="link-text">{{ link.text }}</span>
    </nuxt-link>
  </nav>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
// const { $lenis } = useNuxtApp()

const links = [
  { to: 'section-2', text: 'Обзор' },
  { to: '#projects', text: 'Проекты' },
  { to: '#about', text: 'О нас' },
]

const onClick = (to) => {
  if (route.name !== 'index') {
    router.push(`/${to}`)
  }

  document.querySelector(to).scrollIntoView()
  // $lenis.scrollTo(to)
}
</script>

<style scoped lang="scss">
.link {
  width: 100%;
  padding: 4px 16px;

  &:hover .link-text::before {
    width: 100%;
    left: 0;
  }
}

.link-text {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    display: block;
    height: 1px;
    width: 0px;
    background-color: currentColor;
    transition: .2s;
  }
}
</style>
