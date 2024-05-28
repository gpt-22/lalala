<template>
  <div class="index-page">
    <nuxt-page v-if="!(startView || preloader)" />
  </div>
</template>

<script setup>
const { preloader, startView } = useLoader()
</script>
