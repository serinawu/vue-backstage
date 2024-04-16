import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './assets/less/index.less';
import store from '@/store/index.js';
import router from '@/router';
import axios from 'axios';
import '@/api/mock.js';
import App from './App.vue';

router.beforeEach((to, from, next) => {
    const token = store.state.user.token;
    if (!token && to.name !== 'loginPage') {
        // 用户未登录且目标路由不是登录页，则重定向到登录页
        next({ name: 'loginPage' });
        console.log(token);
    } else if (token && to.name === 'loginPage') {
        // 用户已登录且目标路由是登录页，则重定向到主页
        next({ name: 'home' });
        console.log(token);
    } else {
        // 其他情况，直接进入目标路由
        next();
        console.log(token);
    }
})

router.afterEach((to) => {
    document.title = to.meta.title || "通用後台管理"
})

store.commit('addMenu', router);

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');

app.config.globalProperties.$http = axios;

//這寫法也沒噴錯
//const Vue = createApp(App);
// Vue.use(ElementPlus);
// Vue.use( ElButton );
// Vue.use( router);
// Vue.mount('#app')
//app.component('ElButton',ElButton);
