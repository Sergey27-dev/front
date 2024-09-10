<template>
    <el-button
        size="large"
        type="primary"
        native-type="submit"
        class="w-full"
        plain
        :disabled="!completedForm"
    >
        <slot />
    </el-button>
</template>

<script setup lang="ts">
    defineProps<{
        completedForm: boolean;
    }>();
</script>

<style scoped lang="scss">
    .el-button {
        background: #4676fb;
        border-radius: 8px;
        height: 44px;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        border: none;
        transition: background-color 0.15s;
        @media (hover: hover) {
            &:hover {
                background: linear-gradient(
                    148.96deg,
                    rgb(38, 37, 37) 2.985%,
                    rgb(114, 114, 114) 138.952%,
                    rgb(109, 109, 109) 138.952%
                );
            }
        }

        &:disabled {
            background: #f4f6fb;
            color: #9a9a9a;
            border: none;
            @media (hover: hover) {
                &:hover {
                    background: #f4f6fb;
                    color: #9a9a9a;
                }
            }
        }
    }
</style>
