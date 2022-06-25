<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const getTitle = param => {
  if (param?.meta?.title) {
    return param.meta.title
  } else {
    const pathArr = route.path.split('/')
    return pathArr[pathArr.length - 1]
  }
}

watch(
  route,
  to => {
    if (!isTags(to.path)) return
    store.commit('tags/addTagsViewList', { ...to, title: getTitle(to) })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
