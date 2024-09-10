import { RouteRecordRaw } from 'vue-router';
import type { VueElement } from 'vue';
import { authRoutes, login as authLoginRoute } from '../modules/auth';
import { dashboardRoutes } from '../modules/dashboard';

const AuthLayout = () =>
    import('./layouts/AuthLayout.vue').then((module) => module.default) as Promise<VueElement>;

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        children: dashboardRoutes,
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
