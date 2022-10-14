import { createRouter, createWebHistory } from "vue-router";
import PageSkeleton from '../components/PageSkeleton.vue';
import WipBody from '../components/WipBody.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: PageSkeleton,
            children: [
                {
                    path: '',
                    component: WipBody
                },
                {
                    path: ':catchAll(.*)',
                    redirect: '/'
                }
            ]
        }
    ]
})