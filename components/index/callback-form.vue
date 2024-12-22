<script setup lang="ts">
const phone = ref('')
const onSubmit = () => {
  console.log('submit', phone.value)
}
</script>

<template>
  <app-container>
    <div class="flex flex-col items-center">
      <div class="mb-4 text-lg uppercase text-center">Мы Вам перезвоним</div>
      <form class="w-[500px] grid grid-cols-2 gap-6" @submit.prevent="onSubmit">
        <input
          v-model="phone"
          type="tel"
          id="phone"
          class="input"
          placeholder="+7-999-999-99-99"
          pattern="\+?[0-9\s\-\(\)]+"
          required
        />
        <button type="submit" class="submit-button">Заказать звонок</button>
      </form>
    </div>
  </app-container>
</template>

<style scoped lang="scss">
.input {
  padding: 12px 24px;
  border-radius: 16px;
  color: #0f0f0f;
}
.submit-button {
  padding: 12px 24px;
  background: #f13030;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 16px;
  transition: 0.25s background-color;

  &:hover {
    background: #d82b2b;
  }

  &:active {
    background: #bc2525;
  }
}
</style>
