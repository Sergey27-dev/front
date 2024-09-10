<template>
    <span class="text-sublink">
        <slot />
    </span>
</template>

<style scoped lang="scss">
    .text-sublink {
        color: #455360;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        width: fit-content;
        @media (hover: hover) {
            &:hover:after {
                content: '';
                width: 100%;
                display: inline-block;
                left: 0;
                top: 100%;
                position: absolute;
                border-bottom: 1px solid #455360;
            }
        }

        :deep(*) {
            color: #455360;
            font-size: 12px;

            &:hover:after {
                content: '';
                border: none;
            }
        }
    }
</style>
