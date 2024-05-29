<template>
  <div class="logo">
    <span class="logo-left" :style="{ color }">archi</span>
    <span class="logo-right">grade</span>
  </div>
</template>

<script setup>
const props = defineProps(['color'])
</script>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 40px;
}

.logo-left {
  margin-top: 2px;
  color: #ffffffcc;
  letter-spacing: 2.4px;
  font-weight: 600;
  font-size: 20px;
  font-family: MontserratSemiBold;
}
.logo-right {
  margin-left: 2px;
  color: #ffffffcc;
  letter-spacing: 0.75px;
  font-size: 25px;
  font-weight: 800;
  font-family: MontserratExtraBold;
}
</style>
