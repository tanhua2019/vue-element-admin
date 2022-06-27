import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 初始化样式表
import '@/styles/index.scss'
import * as EleIcons from '@element-plus/icons-vue'
import installIcons from '@/icons'
import LazyLoad from '@/directives/modules/lazy';

const app = createApp(App)

installIcons(app)
for (const [key, component] of Object.entries(EleIcons)) {
  app.component(key, component)
}

// 导入路由鉴权
import './permission'
app.use(LazyLoad, {
  default: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f2421e0269d41299dad3ff4bd0dced9~tplv-k3u1fbpfcp-watermark.image?'
})
app.use(ElementPlus).use(store).use(router).mount('#app')
