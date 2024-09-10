<template>
    <el-radio-group
        v-model="model"
        size="large"
    >
        <el-radio-button label="email">
            {{ $t('email') }}
        </el-radio-button>

        <el-radio-button label="phone">
            {{ $t('phone') }}
        </el-radio-button>
    </el-radio-group>
</template>

<script setup lang="ts">
    const model = defineModel<string>();
</script>

<style scoped lang="scss">
    .el-radio-group {
        width: 100%;
        border: 0.8px solid #4f4f4f;
        border-radius: 9px;
        background: #fff;
        padding: 2px;
        height: 44px;

        .el-radio-button {
            flex-grow: 1;
        }

        :deep(.el-radio-button__inner) {
            width: 100%;
            background: #fff;
            border-radius: 7px;
            border: none;
            color: #9a9a9a;
        }

        .is-active :deep(.el-radio-button__inner) {
            background: #f4f6fb;
            color: #2f2e36;
            box-shadow: none;
        }
    }
</style>
