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
            }
        ]
    },
];

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router;