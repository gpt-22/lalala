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
  color: #b19280cc;
  font-weight: 600;
  font-size: 25px;
  margin-top: 2px;
  font-family: MontserratSemiBold;

  //letter-spacing: 0.12;
}
.logo-right {
  margin-left: 2px;
  color: #ffffffcc;
  font-size: 35px;
  font-weight: 800;
  font-family: MontserratExtraBold;
}
</style>
