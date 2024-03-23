import eslintPluginAstro from 'eslint-plugin-astro'
export default [
    ...eslintPluginAstro.configs['flat/all'],
    {
        rules: {
            'astro/semi': 'off',
            'astro/no-unused-css-selector': 'warn',
            'astro/prefer-object-class-list': 'off'
        },
    },
]
