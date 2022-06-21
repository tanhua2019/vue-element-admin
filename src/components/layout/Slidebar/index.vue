<template>
  <div class="">
    <h1>zhhaa</h1>
    <el-scrollbar>
      <el-menu
        :background-color="$store.getters.variables.menuBg"
        :text-color="$store.getters.variables.menuText"
        :active-text-color="$store.getters.variables.menuActiveText"
        :unique-opened="true"
        :default-active="activeMenu"
        router
      >
        <sidebar-item
          v-for="item in routes"
          :key="item.path"
          :route="item"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import sidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
console.log(JSON.stringify(routes.value))
</script>

<style lang="scss" scoped></style>
