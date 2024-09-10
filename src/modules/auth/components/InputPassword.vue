<template>
    <el-input
        v-model="model"
        size="large"
        type="password"
        :placeholder="$t('password')"
        autocomplete="current-password"
        show-password
    />
</template>

<script setup lang="ts">
    const model = defineModel<string>();
</script>
