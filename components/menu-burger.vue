<template>
  <button class="burger-button" :class="{ 'open': modelValue }" @click="$emit('update:model-value', !modelValue)">
    <svg class="burger-icon" :class="{ 'open': modelValue }" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17L21 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 7L21 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:model-value'])
</script>

<style scoped lang="scss">
.burger-button.open {
  @apply text-text-dark;
}
.burger-icon > path {
  transition: all .3s;
}
.open > path:first-child {
  transform: rotate(-45deg) translate(-12px, 0px);
}
.open > path:last-child {
  transform: rotate(45deg) translate(5px, -7px);
}
</style>
