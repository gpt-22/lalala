<template>
  <div class="index-page">
    <router-view v-if="!startLoading" />
  </div>
</template>

<script setup>
const { startLoading } = useVideo()
</script>
