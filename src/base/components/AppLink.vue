<template>
    <router-link
        v-slot="{ isActive, href, navigate }"
        v-bind="$props"
        :to="props.to"
        custom
    >
        <el-link
            v-bind="$attrs"
            :href="href"
            :class="isActive"
            @click="navigate"
        >
            <slot />
        </el-link>
    </router-link>
</template>

<script setup lang="ts">
    import { RouteLocationRaw, RouterLink } from 'vue-router';

    const props = defineProps<{
        to: RouteLocationRaw;
    }>();
</script>
