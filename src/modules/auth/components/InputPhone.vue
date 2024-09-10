<template>
    <el-input
        v-model="model"
        size="large"
        :type="'tel'"
        :placeholder="$t('phone_number')"
        autocomplete="tel"
        class="phone-input"
    />
</template>

<script setup lang="ts">
    const model = defineModel<string>();
</script>
