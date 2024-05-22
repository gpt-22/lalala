<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup>
//
</script>

<style scoped lang="scss">
.btn {
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
