<template>
  <button v-if="!to" class="app-btn" v-bind="$attrs">
    <slot />
  </button>

  <nuxt-link v-if="to" :to="to" v-bind="$attrs" class="flex">
    <button class="app-btn">
      <slot />
    </button>
  </nuxt-link>
</template>

<script setup>
const props = defineProps(['to'])
</script>

<style lang="scss">
.app-btn {
  min-width: 120px;
  min-height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  color: #262626;
  transition: all 0.2s;

  &:hover {
    background-color: white;
    color: #262626;
  }
}
</style>
