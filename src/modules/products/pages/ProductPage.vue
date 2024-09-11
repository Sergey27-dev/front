<template>
    <div class="heading">
        <h1 class="page-title">
            {{ product.id ? 'Редактирование продукта' : 'Создание продукта' }}
        </h1>
    </div>

    <el-form
        v-model="product"
    >
        <el-form-item label-width="200px" label="ID продукта" v-if="product.id">
            <el-input disabled :model-value="product.id" />
        </el-form-item>

        <el-form-item label-width="200px" label="Название продукта">
            <el-input v-model="product.name" placeholder="Название продукта"/>
        </el-form-item>

        <el-form-item label-width="200px" label="Описание продукта">
            <el-input placeholder="Описание продукта" type="textarea" v-model="product.description" />
        </el-form-item>

        <el-form-item label-width="200px" label="Цена продукта">
            <el-input v-model="product.price" />
        </el-form-item>

        <el-form-item>
            <el-button type="success" @click="handleSubmit">{{ product.id ? 'Обновить' : 'Создать' }}</el-button>

            <el-button v-if="product.id" type="danger" @click="handleDelete">Удалить</el-button>

            <el-button @click="router.push('/products')" type="primary">Назад</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useProductRepository } from '../repository';
    import { useRoute, useRouter } from 'vue-router';
    import { HTTPError } from 'ky';
    import { ElNotification } from 'element-plus';
    import { login } from '@src/modules/auth';
    import { Product } from "@src/modules/products/repository/types/Products.ts";
    import { ref } from 'vue';
    import { products, product as productRoute } from "@src/modules/products";

    const productRepository = useProductRepository();
    const route = useRoute();
    const router = useRouter();

    const product = ref<Product>({
        name: '',
        price: 0,
        description: '',
    });

    const handleSubmit = async () => {
        if (!product.value.id) {
            try {
                const createdProduct = await productRepository.create(product.value);

                ElNotification({
                    type: 'success',
                    title: 'Продукт успешно создан'
                })

                await router.push({
                    name: productRoute.name,
                    params: {
                        id: createdProduct.id,
                    }
                });
            } catch (error) {
                ElNotification({
                    type: 'error',
                    title: 'Произошла ошибка во время создания продукта'
                })
            }
        } else {
            try {
                const createdProduct = await productRepository.update(product.value);

                product.value = {...createdProduct};

                ElNotification({
                    type: 'success',
                    title: 'Продукт успешно обновлен'
                })
            } catch (error) {
                ElNotification({
                    type: 'error',
                    title: 'Произошла ошибка во время обновления продукта'
                })
            }
        }
    }

    const handleDelete = async () => {
        if (!product.value.id) {
            return;
        }

        productRepository.delete(product.value.id)
            .then(() => {
                ElNotification({
                    type: 'success',
                    title: 'Продукт успешно удален'
                })

                router.push(products);
            })
            .catch(() => {
                ElNotification({
                    type: 'error',
                    title: 'Произошла ошибка во время удаления продукта'
                })
            });
    }

    onMounted(async () => {
        if (route.params.id) {
            productRepository.show(Number(route.params.id))
                .then(response => {
                    product.value = { ...response };
                })
                .catch((error: Error | HTTPError) => {
                    if (error instanceof HTTPError && error.response.status === 401) {
                        ElNotification({
                            type: 'warning',
                            title: 'Необходима авторизация',
                        });

                        router.push(login);

                        return;
                    }

                    if (error instanceof HTTPError && error.response.status === 404) {
                        ElNotification({
                            type: 'warning',
                            title: 'Продукт не найден',
                        });

                        router.push(products);
                    }
                });
        }
    });
</script>

<style scoped lang="scss">

</style>
