<template>
  <header id="header" class="header" :class="{ open: isOpen }">
    <app-container class="h-full">
      <div class="header-content">
        <nuxt-link to="/" class="flex items-center">
          <logo />
        </nuxt-link>

        <contacts class="contacts" />

        <menu-burger v-model="isOpen" class="menu-burger-button" />

        <div class="burger-menu">
          <nav class="links-burger">
            <nuxt-link to="section-2" class="burger-link">В начало</nuxt-link>
            <!--            <nuxt-link to="#projects" class="burger-link">Проекты</nuxt-link>-->
            <div class="burger-link" @click="aboutClick">О нас</div>
          </nav>
        </div>
      </div>
    </app-container>
  </header>
</template>

<script setup>
import Contacts from '~/components/index/contacts.vue'
import Logo from '~/components/index/header/logo.vue'
import MenuBurger from '~/components/index/header/menu-burger.vue'
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  max-width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  z-index: 33;
  height: 54px;
  color: #fff;
  background: rgba(0, 0, 0, 32%);

  //opacity: 0;
  //transform: translate(0, -60px);
  transition: background-color 0.2s;

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
    background: rgba(22, 22, 23, 0.8);
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
