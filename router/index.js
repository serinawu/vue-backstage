import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/Main.vue';

const routes = [
    { 
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/User/index.vue')
            },
            {
                path: 'mall',
                name: 'mall',
                component: () => import('@/views/mall/index.vue')
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
    },
];

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router;