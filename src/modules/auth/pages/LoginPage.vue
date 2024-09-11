<template>
    <div class="login-wrapper">
        <h1 class="title">
            Авторизация
        </h1>

        <p>Для работы с сайтом необходимо авторизоваться через GitHub</p>

        <a :href="getApiBaseUrl() + 'oauth2/authorization/github'">Авторизоваться</a>

        <el-button
            type="primary"
            @click="handleClickAuth"
        >
            Авторизоваться
        </el-button>
    </div>
</template>

<script setup lang="ts">
    import { getApiBaseUrl } from '@src/base/helpers/getApiBaseUrl.ts';
    import { useAuthRepository } from '@src/modules/auth/repository';
    import { HTTPError } from 'ky';

    const authRepository = useAuthRepository();

    const handleClickAuth = () => {
        authRepository.authByGithub()
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error instanceof HTTPError && error.response.status === 302) {
                    console.log(error.response.headers.location);
                }
            });
    };
</script>

<style scoped lang="scss">
    .forms-wrapper {
        gap: 24px;
    }

    .title {
        font-weight: 600;
        font-size: 32px;
        text-align: center;
    }

    .login-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>
