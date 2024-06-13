<template>
  <div class="progress-container">
    <div class="progress" :class="{ play: play }">
      <div class="progress-track" />
      <div class="progress-bar" :style="{ width: `${value}%` }" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['value', 'play'])
</script>

<style scoped>
.progress-container {
  position: absolute;
  width: 100%;
}
.progress {
  position: relative;
  width: 100%;
  height: 4px;
  z-index: 2;
  background-color: #1d1d1d;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  &::before {
    left: -50%;
    background-color: #b19280;
  }
  &::after {
    right: -50%;
    background-color: #1d1d1d;
  }
}

.progress-track {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: #1d1d1d;
}

.progress-bar {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #b19280 0%, #fff 100%);
  transition: width 0.1s;
  z-index: 1;
  border-radius: 0 2px 2px 0;

  &::after {
    content: '';
    top: -2px;
    right: 0;
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
  }
}
</style>
