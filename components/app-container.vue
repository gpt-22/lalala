<template>
  <div class="app-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 32px;
}

@media (max-width: 640px) {
  .app-container {
    padding: 0 16px;
  }
}
</style>
