<template>
  <div class="">
    <h1>qq</h1>
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
import { filterRouters, menuList } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return menuList(filterRoutes)
})

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
