<template>
  <div class="index-page">
    <nuxt-page v-if="!startLoading" />
  </div>
</template>

<script setup>
const { startLoading } = useVideo()
</script>
