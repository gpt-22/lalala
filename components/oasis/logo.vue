<template>
  <div class="logo">
    <span class="logo-left">archi</span>
    <span class="logo-right">grade</span>
  </div>
</template>

<script setup>
// const props = defineProps(['color'])
</script>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 40px;
  color: #ffffffcc;
  transition: 0.2s color ease-in-out;

  &:hover {
    color: #ffffffe6;
  }
  &:active {
    color: #f9d0b8cc;
  }
}

.logo-left {
  margin-top: 2px;
  letter-spacing: 2.4px;
  font-weight: 600;
  font-size: 20px;
  font-family: MontserratSemiBold;
}
.logo-right {
  margin-left: 2px;
  letter-spacing: 0.75px;
  font-size: 25px;
  font-weight: 800;
  font-family: MontserratExtraBold;
}
</style>
