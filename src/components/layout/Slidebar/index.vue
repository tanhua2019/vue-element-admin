<template>
  <div class="">
    <div class="logo-container">
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        Vue3-elementPlus-admin
      </h1>
      <el-avatar
        v-else
        :size="logoHeight"
        shape="square"
        src="https://img1.baidu.com/it/u=2789679700,1324273936&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      />
    </div>
    <el-scrollbar>
      <el-menu
        :background-color="$store.getters.variables.menuBg"
        :text-color="$store.getters.variables.menuText"
        :active-text-color="$store.getters.variables.menuActiveText"
        :unique-opened="true"
        :default-active="activeMenu"
        :collapse="!$store.getters.sidebarOpened"
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
const logoHeight = 44

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

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
