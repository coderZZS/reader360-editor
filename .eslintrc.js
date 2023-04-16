module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jest: true,
        es6: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        polyfills: ['Promise', 'URL'],
        'import/resolver': {
            typescript: {},
        },
    },
    globals: {
        ga: true,
        chrome: true,
        __DEV__: true,
    },
    extends: ['prettier', 'plugin:compat/recommended', 'plugin:react/recommended', 'plugin:import/typescript'],
    plugins: ['react', '@babel', '@typescript-eslint', 'react-hooks'],
    parser: '@typescript-eslint/parser', // 解析 .ts 文件
    rules: {},
}
