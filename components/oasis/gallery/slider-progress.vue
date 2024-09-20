<template>
  <div class="progress-container">
    <div class="before" />
    <div class="progress" :class="{ play: play }">
      <div class="progress-track" />
      <div class="progress-bar" :style="{ width: `${value}%` }" />
    </div>
    <div class="after" />
  </div>
</template>

<script setup>
const props = defineProps(['value', 'play'])
</script>

<style scoped lang="scss">
.progress-container {
  position: absolute;
  width: 100%;
  display: flex;
}
.before,
.after {
  width: 48px;
  height: 4px;
}
.before {
  background-color: #b19280;
}
.after {
  background-color: #1d1d1d;
}
.progress {
  flex-grow: 1;
  position: relative;
  height: 4px;
  z-index: 2;
  background-color: #1d1d1d;
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
    right: -4px;
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
  }
}
</style>
