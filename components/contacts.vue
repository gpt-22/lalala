<template>
  <div class="flex gap-4">
    <!--          <button type="button" class="text-white leading-3 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5">-->
    <!--            Язык: Русский-->
    <!--          </button>-->
    <!--          <button type="button" class="text-text-dark leading-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 bg-white">-->
    <!--            Тут не кнопка а иконки контачей-->
    <!--          </button>-->
    <a href="https://t.me/freedomerr" target="_blank" class="contact-button">
      <icon-tg class="w-[20px] h-[20px]" />
    </a>
    <a href="https://t.me/freedomerr" target="_blank" class="contact-button">
      <icon-whatsapp class="w-[22px] h-[22px]" />
    </a>
    <a href="mailto:gregoryrulit@gmail.com" target="_blank" class="contact-button">
      <icon-mail class="w-[20px] h-[20px]" />
    </a>
  </div>
</template>

<script setup>
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
