<template>
  <div class="box">
    <WaterfallVue :list="pexelsList" :column="5">
      <template v-slot="{ item, width }">
        <Item :data="item" :width="width"></Item>
      </template>
    </WaterfallVue>
    <div ref="loadingRef" class="loading">
      <el-icon v-show="loading"><Loading /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/user'
import WaterfallVue from './common/waterfall.vue'
import Item from './common/item.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

const query = {
  page: 1,
  size: 100
}
const pexelsList = ref([])
const loading = ref([])
const loadingRef = ref(null)
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    loading.value = true
    getList()
  }
})

const getList = async () => {
  console.log(pexelsList.value.length)

  const { data } = await getPexelsList(query)
  if (query.page == 1) {
    pexelsList.value = data.list
  } else {
    pexelsList.value.push(...data.list)
  }
  if (pexelsList.value.length > 0) {
    query.page += 1
  }
  console.log(pexelsList.value)
  loading.value = false
}
// getList()
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 124px);
  overflow: scroll;
}
.loading {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 30;
  font-weight: 800;
}
</style>
