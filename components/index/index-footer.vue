<template>
  <footer>
    <app-container class="h-full">
      <div class="footer-content">
        <nuxt-link to="/" class="flex items-center pl-4">
          <logo />
        </nuxt-link>

        <contacts class="contacts" />
      </div>
    </app-container>
  </footer>
</template>

<script setup lang="ts">
import Contacts from '~/components/index/contacts.vue'
import Logo from '~/components/index/header/logo.vue'
</script>

<style scoped lang="scss">
.footer-content {
  @apply h-full flex items-center justify-between;

  padding: 100px 0;
}
</style>
