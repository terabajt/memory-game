import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default [
    {
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        ignores: ['dist', '.eslintrc.cjs'],
        settings: {
            react: {
                version: '18.2',
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            '@typescript-eslint': typescriptPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
            'react-refresh': reactRefreshPlugin,
        },
        rules: {
            'no-use-before-define': 'warn',
            '@typescript-eslint/no-use-before-define': ['error'],
            'react/jsx-filename-extension': [
                'warn',
                {
                    extensions: ['.tsx'],
                },
            ],
            'no-shadow': 'warn',
            '@typescript-eslint/no-shadow': ['warn'],
            '@typescript-eslint/explicit-function-return-type': ['off'],
            'max-len': [
                'warn',
                {
                    code: 100,
                },
            ],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': ['warn'],
            'import/prefer-default-export': 'off',
            'react/prop-types': 'warn',
            semi: ['warn', 'always'],
            '@typescript-eslint/space-before-function-paren': [0],
            '@typescript-eslint/triple-slash-reference': ['warn'],
            '@typescript-eslint/comma-dangle': ['off'],
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/consistent-type-definitions': ['off'],
            '@typescript-eslint/prefer-ts-expect-error': ['warn'],
            'no-console': ['warn'],
            indent: ['warn', 4], // Use core ESLint rule instead of @typescript-eslint
            'react/jsx-indent': ['warn', 4],
            'react/jsx-indent-props': ['warn', 4],
            'react/jsx-max-props-per-line': [
                'warn',
                {
                    maximum: 1,
                    when: 'multiline',
                },
            ],
            'react/jsx-first-prop-new-line': ['warn', 'multiline'],
            'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
            'react/jsx-closing-tag-location': ['warn'],
            '@typescript-eslint/no-empty-function': ['warn'],
            '@typescript-eslint/no-dynamic-delete': ['warn'],
            'multiline-ternary': ['off'],
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external', 'internal']],
                    pathGroups: [
                        {
                            pattern: '^react',
                            group: 'builtin',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
        },
    },
];
