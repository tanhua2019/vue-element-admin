<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">
          {{ item.meta.title }}
        </span>
        <a class="redirect" v-else @click.prevent="handleClick(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

const router = useRouter()
const handleClick = item => {
  router.push(item.path)
}

const store = useStore()
const linkHoverColor = ref(store.getters.variables.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  line-height: 50px;
  float: left;
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
