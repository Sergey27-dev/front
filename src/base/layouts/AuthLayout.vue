<template>
    <el-container class="min-h-dvh">
        <el-main class="max-w-[400px] m-auto">
            <el-card shadow="never">
                <slot />
            </el-card>
        </el-main>
    </el-container>
</template>

<style scoped lang="scss">
    .el-container {
        background-image: url('@src/modules/auth/assets/images/background_auth.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .el-card {
        background: none;
    }
    :deep(.el-card__body) {
        background: #fff;
        padding: 30px 20px;
        border-radius: 12px;
        box-shadow:
            0 1px 1px 0 rgba(101, 115, 118, 0.1),
            0 3px 3px 0 rgba(101, 115, 118, 0.09),
            0 6px 3px 0 rgba(101, 115, 118, 0.05),
            0 10px 4px 0 rgba(101, 115, 118, 0.01),
            0 16px 4px 0 rgba(101, 115, 118, 0);
    }
</style>
