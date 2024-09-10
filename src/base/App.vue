<template>
    <system-layout>
        <router-view v-slot="{ Component, route }">
            <transition
                name="scale"
                mode="out-in"
            >
                <div :key="route.name?.toString()">
                    <component :is="Component" />
                </div>
            </transition>
        </router-view>
    </system-layout>
</template>

<script setup lang="ts">
    import SystemLayout from './layouts/SystemLayout.vue';
</script>

<!--suppress CssUnusedSymbol -->
<style scoped lang="scss">
    .scale-enter-active,
    .scale-leave-active {
        transition: all 0.3s ease;
    }

    .scale-enter-from,
    .scale-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }
</style>
