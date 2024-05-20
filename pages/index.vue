<template>
  <div class="parent">
    <router-view v-if="!startLoading" />
  </div>
</template>

<script setup>
const { startLoading } = useVideoFrame()
</script>


<style lang="scss">
.parent {
  //
}
</style>
