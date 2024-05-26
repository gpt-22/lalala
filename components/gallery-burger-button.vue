<template>
  <button
    class="burger-button"
    :class="{ open: modelValue }"
    @click="$emit('update:model-value', !modelValue)"
  >
    <svg
      class="burger-icon"
      :class="{ open: modelValue }"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 24L32 24" stroke="currentColor" stroke-width="3" />
      <path d="M0 16L32 16" stroke="currentColor" stroke-width="3" />
      <path d="M0  8L32 8" stroke="currentColor" stroke-width="3" />

      <!--      <path d="M3 17L30 17" stroke="currentColor" stroke-width="3" stroke-linecap="round" />-->
      <!--      <path d="M3 7L30 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" />-->
    </svg>
  </button>
  <!--        <button>-->
  <!--          &lt;!&ndash;        class="burger-button"&ndash;&gt;-->
  <!--          &lt;!&ndash;        :class="{ open: modelValue }"&ndash;&gt;-->
  <!--          &lt;!&ndash;        @click="$emit('update:model-value', !modelValue)"&ndash;&gt;-->

  <!--          <svg-->
  <!--            class="burger-icon"-->
  <!--            width="32"-->
  <!--            height="32"-->
  <!--            viewBox="0 0 32 32"-->
  <!--            fill="none"-->
  <!--            xmlns="http://www.w3.org/2000/svg"-->
  <!--          >-->
  <!--            <path d="M3 24L32 24" stroke="currentColor" stroke-width="3" stroke-linecap="round" />-->
  <!--            <path d="M3 16L32 16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />-->
  <!--            <path d="M3 8L32 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" />-->
  <!--          </svg>-->
  <!--        </button>-->
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:model-value'])
</script>

<style scoped lang="scss">
.burger-button {
  z-index: 10001;
  transition: transform 0.4s ease;

  &:not(.open):hover {
    path:nth-child(1),
    path:nth-child(3) {
      transform: scaleX(0.7) translateX(22%);
    }
  }
}
svg {
  //border: 1px solid red;
}
.burger-button,
.burger-button > svg {
  height: 32px;
  width: 32px;
}
.burger-button.open {
  //@apply text-text-dark;
}
.burger-icon > path {
  transition: transform 0.4s cubic-bezier(0.55, 0, 0.1, 1) 0.1s;
}
.open > path:nth-child(1) {
  transform: rotate(-45deg) translate(-16px, -1.5px);
}
.open > path:nth-child(2) {
  transform: scaleX(0) translateX(-50%);
}
.open > path:nth-child(3) {
  transform: rotate(45deg) translate(6.5px, -8px);
}

.open:hover {
  transform: scale(0.95, 0.95);
}
</style>
