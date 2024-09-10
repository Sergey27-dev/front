<template>
    <el-form
        ref="formRef"
        :model="formData"
        @submit.prevent="onSubmit"
    >
        <el-form-item prop="phone">
            <input-phone v-model="formData.phone" />
        </el-form-item>

        <el-alert
            v-if="alert"
            :title="alert"
            type="error"
            effect="dark"
            @close="closeAlertPhone"
        />

        <el-row>
            <button-submit :completed-form="completedForm">
                {{ $t('enter') }}
            </button-submit>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
    import { reactive, ref, watch } from 'vue';
    import { FormInstance } from 'element-plus';
    import InputPhone from './InputPhone.vue';
    import ButtonSubmit from './ButtonSubmit.vue';
    import { LoginPhonePayload } from '../repository/types/Login.ts';

    const formData = reactive<LoginPhonePayload>({
        phone: '',
    });

    const formRef = ref<FormInstance>();
    const completedForm = ref<boolean>(false);

    const emit = defineEmits(['submit', 'closeAlertPhone']);
    defineProps<{
        alert: string;
    }>();

    watch(
        () => formData.phone,
        (newValue: string) => {
            if (newValue !== '') {
                completedForm.value = true;
            }
        },
    );

    const onSubmit = () => {
        emit('submit', formData);
    };

    const closeAlertPhone = () => {
        emit('closeAlertPhone');
    };
</script>
