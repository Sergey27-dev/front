import { RouteRecordRaw } from 'vue-router';
import type { VueElement } from 'vue';
import { authRoutes, login as authLoginRoute } from '../modules/auth';
import { productsRoutes } from '../modules/products';

const AuthLayout = () =>
    import('./layouts/AuthLayout.vue').then((module) => module.default) as Promise<VueElement>;

const PageLayout = () =>
    import('./layouts/PageLayout.vue').then((module) => module.default) as Promise<VueElement>;

export const routes: RouteRecordRaw[] = [
    {
        path: '/products',
        children: productsRoutes,
        meta: {
            layoutComponent: PageLayout,
        },
    },

    {
        path: '/auth',
        children: authRoutes,
        redirect: authLoginRoute,
        meta: {
            layoutComponent: AuthLayout,
            hideForAuth: true,
        },
    },
];
