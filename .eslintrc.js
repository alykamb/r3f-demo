/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
    acc[`jsx-a11y/${rule}`] = 'off'
    return acc
}, {})

module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['react', 'import', '@typescript-eslint', 'sort-class-members', 'simple-import-sort'],
    extends: [
        'airbnb-typescript',
        // 'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
    ],

    rules: {
        ...a11yOff,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-extra-parens': 'off',
        'no-extra-semi': 'off',
        'no-unneeded-ternary': 'error',
        'import/prefer-default-export': 'off',
        // 'jsx-a11y/label-has-associated-control': 'off',
        // 'jsx-a11y/control-has-associated-label': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'sort-class-members/sort-class-members': [
            1,
            {
                order: [
                    '[static-properties]',
                    '[conventional-private-properties]',
                    '[properties]',
                    'constructor',
                    '[static-methods]',
                    '[conventional-private-methods]',
                    '[methods]',
                ],
                accessorPairPositioning: 'getThenSet',
            },
        ],

        'simple-import-sort/imports': 'error',

        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/strict-null-checks': 'off',
        '@typescript-eslint/array-type': [
            2,
            {
                default: 'array-simple',
            },
        ],
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 'error',
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        createDefaultProgram: true,
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        project: 'tsconfig.json',
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
}
