<template>
  <div
    class="container"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <div
      class="waterfall-item"
      v-for="(item, index) in list"
      :key="index"
      :style="{
        left: item.style?.left + 'px',
        top: item.style?.top + 'px'
      }"
    >
      <slot :item="item" :width="itemWidth"></slot>
    </div>
  </div>
</template>

<script setup>
import { nextTick, watch } from 'vue'
import useLayout from './use-layout'
import useItemHeight from './use-item-height'
import useItemWidth from './use-item.width'

const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => {}
  },
  column: {
    type: Number,
    default: 2
  },
  colSpace: {
    type: Number,
    default: 20
  },
  rowSpace: {
    type: Number,
    default: 20
  }
})

const { itemWidth, containerLeft, containerTarget } = useItemWidth(props)
const { itemHeight, getItemHeight } = useItemHeight()
const { useColumnHeight, containerHeight, useItemLocation } = useLayout(
  props,
  itemHeight,
  itemWidth,
  containerLeft
)

watch(
  () => props.list,
  val => {
    // 重置数据源
    const resetColumnHeight = val.every(i => !i.style)
    if (resetColumnHeight) {
      useColumnHeight()
    }
    nextTick(() => {
      getItemHeight().then(() => {
        useItemLocation()
      })
    })
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .waterfall-item {
    position: absolute;
  }
}
</style>
