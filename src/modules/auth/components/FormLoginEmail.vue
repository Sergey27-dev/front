<template>
    <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        @submit.prevent="onSubmit(formRef)"
    >
        <el-row class="form-inputs">
            <el-form-item prop="username">
                <input-username v-model="formData.username" />
            </el-form-item>

            <el-form-item prop="password">
                <input-password v-model="formData.password" />
            </el-form-item>

            <el-alert
                v-if="alert"
                :title="alert"
                type="error"
                effect="dark"
                @close="closeAlertEmail"
            />
        </el-row>

        <text-sublink>
            <app-link
                :to="forgotPassword"
                type="primary"
                class="forgot-password"
            >
                {{ $t('module.auth.forgotten_password') }}
            </app-link>
        </text-sublink>

        <el-row class="mt-3.5">
            <button-submit :completed-form="validForm">
                {{ $t('enter') }}
            </button-submit>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
    import { forgotPassword } from '../routes.ts';
    import { reactive, ref, watch } from 'vue';
    import InputUsername from './InputUsername.vue';
    import InputPassword from './InputPassword.vue';
    import AppLink from '../../../base/components/AppLink.vue';
    import ButtonSubmit from './ButtonSubmit.vue';
    import { FormInstance, FormRules } from 'element-plus';
    import { LoginPasswordPayload } from '../repository/types/Login.ts';
    import TextSublink from '../components/TextSublink.vue';
    import { $t } from '@src/lib/i18n';

    defineProps<{
        alert: string;
    }>();

    const formData = reactive<LoginPasswordPayload>({
        username: '',
        password: '',
    });

    const formRef = ref<FormInstance>();
    const validForm = ref<boolean>(false);
    const emit = defineEmits(['submit', 'closeAlertEmail']);

    const usernameValidator = (_rule: object, value: string, callback: (error?: Error) => void) => {
        if (value === '') {
            callback(
                new Error($t('module.auth.validation.required', { field: $t('username').toLowerCase() })),
            );
        }

        if (!value.match(/^[\wА-я]+$/u)) {
            callback(new Error($t('module.auth.validation.type', { field: $t('username').toLowerCase() })));
        }

        callback();
    };

    const rules = reactive<FormRules<LoginPasswordPayload>>({
        username: [
            {
                validator: usernameValidator,
                trigger: 'change',
            },
        ],

        password: [
            {
                required: true,
                message: $t('module.auth.validation.required', { field: $t('password').toLowerCase() }),
                trigger: 'change',
            },
        ],
    });

    watch(formData, async (newData: LoginPasswordPayload) => {
        let isFilled: boolean = true;

        Object.entries(newData).forEach((item) => {
            if (item[1] === '') {
                isFilled = false;
            }
        });

        validForm.value = isFilled;
    });

    const onSubmit = async (formRef: FormInstance | undefined): Promise<void> => {
        const isValid = await formRef?.validate().catch(() => false);

        if (!isValid) {
            validForm.value = false;
            return;
        }

        emit('submit', formData);
    };

    const closeAlertEmail = async () => {
        emit('closeAlertEmail');
    };
</script>
