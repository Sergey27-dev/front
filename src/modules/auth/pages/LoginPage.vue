<template>
    <div class="login-wrapper">
        <h1 class="title">
            Авторизация
        </h1>

        <p>Для работы с сайтом необходимо авторизоваться через GitHub</p>
        
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
    import { getGithubLink } from "@src/modules/auth/helpers/getGithubLink.ts";
    import { onMounted } from "vue";
    import { useRoute } from "vue-router";
    import {useAuthRepository} from "@src/modules/auth/repository";

    const route = useRoute();
    const authRepository = useAuthRepository();

    const handleClickAuth = async () => {
        window.location.href = getGithubLink();
    };

    onMounted(async () => {
        if (route.query.code) {
            await authRepository.authByGithub(route.query.code);
        }
    })
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
