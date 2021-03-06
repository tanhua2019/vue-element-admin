import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 初始化样式表
import '@/styles/index.scss'
import installIcons from '@/icons'

const app = createApp(App)

installIcons(app)

app.use(ElementPlus).use(store).use(router).mount('#app')
