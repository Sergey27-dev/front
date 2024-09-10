import { RouteRecordRaw } from 'vue-router';

const LoginPage = () => import('./pages/LoginPage.vue');
const ForgotPasswordPage = () => import('./pages/ForgotPasswordPage.vue');

export const login: RouteRecordRaw = {
    path: 'login',
    component: LoginPage,
    name: 'login',
    meta: {
        isPublic: true,
    },
};

export const forgotPassword: RouteRecordRaw = {
    path: 'password/forgot',
    component: ForgotPasswordPage,
    name: 'forgot-password',
    meta: {
        isPublic: true,
    },
};

export const authRoutes = <RouteRecordRaw[]>[login, forgotPassword];
