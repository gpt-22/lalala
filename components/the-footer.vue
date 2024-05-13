<template>
  <footer class="footer">
    <app-container>
      <div class="footer-content">
        <nuxt-link to="/" class="order-3 sm:order-1 pt-16 sm:pt-0">
          <icon-logo class="w-[147px] h-[20px]" />
        </nuxt-link>

        <nav class="flex flex-col gap-4 uppercase text-sm font-medium order-1  sm:order-2">
          <nuxt-link to="#roadmap">Обзор</nuxt-link>
          <nuxt-link to="#projects">Проекты</nuxt-link>
          <nuxt-link to="#about">О нас</nuxt-link>
        </nav>

        <contacts class="contacts order-2  sm:order-3" />
      </div>
    </app-container>
  </footer>
</template>

<script setup>
import IconLogo from "~/components/icons/icon-logo.vue"
import Contacts from "~/components/contacts.vue"
</script>

<style scoped lang="scss">
.footer {
  @apply text-text-gray-light;

  height: 280px;
  background-color: #0f0f0f;
  padding: 32px 0;

  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 0;
}


@media (max-width: 640px) {
  .footer-content {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr;
  }

  .contacts {
    justify-content: right;
  }
}
</style>

