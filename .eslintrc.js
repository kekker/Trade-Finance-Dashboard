module.exports = {
    extends: [
        'airbnb',
        'prettier',
        'react-app',
        'prettier/react',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
    ],
    plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        jsx: true,
        useJSXTextNode: true,
    },
    globals: {
        Cypress: true,
        cy: true,
        context: true,
        assert: true,
        afterEach: true,
        beforeEach: true,
    },
    rules: {
        'import/no-unresolved': 0,
        'no-plusplus': [
            0,
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-console': [
            'error',
            {
                allow: ['info', 'warn', 'error'],
            },
        ],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/jsx-no-bind': [
            2,
            {
                ignoreDOMComponents: true,
            },
        ],
        'prettier/prettier': ['error'],
        'jsx-a11y/href-no-hash': [0],
        'jsx-a11y/click-events-have-key-events': [0],
        'jsx-a11y/mouse-events-have-key-events': [0],
        'jsx-a11y/no-static-element-interactions': [
            'error',
            {
                handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
            },
        ],
        'react/forbid-prop-types': [0],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-uses-vars': ['error'],
        'react/destructuring-assignment': [
            2,
            'always',
            {
                ignoreClassFields: true,
            },
        ],
        'react/button-has-type': [
            2,
            {
                button: true,
                submit: true,
                reset: true,
            },
        ],
        'import/no-extraneous-dependencies': [0],
        'import/prefer-default-export': 0,
        'import/no-cycle': [
            2,
            {
                maxDepth: 1,
            },
        ],
        'comma-dangle': [2, 'always-multiline'],
        'no-nested-ternary': 'off',
        'no-unneeded-ternary': 'error',
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/sort-comp': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        'import/extensions': 0,
        'react/prop-types': 0,
    },
    env: {
        browser: true,
    },
};
