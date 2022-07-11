module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "react-app"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "promise"
    ],
    "ignorePatterns": ["reportWebVitals.js"],
    "rules": {
        // eslint
        "semi": ["warn", "always"],
        "no-extra-semi": "warn",
        "camelcase": ["warn", { properties: "never" }],
        "object-curly-spacing": ["warn", "always", { "arraysInObjects": false, "objectsInObjects": false }],
        "comma-spacing": ["warn"],
        "key-spacing": ["warn"],
        "keyword-spacing": ["warn"],
        "space-before-blocks": "warn",
        "space-infix-ops": "warn",
        "brace-style": "warn",
        "arrow-body-style": ["warn", "as-needed"],
        "no-console": "warn",
        "no-var": "warn",
        "prefer-arrow-callback": "warn",
        // "max-len": ["error", { "code": 100 }]

        // promise plugin
        "promise/catch-or-return": "warn",
        "promise/valid-params": "warn",
        "promise/no-nesting": "warn",

        // react plugin
        "react/destructuring-assignment": ["warn", 'always'],
        "react/function-component-definition": ["warn", { "namedComponents": ["function-declaration"] }],
        "react/hook-use-state": "warn",
    }
}
