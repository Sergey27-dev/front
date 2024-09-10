<template>
    <el-row class="form-heading">
        <el-text
            :span="24"
            class="code-title"
        >
            {{ $t('module.auth.enter_code') }}
        </el-text>

        <el-text
            :span="24"
            class="code-description"
        >
            {{ $t('module.auth.enter_code_desc') }}
        </el-text>
    </el-row>

    <el-form
        :model="formData"
        @submit.prevent="onSubmit"
    >
        <input-code
            v-model="formData.code"
            :num-inputs="numInputs"
            @on-complete="completedForm = true"
            @on-incomplete="completedForm = false"
        />

        <el-alert
            v-if="alert"
            :title="alert"
            type="error"
            effect="dark"
            @close="closeAlertCode"
        />

        <button-submit :completed-form="completedForm">
            {{ $t('send') }}
        </button-submit>
    </el-form>

    <text-sublink @click="retryCode">
        {{ $t('module.auth.retry_code') }}
    </text-sublink>
</template>

<script setup lang="ts">
    import ButtonSubmit from './ButtonSubmit.vue';
    import { reactive, ref } from 'vue';
    import InputCode from './InputCode.vue';
    import { ValidateCodePayload } from '../repository/types/Code.ts';
    import TextSublink from '../components/TextSublink.vue';

    const numInputs = 4;

    defineProps<{
        alert: string;
    }>();

    const emit = defineEmits(['submit', 'closeAlertCode']);
    const formData = reactive<ValidateCodePayload>({
        code: '',
    });
    const completedForm = ref<boolean>(false);

    const onSubmit = () => {
        emit('submit', formData);
    };

    const closeAlertCode = () => {
        emit('closeAlertCode');
    };

    const retryCode = () => {
        console.log('test');
    };
</script>

<style scoped lang="scss">
    .el-form {
        row-gap: 30px;
    }

    .code-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 8px;
        line-height: 24px;
        color: #292731;
    }

    .code-description {
        color: #292731;
    }

    .form-heading {
        margin-bottom: 44px;
    }

    .el-form {
        width: 100%;
        margin-bottom: 20px;
    }

    :deep(.code-input) {
        & > div {
            flex-grow: 1;

            input {
                width: 100%;
                background: none;
                border-bottom: 2px solid #d9d9d9;
                outline: none;
                font-size: 50px;
                line-height: 60px;
                text-align: center;
                color: #000;
                -moz-appearance: textfield;

                &:focus-visible {
                    border-color: #000000;
                }

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }
        }
    }
</style>
