<template>
    <transition
        name="scale"
        mode="out-in"
    >
        <component :is="route.meta.layoutComponentNormalized">
            <slot />
        </component>
    </transition>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>
