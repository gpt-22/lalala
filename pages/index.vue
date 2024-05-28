<template>
  <div class="index-page">
    <nuxt-page v-if="!(startLoading || preloader)" />
  </div>
</template>

<script setup>
const { preloader, startLoading } = useLoader()
</script>
