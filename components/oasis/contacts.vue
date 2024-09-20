<template>
  <div class="flex gap-4">
    <a href="tel:+79937671097" target="_blank" class="contact-button">
      <icon-call class="w-[20px] h-[20px]" />
    </a>
    <a href="https://t.me/freedomerr" target="_blank" class="contact-button">
      <icon-tg class="w-[20px] h-[20px]" />
    </a>
    <a href="https://wa.me/79881371097" target="_blank" class="contact-button">
      <icon-whatsapp class="w-[22px] h-[22px]" />
    </a>
    <a href="mailto:archigrade.ru@gmail.com" target="_blank" class="contact-button">
      <icon-mail class="w-[20px] h-[20px]" />
    </a>
  </div>
</template>

<script setup>
import IconCall from '~/components/icons/icon-call.vue'
import IconTg from '~/components/icons/icon-tg.vue'
import IconWhatsapp from '~/components/icons/icon-whatsapp.vue'
import IconMail from '~/components/icons/icon-mail.vue'
</script>

<style scoped lang="scss">
.contact-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  outline: 1px solid currentColor;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 0 4px 2px #f9d0b8;
  }

  &:active {
    color: #f9d0b8;
  }
}
</style>
