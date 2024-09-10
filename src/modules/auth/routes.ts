import { RouteRecordRaw } from 'vue-router';

const LoginPage = () => import('./pages/LoginPage.vue');

export const login: RouteRecordRaw = {
    path: 'login',
    component: LoginPage,
    name: 'login',
    meta: {
        isPublic: true,
    },
};

export const authRoutes = <RouteRecordRaw[]>[login];
