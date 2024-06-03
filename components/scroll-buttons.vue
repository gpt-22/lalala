<template>
  <div class="container">
    <button :disabled="!up" class="scroll-btn" @click="$emit('up')">
      <icon-arrow :top="true" />
    </button>
    <button :disabled="!down" class="scroll-btn" @click="$emit('down')">
      <icon-arrow :bottom="true" />
    </button>
  </div>
</template>

<script setup>
import IconArrow from '~/components/icons/icon-arrow.vue'

const props = defineProps(['up', 'down'])
</script>

<style scoped lang="scss">
.container {
  @apply flex flex-col gap-1;
}

.scroll-btn {
  background-color: #ffffff40;
  padding: 8px;
  border-radius: 50%;
  color: white;
  z-index: 100000;

  &:disabled {
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
