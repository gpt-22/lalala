<template>
  <nav class="slide-left" :class="{ open: modelValue }">
    <ul class="location-list">
      <li
        v-for="item in locations"
        :key="item.key"
        class="location-item"
        :class="{ active: item.key === activeKey }"
        @click="onClick(item.key)"
      >
        <nuxt-link
          :to="`/gallery?location=${item.key}&fromPage=${route.query?.fromPage || 'section-3'}`"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>

    <nuxt-link to="/" class="mt-[48px]">
      <logo />
    </nuxt-link>
  </nav>
</template>

<script setup>
/* TODO:
 * анимация элементов списка
 * */

import { locations } from '~/pages/gallery.data'

const props = defineProps(['modelValue', 'activeKey'])
const emits = defineEmits(['update:model-value', 'change-location'])

const route = useRoute()

const onClick = (itemKey) => {
  emits('update:model-value', false)
  emits('change-location', itemKey)
}
</script>

<style scoped lang="scss">
.slide-left {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 35em;
  z-index: 10000;

  padding: 12.5vh 48px 48px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  background-color: black;

  transform: translateX(-35em);
  transition: 0.5s transform ease-in-out;

  &.open {
    transform: translateX(0);
  }
}

.location-list {
  overflow-y: scroll;
  padding-bottom: 48px;
}

.location-item {
  margin-top: 20px;
  font-size: 1.5em; // 3em
  //text-transform: uppercase;
  font-weight: 700;
  //color: #b3a2c2;
  color: white;
  text-decoration: none;
  transition: color 0.15s linear;
  overflow: hidden;
  //white-space: nowrap;
  //text-overflow: ellipsis;
  //cursor: pointer;

  &:hover,
  &.active {
    color: #f9d0b8;
  }
}
</style>
