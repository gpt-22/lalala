<template>
  <div class="index-page">
    <slot v-if="!startLoading" />
  </div>
</template>

<script setup>
const { startLoading } = useVideo()
</script>
