import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/views/Main.vue';

const routes = [
    {
        path: '/login',
        name: 'loginPage',
        component: () => import('@/views/login/loginPage.vue'),
        meta: {title: "登入"},
    },
    { 
        path: '/',
        name: 'Main',
        component: MainLayout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {title: "首頁"}
                    
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/user/index.vue'),
                meta: {title: "用戶管理"}
            },
            {
                path: 'mall',
                name: 'mall',
                component: () => import('@/views/mall/index.vue'),
                meta: {title: "商品管理"}
            },
            {
                path: 'page1',
                name: 'page1',
                component: () => import('@/views/other/pageOne.vue')
            },
            {
                path: 'page2',
                name: 'page2',
                component: () => import('@/views/other/pageTwo.vue')
            }
        ]
    }
];

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router;