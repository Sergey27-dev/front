<template>
    <v-otp-input
        v-model:value="model"
        class="code-input"
        :num-inputs="numInputs"
        separator=""
        input-type="number"
        @on-complete="onComplete"
        @on-change="onChange"
    />
</template>

<script setup lang="ts">
    import VOtpInput from 'vue3-otp-input';

    const model = defineModel<string>();
    const emit = defineEmits(['on-complete', 'on-change', 'on-incomplete']);
    const props = defineProps<{
        numInputs: number;
    }>();
    const onComplete = () => {
        emit('on-complete');
    };

    const onChange = (value: string) => {
        emit('on-change');
        if (value.length < props.numInputs) {
            emit('on-incomplete');
        }
    };
</script>

<style scoped lang="scss">
    .code-input {
        width: 100%;
        display: flex;
        gap: 13px;
        justify-content: space-between;
    }
</style>
