import { RouteRecordRaw } from 'vue-router';
import DashboardPage from './pages/DashboardPage.vue';

export const dashboard: RouteRecordRaw = {
    path: '/',
    component: DashboardPage,
    name: 'dashboard',
};

export const dashboardRoutes = <RouteRecordRaw[]>[dashboard];
