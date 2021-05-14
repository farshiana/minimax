module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'max-len': ['error', { code: 120 }],
        indent: ['error', 4],
        'no-bitwise': 0,
        'no-plusplus': 0,
        'no-console': 0,
        'no-case-declarations': 0,
    },
};
