<template>
  <progress class="progress" max="100" :value="value" :class="{ play: play }" />
</template>

<script setup>
const props = defineProps(['value', 'play'])
</script>

<style scoped>
.progress {
  position: absolute;
  width: 100%;
  height: 4px;
  z-index: 2;

  &::-webkit-progress-bar {
    background-color: #1d1d1d;
  }
  &::-webkit-progress-value {
    background: linear-gradient(90deg, #f9d0b8 0%, #fff 100%);
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  &::before {
    left: -50%;
    background-color: #f9d0b8;
  }
  &::after {
    right: -50%;
    background-color: #1d1d1d;
  }

  animation-play-state: paused;

  &.play {
    animation-play-state: running;
  }
}
</style>
