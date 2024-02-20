/** @type { import("eslint").Linter.Config } */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:solid/typescript',
        'prettier',
        'plugin:n/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'solid', 'promise'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2023,
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        "n/no-missing-import": 'off'
    },
}
