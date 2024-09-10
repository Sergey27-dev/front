<template>
    <el-text>Dashboard</el-text>

    <el-button
        type="danger"
        @click="onSingOut"
    >
        Sign out
    </el-button>
</template>

<script setup lang="ts">
    import { login as loginRoute, useAuthStore } from '../../auth';
    import { useRouter } from 'vue-router';

    const auth = useAuthStore();
    const router = useRouter();

    const onSingOut = async () => {
        await auth.logout();
        return router.push(loginRoute);
    };
</script>
