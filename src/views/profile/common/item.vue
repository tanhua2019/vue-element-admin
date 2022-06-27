<template>
  <div>
    <img :style="imgStyle" :src="data.photo" />
    <div class="title">{{ data.title }}</div>
    <div class="content">
       <el-avatar :size="30" :src="data.avatar" />
       <div class="author">{{ data.author }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  width: {
    type: Number,
    default: 0
  }
})

const imgStyle = computed(() => {
  return {
    'object-fit': 'contain', //保持图片原有比例不缩放
    width: props.width + 'px'
  }
})
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
