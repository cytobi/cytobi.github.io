import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../components/PageSkeleton.vue'),
            props: route => ({ path: route.fullPath }),
            children: [
                {
                    path: '',
                    component: () => import('../components/WipBody.vue')
                },
                {
                    path: 'morph',
                    component: () => import('../components/MorphingShapes.vue')
                },
                {
                    path: ':catchAll(.*)',
                    redirect: '/'
                }
            ]
        }
    ]
})