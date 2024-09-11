<template>
    <div class="heading">
        <h1 class="page-title">
            Продукты
        </h1>

        <el-button @click="router.push(createProduct)">Добавить продукт</el-button>
    </div>


    <el-table
        v-if="products"
        :data="products"
        @row-click="handleRowClick"
    >
        <el-table-column
            label="ID"
            prop="id"
        />

        <el-table-column
            label="Название товара"
            prop="name"
        />

        <el-table-column
            label="Описание товара"
            prop="description"
        />

        <el-table-column
            label="Цена"
            prop="price"
        />
    </el-table>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useProductRepository } from '../repository';
    import { Product, ProductsList } from '../repository/types/Products.ts';
    import { ElNotification } from 'element-plus';
    import {createProduct, product} from '@src/modules/products';
    import { router } from '@src/lib/router';

    const products = ref<ProductsList>();

    const productRepository = useProductRepository();

    const handleRowClick = (row: Product) => {
        router.push({
            name: product.name,
            params: {
                id: row.id,
            },
        });
    };

    onMounted(async () => {
        productRepository
            .list()
            .then((response) => {
                products.value = response;
            })
            .catch(() => {
                ElNotification({
                    type: 'error',
                    title: 'Ошибка при получении товаров',
                });
            });
    });
</script>

<style scoped lang="scss">

</style>
