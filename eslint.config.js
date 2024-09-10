import js from '@eslint/js';
import typescriptESLintParser from '@typescript-eslint/parser';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eslintrc = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

// noinspection JSUnusedGlobalSymbols
export default [
    // JavaScript
    {
        rules: js.configs.recommended.rules,

        ignores: ['dist/**/*', 'node_modules/**/*'],
    },

    // TypeScript
    ...eslintrc.extends('plugin:@typescript-eslint/recommended').map((config) => ({
        ...config,
        ignores: ['dist/**/*', 'node_modules/**/*'],
    })),

    // Vue 3
    ...eslintrc.extends('plugin:vue/vue3-recommended').map((config) => ({
        ...config,
        files: ['**/*.vue'],
        ignores: ['dist/**/*', 'node_modules/**/*'],
        languageOptions: {
            ...config.languageOptions,
            parserOptions: {
                ...config.languageOptions?.parserOptions,
                parser: typescriptESLintParser,
            },
        },
        rules: {
            ...config.rules,
            'vue/html-indent': [
                'error',
                4,
                {
                    baseIndent: 1,
                },
            ],
            'vue/script-indent': [
                'error',
                4,
                {
                    baseIndent: 1,
                },
            ],
            'vue/padding-line-between-blocks': ['error', 'always'],
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: {
                        max: 1,
                    },
                    multiline: {
                        max: 1,
                    },
                },
            ],
            'vue/padding-line-between-tags': ['error', [{ blankLine: 'always', prev: '*', next: '*' }]],
        },
    })),

    // Vue scoped css
    ...eslintrc.extends('plugin:vue-scoped-css/vue3-recommended').map((config) => ({
        ...config,
        files: ['**/*.vue'],
        ignores: ['dist/**/*', 'node_modules/**/*'],
        rules: {
            'vue-scoped-css/no-unused-selector': ['off'],
        },
    })),

    // Project scripts
    {
        files: ['**/*.ts', '**/*.js', '**/*.vue'],
        ignores: ['dist/**/*', 'node_modules/**/*'],
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': ['error', 'always'],
            'linebreak-style': ['error', 'unix'],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            message: 'Запрещено импортировать файлы из модуля напрямую, используй index.ts',
                            group: ['**/modules/**', '!**/modules/*', '!**/modules/index.ts'],
                        },
                    ],
                },
            ],
        },
    },
];
