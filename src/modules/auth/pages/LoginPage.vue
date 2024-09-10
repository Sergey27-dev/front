<template>
    <h1>Авторизация</h1>

    <el-row
        v-if="!auth.isCodeSent"
        class="flex-col forms-wrapper"
    >
        <form-login-email
            v-if="authType === 'email'"
            v-loading.fullscreen.lock="auth.isRequestLoading"
            :alert="alertEmail"
            @submit="onSubmitPassword"
            @close-alert-email="closeAlertEmail"
        />

        <form-login-phone
            v-else-if="authType === 'phone'"
            v-loading.fullscreen.lock="auth.isRequestLoading"
            :alert="alertPhone"
            @close-alert-phone="closeAlertPhone"
            @submit="onSubmitPhone"
        />
    </el-row>

    <el-row v-else>
        <form-code
            :alert="alertCode"
            @close-alert-code="closeAlertCode"
            @submit="onSubmitCode"
        />
    </el-row>
</template>

<script setup lang="ts">
    import { LoginPasswordPayload, LoginPhonePayload } from '../repository/types/Login.ts';
    import { useAuthStore } from '@src/modules/auth';
    import { ref } from 'vue';
    import FormLoginPhone from '../components/FormLoginPhone.vue';
    import FormLoginEmail from '../components/FormLoginEmail.vue';
    import { dashboard as dashboardRoute } from '@src/modules/dashboard';
    import { useRouter } from 'vue-router';
    import FormCode from '../components/FormCode.vue';
    import SelectForm from '../components/SelectForm.vue';
    import { ValidateCodePayload } from '../repository/types/Code.ts';
    import AuthorizationException from '../exceptions/AuthorizationException.ts';

    const auth = useAuthStore();
    const authType = ref('email');

    const alertEmail = ref<string>('');
    const alertPhone = ref<string>('');
    const alertCode = ref<string>('');

    const router = useRouter();

    const onSubmitPassword = async (formData: LoginPasswordPayload) => {
        auth.login(formData)
            .then(() => router.push(dashboardRoute))
            .catch((error: Error | AuthorizationException) => {
                if (error instanceof AuthorizationException) {
                    alertEmail.value = error.message;
                    return;
                }

                throw error;
            });
    };

    const onSubmitPhone = async (formData: LoginPhonePayload) => {
        auth.sendCode(formData).catch((error: Error | AuthorizationException) => {
            if (error instanceof AuthorizationException) {
                alertPhone.value = error.message;
                return;
            }

            throw error;
        });
    };

    const onSubmitCode = async (formData: ValidateCodePayload) => {
        auth.validateCode(formData)
            .then(() => router.push(dashboardRoute))
            .catch((error: Error | AuthorizationException) => {
                if (error instanceof AuthorizationException) {
                    alertCode.value = error.message;
                    return;
                }

                throw error;
            });
    };

    const closeAlertPhone = () => {
        alertPhone.value = '';
    };

    const closeAlertEmail = () => {
        alertEmail.value = '';
    };

    const closeAlertCode = () => {
        alertCode.value = '';
    };
</script>

<style scoped lang="scss">
    .forms-wrapper {
        gap: 24px;
    }

    .el-form {
        row-gap: 16px;
    }

    .logo {
        margin-bottom: 30px;
    }

    .forms-wrapper:deep(.el-input__wrapper) {
        border-radius: 9px;
        border: 0.8px solid #2c343c;
        box-shadow: unset;
        height: 44px;

        &.is-focus {
            background: #f4f6fb;
        }

        .el-input__inner {
            color: #2f2e36;

            &::placeholder {
                color: #7b8389;
            }
        }
    }

    .forms-wrapper:deep(.el-form-item__error) {
        font-size: 12px;
        color: #e30016;
        font-weight: 400;
    }

    .forms-wrapper:deep(.el-form-item.is-error .el-input__wrapper) {
        box-shadow: none;
        border-color: #e30016;
        background: #fdf0ed;

        .el-input__inner {
            &::placeholder {
                color: #e30016;
            }
        }
    }

    .forms-wrapper:deep(.el-form-item) {
        flex-grow: 1;
    }

    .forms-wrapper:deep(.form-inputs) {
        gap: 24px;
    }
</style>
