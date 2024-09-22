<template>
  <div class="gallery">
    <gallery-header />
    <gallery-slider />
    <gallery-footer />
  </div>
</template>

<script setup>
import { locations } from '~/pages/gallery.data'

setPageLayout('oasis')

const route = useRoute()
const { setLocation } = useGallery()
setLocation(route.query.location || locations[0].key)
</script>

<style scoped lang="scss">
.gallery {
  position: relative;
  z-index: 1;
  background-color: black;
}
</style>
