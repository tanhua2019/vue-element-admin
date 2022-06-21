<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <svg-icon :icon="route.meta.icon"></svg-icon>
      <span>{{ route.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <svg-icon :icon="route.meta.icon"></svg-icon>
    <span>{{ route.meta.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>