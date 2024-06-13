<template>
  <nav class="flex items-center uppercase text-sm font-medium">
    <template v-for="link in links">
      <nuxt-link v-if="link.to" :to="link.to" class="link" @click="link.onClick(link)">
        <span class="link-text">{{ link.text }}</span>
      </nuxt-link>
      <button v-else class="link" @click="link.onClick(link)">
        <span class="link-text">{{ link.text }}</span>
      </button>
    </template>
  </nav>
</template>

<script setup>
const { showVideo, videoSaturated } = useVideo()
const { showAbout } = useShow()

const links = [
  {
    to: 'section-1',
    text: 'В начало',
    onClick: () => showVideo('3')
  },
  {
    to: 'cinematic',
    text: 'Синематик',
    onClick: () => {}
  },
  {
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
  white-space: nowrap;
  text-transform: uppercase;

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
