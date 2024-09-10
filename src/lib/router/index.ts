import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { routes } from '../../base/routes.ts';
import { VueElement } from 'vue';
import { useAuthStore } from '../../modules/auth';
import { login } from '../../modules/auth';

const DefaultLayout = () =>
    import('../../base/layouts/DefaultLayout.vue').then((module) => module.default) as Promise<VueElement>;

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (route: RouteLocationNormalized): Promise<void> => {
    switch (typeof route.meta.layoutComponent) {
        case 'function':
            route.meta.layoutComponentNormalized = await route.meta.layoutComponent();
            break;
        case 'object':
            break;
        default:
            route.meta.layoutComponentNormalized = await DefaultLayout();
    }
});

/**
 * Если (пользователь аутентифицирован) и (путь скрыт для аутентифицированных пользователей)
 * В таком случае перенаправляем на главную страницу
 */
router.beforeEach(async (to: RouteLocationNormalized): Promise<string | void> => {
    if (useAuthStore().isAuthenticated && to.meta.hideForAuth) {
        return '/';
    }
});

/**
 * Если (пользователь не аутентифицирован) и (путь не публичный)
 * В таком случае перенаправляем на страницу входа
 */
router.beforeEach(async (to: RouteLocationNormalized): Promise<RouteRecordRaw | void> => {
    if (!useAuthStore().isAuthenticated && !to.meta.isPublic) {
        return login;
    }
});
