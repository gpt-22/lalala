<template>
  <nav class="flex items-center uppercase text-sm font-medium">
    <nuxt-link to="#roadmap" class="link">
      <span class="link-text">Обзор</span>
    </nuxt-link>
    <nuxt-link to="#projects" class="link">
      <span class="link-text">Проекты</span>
    </nuxt-link>
    <nuxt-link to="#about" class="link">
      <span class="link-text">О нас</span>
    </nuxt-link>
  </nav>
</template>

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
