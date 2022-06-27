<template>
  <div>
    <img
      v-lazys
      style="width: 100%"
      :style="{
        height: (width / data.photoWidth) * data.photoHeight + 'px',
        'background-color': randomRGB()
      }"
      :src="data.photo"
    />
  </div>
</template>

<script setup>
import { randomRGB } from './utils'
defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  width: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 13px;
  text-align: center;
}
.content {
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
