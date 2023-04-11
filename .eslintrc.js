module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    globals: {
        ga: true,
        chrome: true,
        __DEV__: true,
    },
    // 解析 .vue 文件
    extends: ['plugin:json/recommended', 'plugin:prettier/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        parser: ['@typescript-eslint/parser'], // 解析 .ts 文件
    },
    rules: {},
}
