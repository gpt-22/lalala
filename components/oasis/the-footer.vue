<template>
  <footer class="footer">
    <app-container>
      <div class="footer-content">
        <nuxt-link to="/" class="order-3 sm:order-1 pt-16 sm:pt-0">
          <logo />
        </nuxt-link>

        <nav-links class="links" />

        <contacts class="contacts order-2 sm:order-3" />
      </div>
    </app-container>
  </footer>
</template>

<script setup>
import Contacts from '~/components/contacts.vue'
</script>

<style scoped lang="scss">
.footer {
  @apply text-text-gray-light;

  height: 280px;
  background-color: #0f0f0f;
  padding: 32px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 0;
}

.links {
  @apply flex-col gap-4 items-start justify-start order-1 sm:order-2;

  &:deep(.link) {
    padding: 0;
  }
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
