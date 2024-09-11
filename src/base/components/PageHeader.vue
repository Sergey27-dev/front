<template>
    <el-header class="header">
        <span class="logo">Учебный проект</span>

        <el-button @click="router.push(login)">
            Авторизоваться
        </el-button>
    </el-header>
</template>

<script setup lang="ts">
    import {login} from "@src/modules/auth";
    import {useRouter} from "vue-router";

    const router = useRouter();
</script>

<style scoped lang="scss">
    .header {
        height: 60px;
        box-shadow: 0px 8px 8px 0px rgba(34, 60, 80, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo {
            font-weight: 500;
            font-size: 20px;
        }
    }
</style>
