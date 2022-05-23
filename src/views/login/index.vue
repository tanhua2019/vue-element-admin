<template>
  <div class="login-container">
    <el-form class="login-form" :mode="form" :rules="rules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          v-model="form.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="form.password"
          placeholder="password"
          name="password"
          :type="pwdType"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="pwdType == 'password' ? 'eye' : 'eye-open'"
            @click="handlePwdType"
          />
        </span>
      </el-form-item>

      <el-button type="primary" :loading="loading" @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const checkPassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}

const form = ref({
  username: 'super-admin',
  password: '123456'
})

const rules = ref({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '用户名不能为空',
      validator: checkPassword
    }
  ]
})

const pwdType = ref('password')
const handlePwdType = () => {
  pwdType.value = pwdType.value === 'password' ? 'text' : 'password'
}

const store = useStore()
const loading = ref(false)
const router = useRouter()

const login = () => {
  loading.value = true
  store
    .dispatch('user/login', form.value)
    .then(() => {
      loading.value = false
      router.push('/')
    })
    .catch(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    :deep(.el-input__wrapper) {
      background: transparent;
      box-shadow: none;
      width: 100%;
      padding: 0;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-button {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>
