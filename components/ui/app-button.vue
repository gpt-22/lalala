<template>
  <button
    v-if="!to"
    class="app-btn"
    :class="{ [theme]: theme, [mouseClass]: mouseClass, [size]: size }"
    v-bind="$attrs"
    @mouseenter="mouseClass = 'enter'"
    @mouseleave="mouseClass = 'leave'"
  >
    <span class="app-btn-text">
      <slot />
    </span>
  </button>

  <nuxt-link v-if="to" :to="to" v-bind="$attrs" class="flex">
    <button
      class="app-btn"
      :class="{ [theme]: theme, [mouseClass]: mouseClass, [size]: size }"
      v-bind="$attrs"
      @mouseenter="mouseClass = 'enter'"
      @mouseleave="mouseClass = 'leave'"
    >
      <span class="app-btn-text">
        <slot />
      </span>
    </button>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  to?: string
  theme?: string
  size?: string
}
const props = withDefaults(defineProps<Props>(), { theme: 'light', size: 'm' })

const mouseClass = ref('leave')
</script>

<style lang="scss">
.app-btn {
  position: relative;
  overflow: hidden;
  padding: 4px 24px;
  min-width: 120px;
  min-height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  color: #262626;
  transition: all 0.2s;

  white-space: nowrap;
  text-transform: uppercase;

  &.s {
    min-width: 100px;
    min-height: 30px;
    font-size: 12px;
    font-weight: 400;
  }
  &.m {
    min-width: 120px;
    min-height: 40px;
    font-size: 14px;
    font-weight: 500;
  }
  &.l {
    min-width: 140px;
    min-height: 50px;
    font-size: 16px;
    font-weight: 500;
  }

  &.xl {
    min-width: 160px;
    min-height: 60px;
    font-size: 20px;
    font-weight: 500;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 0;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
  }

  &::after {
    @apply bg-dark;
  }

  &.dark {
    background-color: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      @apply text-dark;
    }
    &:hover::before {
      transform: translateX(0%);
    }
    &:not(:hover)::before {
      animation: 0.3s slide-right ease-in-out;
    }
  }

  &.light {
    background-color: white;
    color: #262626;
    //border: 2px solid #262626;

    &:hover {
      @apply text-white;
    }
    &:hover::after {
      transform: translateX(0%);
    }
    &:not(:hover)::after {
      animation: 0.3s slide-right ease-in-out;
    }
  }
}

@keyframes slide-right {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

.app-btn-text {
  position: relative;
  z-index: 1;
}
</style>
