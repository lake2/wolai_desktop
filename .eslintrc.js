module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "no-unused-vars": "off",
        "indent": ["error", 4],

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
    }
};
