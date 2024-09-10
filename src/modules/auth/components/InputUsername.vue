<template>
    <el-input
        v-model="model"
        size="large"
        type="text"
        :placeholder="$t('username')"
        autocomplete="username"
    />
</template>

<script setup lang="ts">
    const model = defineModel<string>();
</script>
