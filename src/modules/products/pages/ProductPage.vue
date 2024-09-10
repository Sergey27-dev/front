<template>
    <h1 class="page-title">
        test
    </h1>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useProductRepository } from '../repository';
    import { useRoute, useRouter } from 'vue-router';
    import { HTTPError } from 'ky';
    import { ElNotification } from 'element-plus';
    import { login } from '@src/modules/auth';

    const productRepository = useProductRepository();
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
        if (route.params.id) {
            productRepository.show(Number(route.params.id))
                .then(response => {

                })
                .catch((error: Error | HTTPError) => {
                    if (error instanceof HTTPError && error.response.status === 401) {
                        ElNotification({
                            type: 'warning',
                            title: 'Необходима авторизация',
                        });

                        router.push(login);
                    }
                });
        }
    });
</script>

<style scoped lang="scss">

</style>
