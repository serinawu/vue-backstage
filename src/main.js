import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import { ElButton } from  'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './assets/less/index.less';
import router from '../router';
import store from './store/index.js'
import axios from 'axios';
import '../src/api/mock.js';
import App from './App.vue';

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
