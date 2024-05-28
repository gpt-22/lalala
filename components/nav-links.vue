<template>
  <nav class="flex items-center uppercase text-sm font-medium">
    <nuxt-link v-for="link in links" :to="link.to" class="link" @click="link.onClick(link)">
      <span class="link-text">{{ link.text }}</span>
    </nuxt-link>
  </nav>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
// const { $lenis } = useNuxtApp()

const { showVideo, videoSaturated } = useVideo()

const onClick = (link) => {
  if (route.name !== 'index') {
    router.push(`/${link.to}`)
  }

  if (link.to === 'section-2') {
    showVideo('5')
  }

  // document.querySelector(to).scrollIntoView()
  // $lenis.scrollTo(to)
}

const { showAbout } = useShow()

const links = [
  {
    to: 'section-2',
    text: 'Обзор',
    onClick: onClick
  },
  // { to: 'projects', text: 'Проекты' },
  {
    to: 'about',
    text: 'О нас',
    onClick: () => {
      showAbout.value = true
      videoSaturated.value = true
    }
  }
]
</script>

<style scoped lang="scss">
.link {
  width: 100%;
  padding: 4px 16px;

  &:hover .link-text::before {
    width: 100%;
    left: 0;
  }

  &:active {
    color: #f9d0b8;

    & .link-text::before {
      background-color: #f9d0b8;
    }
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
    transition: 0.2s;
  }
}
</style>
