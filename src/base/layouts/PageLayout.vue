<template>
    <DefaultLayout>
        <PageHeader />

        <el-container>
            <el-main>
                <slot />
            </el-main>
        </el-container>
    </DefaultLayout>
</template>

<script setup lang="ts">
    import DefaultLayout from '@src/base/layouts/DefaultLayout.vue';
    import PageHeader from '@src/base/components/PageHeader.vue';
</script>

<style scoped lang="scss">

</style>
