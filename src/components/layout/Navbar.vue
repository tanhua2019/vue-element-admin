<template>
  <div class="navbar">
    <Hamburger class="hamburger-container"></Hamburger>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            src="https://resource-test.yixueniuniu.com/msUserFile/16472489368802e37a893.jpg"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item> 课程主页 </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Hamburger from '@/components/hamburger'
import { useStore } from 'vuex'

const store = useStore()
const logout = () => {
  store.commit('user/loginOut')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      margin-top: 5px;
    }
  }

  .hamburger-container {
    height: 50px;
    line-height: 50px;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
