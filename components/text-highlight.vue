<template>
  <nuxt-link :to="to" class="highlight" :style="{ top, left }">
    <span class="circle" />
    <span class="highlight-text">
      <slot />
    </span>
  </nuxt-link>
</template>

<script setup>
const props = defineProps(['top', 'left', 'to'])
</script>

<style scoped lang="scss">
$color: white;

.highlight {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid $color;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: ' ';
    display: block;
    width: 4px;
    height: 4px;
    background-color: $color;
    border-radius: 50%;
  }

  &:hover .highlight-text::before {
    width: 20px;
  }
  &:hover .highlight-text::after {
    width: 100%;
  }
  &:hover .highlight-text {
    opacity: 1 !important;
  }

  //position: absolute;
  font-size: 10px;
  text-transform: uppercase;
  color: $color;
  transition: letter-spacing .2s;

  &:hover {
    //width: 20px;
    //height: 20px;
    //letter-spacing: 1px;
    //font-weight: 500;
    //font-size: 12px;
  }
}

.highlight-text {
  position: absolute;
  top: -32px;
  left: 35px;
  transition: all 0.3s;
  white-space: nowrap;
  opacity: 0;

  &::before {
    content: ' ';
    position: absolute;
    bottom: -7px;
    left: -16.5px;
    display: block;
    width: 20px;
    height: 1px;
    background-color: $color;
    transform: rotate(-45deg);
    border-radius: 100px;
    transition: width 0.3s;
  }

  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 1px;
    background-color: $color;
    border-radius: 100px;
    transition: width 0.3s;
  }

  &::before,
  &::after,
  .highlight-text {
    //opacity: 0;
  }
}

</style>
