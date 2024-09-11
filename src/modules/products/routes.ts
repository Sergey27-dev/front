import { RouteRecordRaw } from 'vue-router';
import ProductPage from './pages/ProductPage.vue';
import ProductsPage from './pages/ProductsPage.vue';

export const product: RouteRecordRaw = {
    path: '/products/:id',
    component: ProductPage,
    name: 'products.show',
};

export const createProduct: RouteRecordRaw = {
    path: '/products/create',
    component: ProductPage,
    name: 'products.create',
};

export const products: RouteRecordRaw = {
    path: '/products',
    component: ProductsPage,
    name: 'products',
};

export const productsRoutes = <RouteRecordRaw[]>[products, product, createProduct];
