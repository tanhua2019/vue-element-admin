<template>
  <div class="box">
    <WaterfallVue :list="pexelsList" :column="5">
      <template v-slot="{ item, width }">
        <Item :data="item" :width="width"></Item>
      </template>
    </WaterfallVue>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/user'
import WaterfallVue from './common/waterfall.vue'
import Item from './common/item.vue'
import { ref } from 'vue'

const pexelsList = ref([])
const getList = async () => {
  const { data } = await getPexelsList()
  pexelsList.value = data.list
}
getList()
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 124px);
  overflow: scroll;
}
</style>
