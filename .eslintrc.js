// .eslintrc.js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    rules: {
        // Ajoute ou modifie ici tes règles personnalisées
        'react/react-in-jsx-scope': 'off', // Utile pour React 17+
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'import/no-default-export': [
            'error',
            {
                ignorePatterns: ['pages/**', 'app/**'],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};