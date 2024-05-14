<template>
  <header id="header" class="header" :class="{ 'open': isOpen }">
    <app-container class="h-full">
      <div class="header-content">
        <nuxt-link to="/" class="flex items-center">
          <icon-logo class="w-[147px] h-[20px]" />
        </nuxt-link>

        <nav-links class="links" />

        <contacts class="contacts" />

        <menu-burger v-model="isOpen" class="menu-burger-button" />

        <div class="burger-menu">
          <nav class="links-burger">
            <nuxt-link to="#roadmap" class="burger-link">Обзор</nuxt-link>
            <nuxt-link to="#projects" class="burger-link">Проекты</nuxt-link>
            <nuxt-link to="#about" class="burger-link">О нас</nuxt-link>
          </nav>
        </div>

      </div>
    </app-container>
  </header>
</template>


<script setup>
import IconLogo from "~/components/icons/icon-logo.vue"
import Contacts from "~/components/contacts.vue"

const { $gsap } = useNuxtApp();

let burgerLinksTimeline

onMounted(() => {
  $gsap.to("#header", {
    y: 0,
    opacity: 1,
    duration: 0.3,
    delay: 1.6
  });

  burgerLinksTimeline = $gsap.timeline({ delay: 0.5 });
  burgerLinksTimeline.to(".burger-link", {
    stagger: 0.15,
    // x: 0,
    opacity: 1,
    duration: 0.3,
  });
})

const isOpen = ref(false)


watch(isOpen, () => {
  if (isOpen) {
    burgerLinksTimeline.restart()
  }
})
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  max-width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  color: #fff;
  background: rgba(22, 22, 23, .2);// linear-gradient(rgba(22, 22, 23, .5), transparent);
  backdrop-filter: blur(10px);
  padding: 1em 0;

  // animation
  opacity: 0;
  transform: translate(0, -60px);
  transition: background-color .2s;

  &.open {
    height: 100vh;
    background: white;
  }
}

.header-content {
  @apply h-full flex items-center justify-between;
}

.menu-burger-button {
  display: none;
}
.burger-menu {
  display: none;
}

.burger-link {
  opacity: 0;
}

.header.open {
  .header-content {
    display: grid;
    grid-template-rows: 24px 1fr;
    grid-template-columns: 1fr 24px;
    grid-area: logo burger-button / menu;
  }

  .burger-menu {
    height: 100%;
    display: flex;
  }

  .links-burger {
    //height: 100%;
    margin-top: 112px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-size: 30px;
    font-weight: 700;
  }
}

@media (max-width: 640px) {
  .header {
    background: rgba(22, 22, 23, .8);
  }

  .header.open .header-content {
    @apply text-text-dark;
  }

  .links,
  .contacts {
    display: none;
  }

  .menu-burger-button {
    display: inline-flex;
  }
}
</style>
